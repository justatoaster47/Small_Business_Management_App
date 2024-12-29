
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

ticket_df = pd.read_excel('testData.xlsx')

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
  # create unique pairs of locations
  pairs = list(combinations(ticket_df["Address"], 2))
  pairs_db = pd.DataFrame(pairs)

  #list to store distances between pairs
  distances = []

  # calculate distance between each pair
  for index, pair_info in pairs_db.iterrows():
    address_1 = pair_info[0] # 0 and 1 are just the column names in this case
    address_2 = pair_info[1]
    distances.append(get_driving_time(API_KEY, address_1, address_2))

  pairs_db["Distance"] = distances

  pairs_db.to_excel("addressPairings.xlsx", index=False, engine="openpyxl")






#
#
#
# # how shoudl i store this data?
#
# cities = ["City A", "City B", "City C", "City D", "City E"]
#
# # Define distances between each pair of cities
# distances = {
#     ("City A", "City B"): 10,
#     ("City A", "City C"): 15,
#     ("City A", "City D"): 20,
#     ("City A", "City E"): 25,
#     ("City B", "City C"): 35,
#     ("City B", "City D"): 25,
#     ("City B", "City E"): 30,
#     ("City C", "City D"): 15,
#     ("City C", "City E"): 20,
#     ("City D", "City E"): 10
# }
#
# # Create an undirected graph
# graph = nx.Graph()
#
# # Add edges with weights
# for (city1, city2), distance in distances.items():
#     graph.add_edge(city1, city2, weight=distance)
#
# # Draw the graph
# pos = nx.spring_layout(graph)  # Positions for all nodes
# nx.draw(graph, pos, with_labels=True, node_color="skyblue", node_size=2000, font_size=15)
# labels = nx.get_edge_attributes(graph, "weight")  # Get weights
# nx.draw_networkx_edge_labels(graph, pos, edge_labels=labels)
#
# # Show the plot
# plt.title("Undirected Weighted Complete Graph")
# plt.show()
#
