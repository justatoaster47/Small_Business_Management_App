
# (cusomter ticket also includes address)
# pull from some map api to load your node/edge graph, so that you have a map
# which includes a location of every ticket, each node is weighted by its
# Urgency Score
#
# your have n amount of hours to allot for a given map (corresponding to the
# number of hours an employee works for the day) and you subtract the apropriate
# amount of hours based on predicted 1. travel time (edge) 2. work time (node,
# time spent at the location doing work)


import pandas as pd

df = pd.read_excel('testData.xlsx')

print(df.head())






