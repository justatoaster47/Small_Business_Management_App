
import os
from dotenv import load_dotenv
import pandas as pd
import requests
from itertools import combinations

load_dotenv()

API_KEY=os.getenv("GOOGLE_MAPS_API_KEY")

def get_driving_time(api_key, start_address, end_address):
    url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    params = {
        "origins": start_address,
        "destinations": end_address,
        "key": api_key,
        "mode": "driving",
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data["rows"]:
            elements = data["rows"][0]["elements"][0]
            if elements["status"] == "OK":
                duration = elements["duration"]["value"] / 60
                return duration
            else:
                return -1
    return f"Error: {response.status_code}"

def create_pairs_and_distances():
  ticket_df = pd.read_excel('excel/testData.xlsx')

  # create unique pairs of locations (order doesn't matter)
  pairs = list(combinations(ticket_df["Address"], 2))

  pairs_df = pd.DataFrame(pairs)
  pairs_df.columns = ["address_1", "address_2"]

  #list to store distances between pairs (in minutes worth of driving)
  distances = []

  # calculate distance between each pair
  for index, row_data in pairs_df.iterrows():
    address_1 = row_data["Address_1"]
    address_2 = row_data["Address_2"]
    distances.append(get_driving_time(API_KEY, address_1, address_2))

  pairs_df["distance_minutes"] = distances

  pairs_df.to_excel("excel/addressPairings.xlsx", index=False, engine="openpyxl")

def test_api():
  ticket_df = pd.read_excel('excel/testData.xlsx', nrows=2)

  # create unique pairs of locations (order doesn't matter)
  pairs = list(combinations(ticket_df["Address"], 2))

  pairs_df = pd.DataFrame(pairs)
  pairs_df.columns = ["Address_1", "Address_2"]

  #list to store distances between pairs (in minutes worth of driving)
  distances = []

  # calculate distance between each pair
  for index, row_data in pairs_df.iterrows():
    address_1 = row_data["Address_1"]
    address_2 = row_data["Address_2"]
    distances.append(get_driving_time(API_KEY, address_1, address_2))

  pairs_df["distance_minutes"] = distances

  print(pairs_df)


print("calculating distances...")

create_pairs_and_distances()
# test_api()

print("done")
