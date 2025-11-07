from fastapi import FastAPI
import requests
import joblib
import os
import pandas as pd
from django.conf import settings
from settings_django import *
from app.models import IndicatorData

app = FastAPI(title="Public Forecast API")

DJANGO_TRAIN_URL = "http://localhost:8000/api/train/{indicator}/"  # đổi nếu server khác
MODEL_ROOT = os.path.join(settings.BASE_DIR, "models")


@app.get("/forecast/{indicator}")
async def forecast_public(indicator: str):
    # 1) Gọi đến API Django để đảm bảo model luôn cập nhật
    train_res = requests.post(DJANGO_TRAIN_URL.format(indicator=indicator))
    train_json = train_res.json()

    if "error" in train_json:
        return train_json

    # 2) Load lại model sau train
    model_file = os.path.join(MODEL_ROOT, f"prophet_{indicator}.joblib")
    if not os.path.exists(model_file):
        return {"error": "Model file not found after training."}

    model = joblib.load(model_file)

    # 3) Load data để lấy năm cuối
    qs = IndicatorData.objects.filter(indicator=indicator).order_by("year")
    df = pd.DataFrame(qs.values("year", "value"))
    df["ds"] = pd.to_datetime(df["year"].astype(str) + "-01-01")
    df["y"] = df["value"]

    last_year = df["year"].max()

    future = model.make_future_dataframe(periods=5, freq="Y")
    forecast = model.predict(future)
    next_years = forecast[forecast["ds"].dt.year > last_year].head(5)

    return {
        "indicator": indicator,
        "trained": train_json.get("trained", False),
        "forecast": [
            {
                "year": int(r.ds.year),
                "value": float(r.yhat),
                "lower": float(r.yhat_lower),
                "upper": float(r.yhat_upper),
            }
            for _, r in next_years.iterrows()
        ],
    }


@app.get("/data/{indicator}")
async def get_data(indicator: str):
    """
    Trả dữ liệu raw của indicator, giống fetch_indicator_worldbank
    """
    qs = IndicatorData.objects.filter(indicator=indicator).order_by("year")
    if not qs.exists():
        return {"error": "Indicator not found"}

    data = [{"year": x.year, "value": x.value} for x in qs]
    return data
