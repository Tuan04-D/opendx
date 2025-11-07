from django.core.management.base import BaseCommand
from app.models import IndicatorData
import requests

API_SOURCES = {
    "IT.NET.USER.ZS": "https://api.worldbank.org/v2/country/VNM/indicator/IT.NET.USER.ZS?format=json&per_page=20000",
    "IT.NET.BBND.P2": "https://api.worldbank.org/v2/country/VNM/indicator/IT.NET.BBND.P2?format=json&per_page=20000",
    "SP.URB.TOTL.IN.ZS": "https://api.worldbank.org/v2/country/VNM/indicator/SP.URB.TOTL.IN.ZS?format=json",
    "NY.GDP.PCAP.CD": "https://api.worldbank.org/v2/country/VNM/indicator/NY.GDP.PCAP.CD?format=json",
    "SE.ADT.LITR.ZS": "https://api.worldbank.org/v2/country/VNM/indicator/SE.ADT.LITR.ZS?format=json"
}

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for key, url in API_SOURCES.items():
            self.stdout.write(f"📡 Fetching {key}")

            try:
                res = requests.get(url, timeout=10).json()
                data = res[1]
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Failed: {e}"))
                continue

            for item in data:
                if item["value"] is None:
                    continue
                IndicatorData.objects.update_or_create(
                    indicator=key,
                    year=int(item["date"]),
                    defaults={
                        "value": item["value"],
                        "source": "worldbank"
                    }
                )

        self.stdout.write(self.style.SUCCESS("DONE: Data fetched & stored"))
