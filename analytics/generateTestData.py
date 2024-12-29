
# data is of form:
#     {
#         "customer_id": 1,
#         "history_length": 3,  
#         "total_spending": 10000,  # dollars
#         "ticket_created": datetime(2024, 12, 20),
#         "last_visited_at": datetime(2024, 12, 25),
#         "priority_level": "VIP",  # VIP, Regular, New
#         "severity": "Critical",  # Critical, Moderate, Low
#         "waiting_for_delivery_on": datetime(2024, 12, 28),
#     },

# customer id: unique, auto increment
# history length in months, generate randomly 0-36
#   side note: don't need to reduce priority for new customers as hisotry length 0 does this already
# vip bonus is boolean
# ticket created at: current datetime minus time of 1-365 days
# last visited at: current datetime minus time of 1-365 days
# severity: scale of 1 to 5, with higher percentage of 1's (yearly maitenance)

# hard coded wait-until date. customer is simply not included in the selection map until that date


import pandas as pd
import numpy as np
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

num_tickets = 10

current_date = datetime.today()

addresses = [
  " 4370 Town Center Blvd Suite 300, El Dorado Hills, CA 95762, United States ",
  " 4641 Post St, El Dorado Hills, CA 95762, United States ",
  " 5220 Robert J Mathews Pkwy, El Dorado Hills, CA 95762, United States ",
  " 2100 Valley View Pkwy, El Dorado Hills, CA 95762, United States ",
  " 4980 Gillette Dr, El Dorado Hills, CA 95762, United States ",
  " 2085 Vine St #105, El Dorado Hills, CA 95762, United States ",
  " 4805 Golden Foothill Pkwy, El Dorado Hills, CA 95762, United States ",
  " 3860 El Dorado Hills Blvd STE 601, El Dorado Hills, CA 95762, United States ",
  " 2020 Town Ctr W Wy, El Dorado Hills, CA 95762, United States ",
  " 5170 Golden Foothill Pkwy, El Dorado Hills, CA 95762, United States "
]

def generate_ticket_data(num_tickets):
  tickets = []
  for i in range(num_tickets):
    history_length = np.random.randint(0, 37)
    ticket_created = (current_date - timedelta(days=np.random.randint(1, 366))).date()
    ticket_type = np.random.choice(["Diagnostic", "Maintenance", "Repair"], p=[0.3, 0.4, 0.3])

    if ticket_type=="Repair":
      waiting_for_delivery = np.random.choice([True, False], p=[0.6, 0.4])
    else:
      waiting_for_delivery = False
    
    if ticket_type!="Maitenance":
      severity_level = np.random.choice(["Critical", "Moderate", "Low"], p=[0.1, 0.4, 0.5])
    else:
      severity_level = "Low"

    ticket = {
      "customer_id": i + 1,  # Unique customer ID
      "Name": fake.name(),
      "Email": fake.email(),
      "Phone": fake.phone_number(),
      "Address": addresses[i],
      "history_length_months": history_length,
      "total_spending": np.random.randint(0, 5001),  # Spending in dollars
      "ticket_created": ticket_created,
      "priority_level": np.random.choice(["VIP", "Regular"], p=[0.1, 0.9]),
      "severity": severity_level,
      "ticket_type": ticket_type,
      "waiting_for_delivery": waiting_for_delivery
    }

    tickets.append(ticket)
  return tickets

ticket_data = generate_ticket_data(num_tickets)

df = pd.DataFrame(ticket_data)

print("DF: ", df)

print("writing to testData.xlsx...")
df.to_excel("testData.xlsx", index=False, engine="openpyxl")

# Save to CSV for inspection
# df.to_csv("ticket_data.csv", index=False)
