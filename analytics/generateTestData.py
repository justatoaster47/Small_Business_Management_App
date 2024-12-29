
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

df.to_excel("excel/testData.xlsx", index=False, engine="openpyxl")

