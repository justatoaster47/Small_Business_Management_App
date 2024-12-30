

import pandas as pd
import networkx as nx

dist_pair_df = pd.read_excel("excel/addressPairings.xlsx")
original_df = pd.read_excel("excel/testData.xlsx")

# create lookup table for address->priority score
priority_scores = original_df.set_index('Address')['priority_rating'].to_dict()

my_graph = nx.Graph()

# add nodes to graph, where each node holds the priorty value
for address, priority_score in priority_scores.items():
  my_graph.add_node(address, priority_score=priority_score)

# add edges to graph, where each edge is the travel distance between two addresses
for index, row_info in dist_pair_df.iterrows():
  node1 = row_info["address_1"]
  node2 = row_info["address_2"]
  travel_time = row_info["distance_minutes"]
  my_graph.add_edge(node1, node2, travel_time=travel_time)

# print("Nodes:")
# for node in my_graph.nodes:
#   priority_score = my_graph.nodes[node].get('priority_score', 'No score')
#   print(f"{node} \n PRIORITY SCORE: {priority_score}")
#
# print("\nEdges:")
# for edge in my_graph.edges:
#   travel_time = my_graph.edges[edge].get('travel_time', 'No travel time')
#   print(f"Edge: {edge}, Travel Time: {travel_time}")

def maximize_priority_score_within_time(graph, start_node, time):
  best_score = 0
  best_route = None

  def recursive_dfs(current_node, visited_nodes, time_left, score):
    nonlocal best_route, best_score
    if time_left < 0:
      return

    if score > best_score:
      best_score = score
      best_route = visited_nodes

    # recursively search through every non-visited neighbor
    for neighbor in graph.neighbors(current_node):
      if neighbor not in visited_nodes: # don't visit the same address, bad business logic
        travel_time = graph[current_node][neighbor]['travel_time']
        recursive_dfs(
          neighbor, 
          visited_nodes + [neighbor], 
          time_left - travel_time, 
          score + graph.nodes[neighbor]['priority_score']
        )

  # run the problem
  recursive_dfs(start_node, [start_node], time, graph.nodes[start_node]['priority_score'])
  return best_route, best_score




start_address = " 2100 Valley View Pkwy, El Dorado Hills, CA 95762, United States "
time_mins = 5

route, score = maximize_priority_score_within_time(my_graph, start_address, time_mins)
print("Best route:", route)
print("Maximum urgency score:", score)







# create a node for each address
# create a undirected, weighted edge connecting each address, weight = travel time
# given t amount of time
# create a route, or succession of addresses
# that maximizes their summative "urgency scores" when compared to every other route

# each row of df includes [address1, address2, travel time]

# how do i add the urgency scores when working with a time-weighted graph
# since these are tracked by indiviudal location
# i could do a lookup at every visit but this could be long

# you could create every possible route (that uses maximum available time)
# then afterwards, use a fast lookup method to add address urgency values
# also no repeating addresses, though this is obvious
