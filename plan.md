
# next steps

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

how to ideally allocate limited resources working within multiple constraints


