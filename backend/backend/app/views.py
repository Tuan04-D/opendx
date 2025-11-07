from django.http import JsonResponse
from app.models import IndicatorData

def fetch_indicator_worldbank(request, indicator):
    qs = IndicatorData.objects.filter(indicator=indicator).order_by("year")
    data = [{"year": x.year, "value": x.value} for x in qs]
    return JsonResponse(data, safe=False)

import os
import io
import hashlib
import joblib
import pandas as pd
import numpy as np
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


from prophet import Prophet
from sklearn.metrics import mean_absolute_error, mean_squared_error

from .models import IndicatorData, ModelInfo

# Thư mục lưu model
MODEL_ROOT = getattr(settings, "MODEL_ROOT", os.path.join(settings.BASE_DIR, "models"))
os.makedirs(MODEL_ROOT, exist_ok=True)


def _compute_data_hash(df):
    """
    Tạo hash chuỗi từ dataframe year,value sắp xếp theo year.
    Đảm bảo cùng dữ liệu sẽ cho cùng hash.
    """
    s = "\n".join(f"{int(r[0])}:{float(r[1]):.12g}" for r in df[["year", "value"]].sort_values("year").values)
    return hashlib.sha256(s.encode("utf-8")).hexdigest()


def _prepare_df_from_qs(qs):
    """
    Chuyển queryset IndicatorData -> df cho Prophet với cột ds,y
    """
    df = pd.DataFrame(list(qs.values("year", "value")))
    if df.empty:
        return df
    # convert year (int) to datetime at year start to satisfy Prophet frequency yearly
    df["ds"] = pd.to_datetime(df["year"].astype(str) + "-01-01")
    df["y"] = df["value"].astype(float)
    df = df[["ds", "y"]].sort_values("ds")
    return df

@csrf_exempt 
@require_POST
def train_indicator(request, indicator_key):
    qs = IndicatorData.objects.filter(indicator=indicator_key).order_by("year")
    if not qs.exists():
        return JsonResponse({"error": "No data for indicator"}, status=400)

    df = _prepare_df_from_qs(qs)
    if df.empty:
        return JsonResponse({"error": "No usable data"}, status=400)

    data_hash = _compute_data_hash(pd.DataFrame(qs.values("year", "value")))

    try:
        mi = ModelInfo.objects.get(indicator=indicator_key)
    except ModelInfo.DoesNotExist:
        mi = None

    model_file = os.path.join(MODEL_ROOT, f"prophet_{indicator_key}.joblib")
    trained_now = False

    # === TRAIN OR LOAD ===
    if mi is None or mi.data_hash != data_hash or not os.path.exists(model_file):
        trained_now = True
        
        if len(df) >= 4:
            split_year = df["ds"].dt.year.max() - 2
            train_df = df[df["ds"].dt.year <= split_year]
            test_df = df[df["ds"].dt.year > split_year]
            if train_df.empty:
                train_df = df.iloc[:-1]
                test_df = df.iloc[-1:]
        else:
            train_df = df
            test_df = pd.DataFrame([])

        # === Grid Search nhanh ===
        param_grid = {
            "changepoint_prior_scale": [0.01, 0.1, 0.5],
            "seasonality_prior_scale": [0.1, 1.0],
            "yearly_seasonality": [True, False],
        }

        best_model = None
        best_rmse = float("inf")
        best_mae = None

        for cps in param_grid["changepoint_prior_scale"]:
            for sps in param_grid["seasonality_prior_scale"]:
                for ys in param_grid["yearly_seasonality"]:
                    try:
                        m_try = Prophet(
                            changepoint_prior_scale=cps,
                            seasonality_prior_scale=sps,
                            yearly_seasonality=ys,
                            daily_seasonality=False,
                            weekly_seasonality=False
                        )
                        m_try.fit(train_df)

                        if not test_df.empty:
                            pred = m_try.predict(test_df[["ds"]])
                            mae_tmp = mean_absolute_error(test_df["y"], pred["yhat"])
                            rmse_tmp = np.sqrt(mean_squared_error(test_df["y"], pred["yhat"]))
                        else:
                            mae_tmp = rmse_tmp = 0

                        if rmse_tmp < best_rmse:
                            best_rmse = rmse_tmp
                            best_mae = mae_tmp
                            best_model = m_try
                    except:
                        continue

        # === Fallback đảm bảo m luôn tồn tại ===
        if best_model is None:
            best_model = Prophet(yearly_seasonality=True)
            best_model.fit(train_df)
            best_mae, best_rmse = None, None

        m = best_model
        mae = float(best_mae) if best_mae is not None else None
        rmse = float(best_rmse) if best_rmse is not None else None

        joblib.dump(m, model_file)

        if mi is None:
            mi = ModelInfo.objects.create(indicator=indicator_key, data_hash=data_hash, model_path=model_file, mae=mae, rmse=rmse)
        else:
            mi.data_hash = data_hash
            mi.model_path = model_file
            mi.mae = mae
            mi.rmse = rmse
            mi.save()

    else:
        m = joblib.load(mi.model_path)
        mae, rmse = mi.mae, mi.rmse

    # === Forecast Next 5 Years ===
    last_year = df["ds"].dt.year.max()
    future = m.make_future_dataframe(periods=5, freq="Y")
    forecast = m.predict(future)
    forecast_future = forecast[forecast["ds"].dt.year > last_year].head(5)

    result = [
        {
            "year": int(row["ds"].year),
            "yhat": float(row["yhat"]),
            "yhat_lower": float(row["yhat_lower"]),
            "yhat_upper": float(row["yhat_upper"]),
        }
        for _, row in forecast_future.iterrows()
    ]

    return JsonResponse({
        "indicator": indicator_key,
        "trained": trained_now,
        "mae": mae,
        "rmse": rmse,
        "forecast": result
    })

