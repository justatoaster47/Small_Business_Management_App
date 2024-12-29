
import os
from dotenv import load_dotenv
import requests
import pandas as pd

load_dotenv()


API_KEY=os.getenv("GOOGLE_MAPS_API_KEY")
# print(GOOGLE_MAPS_API_KEY)

# df = pd.read_excel('testData.xlsx')
# print(df.head())

ZIP_CODE = "95762"
LOCATION = "United States"

def get_addresses(zip_code, location):
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": f"addresses in {zip_code}, {location}",
        "key": API_KEY
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        addresses = [result['formatted_address'] for result in data.get('results', [])]
        return addresses
    else:
        print("Error:", response.json())
        return []

addresses = get_addresses(ZIP_CODE, LOCATION)

# print(addresses)

df = pd.DataFrame(addresses)

print("DF: ", df)

print("writing to testData.xlsx...")
df.to_excel("testData.xlsx", index=False, engine="openpyxl")
