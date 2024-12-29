
# (cusomter ticket also includes address)
# pull from some map api to load your node/edge graph, so that you have a map
# which includes a location of every ticket, each node is weighted by its
# Urgency Score
#
# your have n amount of hours to allot for a given map (corresponding to the
# number of hours an employee works for the day) and you subtract the apropriate
# amount of hours based on predicted 1. travel time (edge) 2. work time (node,
# time spent at the location doing work)


import os
from dotenv import load_dotenv
import pandas as pd
import requests
import networkx as nx
from itertools import combinations
import matplotlib.pyplot as plt

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
                duration = elements["duration"]["text"]
                return f"Driving time: {duration}"
            else:
                return f"Error: {elements['status']}"
    return f"Error: {response.status_code}"

def create_pairs_and_distances():
  ticket_df = pd.read_excel('excel/testData.xlsx')

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

  pairs_df["Distance"] = distances

  pairs_df.to_excel("excel/addressPairings.xlsx", index=False, engine="openpyxl")


create_pairs_and_distances()




# distances_df = pd.read_excel("addressPairings.xlsx")

# graph = nx.Graph()

# print(distances_df.columns)
# print(distances_df)

# Add edges with weights
# for index, row_data in distances_df.items():
    # graph.add_edge(row_data[0], row_data[1], weight=row_data[3])
    # print(row_data[3])
# pos = nx.spring_layout(graph)  # Positions for all nodes
# nx.draw(graph, pos, with_labels=True, node_color="skyblue", node_size=2000, font_size=15)
# labels = nx.get_edge_attributes(graph, "weight")  # Get weights
# nx.draw_networkx_edge_labels(graph, pos, edge_labels=labels)


# Show the plot
# plt.title("Undirected Weighted Complete Graph")
# plt.show()
