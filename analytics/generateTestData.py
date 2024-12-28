
# data is of form:
#     {
#         "customer_id": 1,
#         "history_length": 3,  
#         "total_spending": 10000,  # dollars
#         "issue_created_at": datetime(2024, 12, 20),
#         "last_visited_at": datetime(2024, 12, 25),
#         "priority_level": "VIP",  # VIP, Regular, New
#         "severity": "Critical",  # Critical, Moderate, Low
#         "waiting_for_delivery_on": datetime(2024, 12, 28),
#     },

# customer id: unique, auto increment
# history length in months, generate randomly 0-36
#   side note: don't need to reduce priority for new customers as hisotry length 0 does this already
# vip bonus is boolean
# issue created at: current datetime minus time of 1-365 days
# last visited at: current datetime minus time of 1-365 days
# severity: scale of 1 to 5, with higher percentage of 1's (yearly maitenance)

# hard coded wait-until date. customer is simply not included in the selection map until that date



import pandas as pd
import numpy as np
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

num_tickets = 100

current_date = datetime.today()

def generate_ticket_data(num_tickets):
  tickets = []
  for i in range(num_tickets):
    history_length = np.random.randint(0, 37)
    issue_created_at = (current_date - timedelta(days=np.random.randint(1, 366))).date()
    issue_type = np.random.choice(["Diagnostic", "Maintenance", "Repair"], p=[0.3, 0.4, 0.3])

    if issue_type=="Repair":
      waiting_for_delivery = np.random.choice([True, False], p=[0.6, 0.4])
    else:
      waiting_for_delivery = False

    ticket = {
      "customer_id": i + 1,  # Unique customer ID
      "Name": fake.name(),
      "Email": fake.email(),
      "Phone": fake.phone_number(),
      "history_length_months": history_length,
      "total_spending": np.random.randint(0, 5001),  # Spending in dollars
      "issue_created_at": issue_created_at,
      "priority_level": np.random.choice(["VIP", "Regular"], p=[0.1, 0.9]),
      "severity": np.random.choice(["Critical", "Moderate", "Low"], p=[0.1, 0.4, 0.5]),
      "issue_type": issue_type,
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
