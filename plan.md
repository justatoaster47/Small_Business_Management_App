
# next steps

or you default to filling out name, email, phone, address
and it automatically searches all of these fields for a match
and autofills the rest of the form if a match is found
confirm with click


2 section.
div 1: fill out user information, with create new user button at bottom. the
submit button is only for new users
div 2: a fuzzy search with pre-existing user accounts showing up. if one is
clicked on, it auto-links the ticket to that account (no submit button)



also make fuzzy searching apply to each subject specifically (name, address,
etc) so one item not matching doesn't compromise other items potentially
matching
such as a spouse calling for the same house should in theory link back to the
same account




for creating shortest route graph business logic...

user input & valiation..
* full name
* email
* phone
* address
then..
either add this ticket to database, updating in an efficient way, linked to their user profile
or create an new user profile and add to this ticket with link to new profile

for the shortest route interface, user inputs start and end location, as well
aas any stops they want to make (and if they're at a specific time)
(when the user wants to make a specific stop, simply break the recursive
process into before the stop, to the stop, then after the stop (with aalready
visited places removed)


could also...
automatically pull the incoming phone number and search for user profile
through that

workflow
1. go to create new ticket page
2. fill in user search with either name or email AND address
show similar results in a dropdown to mitigate typos
3. if user found, autofill information in a create new ticket form
4. if user not found, create new user profile, then load new ticket form with
   autofilled information. after submission, check that address is not already
   in use and if so link the two profiles together.

5. new ticket form includes name, email, phone, address, type of ticket

how to deal with family memebers or multiple people in one household calling
for the same address? these would all count towards the same total spending
and such
same if the same person has multiple residences or phone numbers, these all
count towards the same total spending and such

find-customer page 
(simple search bar, with autofill suggestions, and a create new customer
button)

create-new-customer page
(name, email, phone, address)
(this also checks for re-used addresses, and if the same address is used links
total spending and such)

after submission of either page, load new ticket page with autofilled customer
information. only need to fill in
(type of ticket)












# next steps

table for..
* customer personal information
* customer orders, previous and current
* staff information & priveledges
* staff schedules
* staff payment
* inventory management 

more features
* staff timecard component
* automate inventory alerts on low stock / quick reordering
* auto send invoices
* push notifications 
* reset password by email

how to ideally allocate limited resources working within multiple constraints





further ideas:
Inventory Management Microservice
    Purpose: Ensure optimal stock levels.
    Interesting Algorithms:
        Time Series Forecasting (Prophet, LSTM for demand prediction).
        Optimization Techniques (Linear Programming for replenishment planning).
        Monte Carlo Simulation (for uncertainty in supply chain).


honestly theres so much ml type of things i think this may be the route 
like a lil gold rush

lets do a lil machine learning sort of thing.
on something that would be similar to healthcare data analysis but in a small
business context. to find insights.


for my overall plan, for mentally navigating this:
dedicate your initial 60% of energy into creating indiviudally interesting and
conceptually synergistic microservices that are valid projects of their own
accord. somewhat similarly themed at least in the potential for a singular
application. 
once all of these are mostly implemented by themselves i think that would then
be motivation enough to validate stitching them all together within a
fullstack web application, but i don't think simply starting with the
fullstack thing is valid because if you don't have any substance that you're
really stiching together whats really the point.
the route optimizer is a great first iteration of this sort of thing. 


