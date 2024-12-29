from datetime import datetime
import pandas as pd

df = pd.read_excel('excel/testData.xlsx')

WEIGHTS = {
  "history_length_months": 1.0,
  "total_spending": 1.5,
  "ticket_age": 2.0,
  "last_visited": 1.2,
}

def calculate_urgency(row):
  if row["waiting_for_delivery"] == True:
    return 0

  now = datetime.now()

  # Calculate age of the ticket
  ticket_age = (now - row["ticket_created"]).days

  if row["priority_level"] == "VIP":
    priority_weight = 1.5
  else:
    priority_weight = 1

  if row["severity"] == "Critical":
    severity_weight = 1.5
  elif row["severity"] == "Moderate":
    severity_weight = 1.2
  else:
    severity_weight = 1

  # Calculate urgency score
  urgency_score = int((
    WEIGHTS["history_length_months"] * row["history_length_months"] +
      WEIGHTS["total_spending"] * row["total_spending"] / 1000 +  # Normalize spending
      WEIGHTS["ticket_age"] * ticket_age
  ) * priority_weight * severity_weight )

  return urgency_score


df["ticket_age_days"] = df.apply(lambda row: (datetime.now() - row["ticket_created"]).days, axis=1)
df["priority_rating"] = df.apply(calculate_urgency, axis=1)

ranked_df = df.sort_values(by="priority_rating", ascending=False)

ranked_df.to_excel("excel/testData.xlsx", index=False, engine="openpyxl")

