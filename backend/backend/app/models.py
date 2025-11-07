from django.db import models

class IndicatorData(models.Model):
    indicator = models.CharField(max_length=50)      # IT.NET.USER.ZS, v.v.
    year = models.IntegerField()
    value = models.FloatField()
    source = models.CharField(max_length=100)        # worldbank, hcm, danang, dx
    fetched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('indicator', 'year')      # tránh trùng dữ liệu

    def __str__(self):
        return f"{self.indicator} - {self.year}: {self.value}"


class ModelInfo(models.Model):
    indicator = models.CharField(max_length=50, unique=True)
    data_hash = models.CharField(max_length=128)            # hash của dữ liệu tại thời điểm train
    model_path = models.CharField(max_length=300)           # nơi lưu file joblib
    last_trained_at = models.DateTimeField(auto_now=True)
    mae = models.FloatField(null=True, blank=True)
    rmse = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"ModelInfo({self.indicator})"