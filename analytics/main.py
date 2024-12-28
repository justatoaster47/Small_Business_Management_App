from datetime import datetime, timedelta

# Example customer issue data
issues = [
    {
        "customer_id": 1,
        "history_length": 3,  # years
        "total_spending": 10000,  # dollars
        "issue_created_at": datetime(2024, 12, 20),
        "last_visited_at": datetime(2024, 12, 25),
        "priority_level": "VIP",  # VIP, Regular, New
        "severity": "Critical",  # Critical, Moderate, Low
        "sla_due_date": datetime(2024, 12, 29),
    },
    # Add more issues here
]

WEIGHTS = {
    "history_length": 1.0,       # Loyalty weight
    "total_spending": 1.5,       # Spending weight
    "issue_age": 2.0,            # Time since issue created
    "last_visited": 1.2,         # Time since last visit
    "priority_level": {"VIP": 1.5, "Regular": 1.0, "New": 0.8},
    "severity": {"Critical": 2.0, "Moderate": 1.5, "Low": 1.0},
    "sla_due_date": 2.0,         # Weight for approaching SLA deadlines
}

def calculate_urgency(issue):
    now = datetime.now()

    # Calculate age of the issue
    issue_age = (now - issue["issue_created_at"]).days

    # Calculate time since last visited
    last_visited_age = (now - issue["last_visited_at"]).days

    # Days remaining to SLA due date
    sla_remaining = (issue["sla_due_date"] - now).days
    sla_factor = max(1 / sla_remaining, 1) if sla_remaining > 0 else 2  # Penalize overdue issues

    # Calculate urgency score
    urgency_score = (
        WEIGHTS["history_length"] * issue["history_length"] +
        WEIGHTS["total_spending"] * issue["total_spending"] / 1000 +  # Normalize spending
        WEIGHTS["issue_age"] * issue_age +
        WEIGHTS["last_visited"] * last_visited_age +
        WEIGHTS["priority_level"][issue["priority_level"]] +
        WEIGHTS["severity"][issue["severity"]] +
        WEIGHTS["sla_due_date"] * sla_factor
    )

    return urgency_score

# Calculate and sort issues by urgency score
ranked_issues = sorted(issues, key=calculate_urgency, reverse=True)

# Print ranked issues
for idx, issue in enumerate(ranked_issues, start=1):
    print(f"Rank {idx}: Customer ID {issue['customer_id']}, Urgency: {calculate_urgency(issue):.2f}")

