


# current



1. use python file to generate test data, load test data into excel file
(now using jupyter notebook)
2. load data from excel file
3. process data, creating any needed data for analytics
4. do initial assignments of Urgency Scores for each customer ticket
5. order all ranked tickets in a data structure which is return value


(cusomter ticket also includes address)
pull from some map api to load your node/edge graph, so that you have a map
which includes a location of every ticket, each node is weighted by its
Urgency Score

your have n amount of hours to allot for a given map (corresponding to the
number of hours an employee works for the day) and you subtract the apropriate
amount of hours based on predicted 1. travel time (edge) 2. work time (node,
time spent at the location doing work)


















# setup
install requirements.txt
activate venv: source venv/bin/activate




# idea 1
Hospital Resource Optimization System
    Description: Build a tool to analyze and optimize the allocation of hospital resources (beds, staff, equipment).
    Features:
        Forecast demand for resources based on patient admission data.
        Generate optimized schedules for staff and equipment usage.
        Provide alerts for resource shortages.
    Tools: Pandas, NumPy, Scikit-learn.

this can be incorporated into web app also..?

inputs:
staff - shift start/end, qualifications, 
patient information - check in time, percieved injury urgency, expected
treatment time, 


# idea 2
predictive healthcare to solve issues before occur 
works hand in hand with biometric sensor, local health data, etc
adds local stats as well: local sales of cold medicine, local searches about
cold sympoms, local doctor visits about colds. (you'd need good api's for all
of these). 

also track your food 

and when trends are detected

# idea 3
small business resource allocator
(using python)
(data tends to be in excel sheets)

fixing the problem from mom's business...
factors
1. employees available 
2. job (geographical location, expected time to complete, urgency scale

urgency scale is calculated from multiple factors:
1. customer length of history & total spending
2. when issue was originally placed
3. if / when issue was last visited
4. issue severity of impact (by nature of issue itself, ex: yearly maitnenace
   is lowest)
5. expected duration of visit
6. maybe 3rd party factors: deadlines, social media exposure, 
past issues as issues go unaddressed their urgency climbs

7. necessarily delayed because of lack of part / restricted start date /etc

how to also balance locality 

or you could just use queues


do dijkstras minimum spanning tree or similar thing
recursively compare each route
have each possible route (where each node is weighted with the time to
complete task.)
and recursively compare, selecting for the route which has the highest
summative urgency score

and you run this for each eomployee, only including locations which they have
the required skillsets for on the potential map. like the chipolte problem.
ex: ethan can do it all so his map is full, whereas john can only do already
diagnosed repairs so his map doesn't include any non-diagnosed locations

be able to manually input a selection 

with a quick customer lookup 

once finished, add this as a microservice of your small business web app 


# resource allocator
* use python and excel, automation
* when building the python automation scripts, use jupyter notebooks to
progress incrementally, verifying results at each step
* doesn't specifically need to be healthcare or data analytics wise


diagnostic + repair visit(s)
maitenance
* first come first serve
* urgency of repair

employee skillset availability





# plan

automate healtcare data processing using python 

implement
  automation 
  python + jupyter labs
  design architecting (improving efficiency)
  excel

as healthcare based features for your pre-existing web app
this will be good as well as now you're handling data transfers and stuff like
that over the web instead of just locally

containerize with docker
deploy with azure
blockchain somehow?
ai / ml somehow?

just one big mega project having every technology that can interact, interact





# alida information
https://alidainc.com/

```
Transform diverse and complex data assets into integrated data services,
purpose-built for your business operations and use cases, fast.

Combine multiple disciplines with data technology to produce breakthrough
results, including mathematics, distributed cloud computing, concurrency
modeling, simulation, neural networks, bots, social media, mobility,
geolocation, data visualization, AI, security and more.
```

normal consumer funnel:
awareness ->  consideration ->  preference ->  purchase

healthcare consumption occurs with different factors at every level of this
consumer funnel. less likely to shop around for different doctors, medicine,
etc compared to normal brand shopping.

additionally, un-consumers or people who do not actively take care of their
health still end up purchasing healthcare (for the resulting issues over time)
even if they don't spend initially.

Un-consumers Drive Healthcare Costs: Non-engaged individuals (e.g., those
unaware of health consequences like diabetes) are significant cost drivers.

Limited Impact of Consumer Tools: Efforts like wellness programs and
telemedicine improve experience but fail to reduce costs, as they primarily
engage the already healthy or add convenience, not cost savings. 

Challenges with Consumer-Directed Plans: High-deductible health plans shift
costs to individuals without empowering them as true consumers.

Consumer-Centricity, Not Consumer Models: The healthcare system’s business
model does not align with consumer principles. A consumer-centric approach
focused on quality, value, and compassion is needed, rather than relying on
traditional consumer marketing strategies.


[ improve insurers ]
* Partner with top vendors instead of relying on custom, in-house solutions.
* Avoid "not invented here" mentalities.
* allow knowledgable employees to innovate
* build consumer centric tools not product centric, even though the consumers
  are complicated
* avoid excessive pilots (small test programs), address systemic issues
(culture, process, big stuff)


[ blockchain ] 
blockchain is 
* like linked list nodes (blocks) that form a chain (<- chain)
* each participating system across the network contains a copy of the chain
and thus the structure is distributed 
* each node identified by a unique hash (derived from item contents, date,
etc)
* contains pointer to previous node (is previous node's hash)
* invalid interactions void the integreity of the "chain" of hashes,
consistening of tmapering with block data such as items in a transaction or
other forgery type things
* also includes "proof of work" or other authentication method that slows
creation of a block to a set time so inauthentic actions are infeasible across
large networks due to the intentional slowness. other methods include (proof
of stake: validators are randomly selected with chances proportional to an
amount of crypto collateral they put up. others like proof of stake (dpos) or
proof of authority (poa) which select specific validators to do this).

in business intelligence the holy grail is to collect and produce just-in-time
data, integrate it with existing data assets, funnel it through on-demand
modeling to identify significant operational and strategic actions, and to
disseminate valuable information across the enterprise in a timely manner

[ ai / ml adoption in healthcare ]

* ml is not yet good at synthesizing the bigger picture or true understanding
  from data, it can only create very deep understanding of patterns
```
If the concept of a bird exists (someone took the time to define a bird and
provide examples in the data), then ML can find birds pretty easily. But if
the concept of a bird (or an animal) was never put in, then ML struggles
mightily with discovering that a bird exists and then finding it. Now in this
case the sum-of-the-parts closely represents the whole since a bird looks like
a bird head with a bird body and bird wings and so on.
```
