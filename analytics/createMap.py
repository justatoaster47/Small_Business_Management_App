
import pandas as pd
import folium
# from folium.plugins import MarkerCluster
from geopy.geocoders import Nominatim
import time


def createMap():

  #initialize geolocator, dataframe, and empty map
  geolocator = Nominatim(user_agent="map_example")
  # df1 = pd.read_excel("excel/addressPairings.xlsx")
  # df = df1.iloc[:3]

  df = pd.read_excel("excel/testdata.xlsx")
  df = df["Address"]
  
  mymap = folium.Map(zoom_start=14)
  # marker_cluster = MarkerCluster().add_to(mymap)
  all_coords = []

  for index, row_data in df.iterrows():
    print(f"loading pair {index+1}")
    place1 = row_data["address_1"]
    place2 = row_data["address_2"]
    travel_time = row_data["distance_minutes"]

    # Get latitude and longitude for the places
    location1 = geolocator.geocode(place1)
    location2 = geolocator.geocode(place2)

    # ignore below "known attribute" errors !
    coords1 = (location1.latitude, location1.longitude)
    coords2 = (location2.latitude, location2.longitude)
    all_coords.extend([coords1,coords2])

    # Add markers for the places
    folium.Marker(coords1, popup=f"{place1}", tooltip="Place 1").add_to(mymap)
    folium.Marker(coords2, popup=f"{place2}", tooltip="Place 2").add_to(mymap)

    # Add a line (edge) between the places
    folium.PolyLine([coords1, coords2], color="blue", weight=2.5, tooltip=f"{travel_time} minutes").add_to(mymap)
    time.sleep(11)

  # Save map to an HTML file or display it in a Jupyter notebook
  mymap.fit_bounds(all_coords)
  mymap.save("map_with_places.html")
  print("html file created, open to view in browser")





createMap()
