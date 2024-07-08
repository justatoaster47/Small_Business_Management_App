# import os
# import pandas as pd
# import yfinance as yf
from flask import Flask, jsonify
from flask_cors import CORS 
# from dotenv import load_dotenv
# from sqlalchemy import create_engine
# import plotly.graph_objects as go

# load_dotenv()
# POSTGRES_DBNAME = 'dataprojectdb'
# POSTGRES_USER = os.getenv('DB_USER')
# POSTGRES_PASSWORD = os.getenv('DB_PASSWORD')
# POSTGRES_HOST = 'localhost'
# POSTGRES_PORT = '5432'

# db_url = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DBNAME}'
# engine = create_engine(db_url)
app = Flask(__name__)
CORS(app) # allows for cross origin requests, compatiblity with react


@app.route('/members')
def members(): 
    return {"members": ["member1", "member2", "member3"]}

if __name__ == '__main__':
  app.run(debug=True)




#
# @app.route('/')
# def index():
#   conn = engine.connect()
#   data = ""
#   query = 'SELECT * FROM stock_symbol_index'
#   stock_symbol_index = pd.read_sql(query, con=conn)
#   stock_symbol_index = [item[0] for item in stock_symbol_index] # list comprehension to get the stock symbol text only without formatting
#   conn.commit()
#   conn.close()
#   return render_template('index.html', data=data, stock_symbol_index=stock_symbol_index)
#
# @app.route('/create', methods=['POST'])
# def create():
#   conn = engine.connect()
#   symbol = request.form['stock_symbol_add']
#   symbol = symbol.upper()
#   data = yf.download(symbol, period='max') # download data from yahoo finance.
#   if data.empty:
#     conn.close()
#     print('Stock symbol does not exist!!')
#     # eventually show a error message on screen as well
#     return redirect(url_for('index'))
#   data.reset_index(inplace=True) # reset index
#   data.columns = [col.lower() for col in data.columns] # lowercase column names 
#   data.to_sql(symbol+'_stock_table', con=conn, if_exists='replace', index=False) # create / update table
#
#   # Check if the symbol already exists in the symbols index before adding
#   result = conn.execute(text('SELECT 1 FROM stock_symbol_index WHERE stock_symbol = :symbol'), {'symbol': symbol}).fetchone()
#   if result is not None:
#     conn.close()
#     print("Stock symbol already exists.")
#     return redirect(url_for('index'))
#   else:
#     conn.execute(text('INSERT INTO stock_symbol_index (stock_symbol) VALUES (:symbol)'), {'symbol': symbol})
#
#   conn.commit()
#   return redirect(url_for('index'))
#
# @app.route('/read', methods=['POST',])
# def read():
#   conn = engine.connect()
#   symbol = request.form['stock_symbol_select']
#   data = conn.execute(text('SELECT * FROM "'+ symbol + '_stock_table" LIMIT 5'))
#   stock_symbol_index = conn.execute(text('SELECT * FROM stock_symbol_index'))
#   stock_symbol_index = [index[0] for index in stock_symbol_index] # list comprehension to get the stock symbol text only without formatting
#   create_analytics()
#   data_analytics = conn.execute(text('SELECT * FROM "'+ symbol + '_analytics" LIMIT 5'))
#   analytics_headers = data_analytics.keys()
#   conn.close()
#   return render_template(
#     'index.html', 
#     data=data, 
#     stock_symbol=symbol, 
#     stock_symbol_index=stock_symbol_index, 
#     data_analytics=data_analytics, 
#     analytics_headers=analytics_headers,
#     stock_chart = create_graphs()
#   )
#
# @app.route('/delete', methods=['POST'])
# def delete():
#   conn = engine.connect()
#   symbol = request.form['stock_symbol_delete']
#   conn.execute(text('DROP TABLE "'+ symbol + '_stock_table"'))
#   conn.execute(text('DELETE FROM stock_symbol_index WHERE stock_symbol = \''+ symbol + '\''))
#   conn.commit()
#   return redirect(url_for('index'))
#
# def create_analytics():
#   start_date = time_relevancy(5) # get the date from 5 years ago, only pull relevant data
#
#   # create a new table with the symbol name + _analytics if it doesn't exist
#   conn = engine.connect()
#   symbol = request.form['stock_symbol_select']
#
#   # Simple Moving Average (50 days)
#   query = 'SELECT * FROM "'+ symbol + '_stock_table" where date > \'' + start_date + '\' ORDER BY date ASC'
#   df = pd.read_sql(query, con=conn) # create a dataframe from the query
#   smv_50 = df['close'].rolling(window=2).mean() # create a variable that holds the smv_50 column data
#   smv_50 = pd.DataFrame(smv_50) # convert the list variable to a dataframe
#   smv_50.columns = ['SMV_50'] # rename the dataframe's column 
#   smv_50.to_sql(symbol+'_analytics', con=conn, if_exists='replace', index=False)
#
#   conn.commit()
#   conn.close()
#
# def time_relevancy(years):
#   # returns the date from x years ago, so you pull only relevant data
#   from datetime import datetime, timedelta
#   today = datetime.now().date()
#   start_date = today - timedelta(days=years*365)
#   start_date_str = start_date.strftime('%Y-%m-%d')
#   return start_date_str
#
#
# def create_graphs():
#   # create a graph for the stock symbol
#   # create a new table with the symbol name + _analytics if it doesn't exist
#   conn = engine.connect()
#   symbol = request.form['stock_symbol_select']
#   query = 'SELECT * FROM "'+ symbol + '_stock_table" ORDER BY date ASC'
#   df = pd.read_sql(query, con=conn) # create a dataframe from the query
#   conn.close()
#
#   fig = go.Figure(data=[go.Candlestick(x=df['date'],
#                 open=df['open'],
#                 high=df['high'],
#                 low=df['low'],
#                 close=df['close'])])
#
#   fig.update_layout(
#     title='Stock Price',
#     xaxis_title='Date',
#     yaxis_title='Price',
#     xaxis_rangeslider_visible=False
#   )
#
#   stock_chart = fig.to_html(full_html=False, default_height=600, default_width=800)
#
#   return stock_chart
#
#
#
#
#
#   
#
#
# if __name__ == '__main__': 
#   app.run(debug=True) 
#
#
# # NOTES
# # to run: flask run OR python3 app.py (which allows debug mode)
# # create a sqlalchemy class that sends both the data and the stock symbol to the html page
# # need to go through and pull the symbols from each table in the data base
# # then serve that as a list to inedex.html
# # index.html will populate dropdown with that list
# # then when the user selects a symbol, the data for that symbol is pulled from the database and displayed
# # delete will be done through a similar list
# # create will be done by searching an api that contains a complete list of real stock symbols
# # paramterize the queries to avoid sql injection attacks
# # needs error handling as well, especially for stock symbols that don't exist. somehow able to search in a database?
# # switch to yahoo finance api instead of alpha vantage??
# # can also download data such as price to earning ratio, dividend yield, icnome statement, balance sheet, cash flow, etc.
# # need to fix the window issues in smv_50 as a chunk of data will be missing from the beginning. incrememnt the initial caluclation?
# # reformat the crud lifecycle for better user experience in updating; maybe whenever you read if todays data isn't there
# # looking over a 3 month period for stock changes, not moment by moment changes
# # Modularize testing ML algo and test with backtraced stock data.
# # ML/AI, database, api, frontend (add a backend framework for the niceities?), 
# # how to incorporate stock selection as well? basically just after running a selection of the
# # best algorithms give each of them weight in signifiance of rating a stock and give each stock
# # in the database a rating at any given time (can batch request all for current market). and you
# # can run any specific algorithm on any specific stock and have notes about what that algorithm
# # actually does, this helps in evaluation - or if someone knows how they want to evaluate the
# # stock then they can use the included information about each algorithm to test it - could even
# # give custom weights. Use machine learning to calculate the ideal accuracy of the weights off of the testing results of your backtracing data. And simulate like starting at an early year and not current day data because then you can process a couple years without having to wait for new data to roll in.
# # Lowkey include all your notes on the project in the GitHub repo. Including the entire thorough thought processes is a W on a resume. You're a highly effective note taker so 
# # Make effectively the todo list style crud application as far as testing stock weights that the ML algo has proportional control over
# # Have your current stock project be incredibly polished and your primary project if anyone asks
# # for your work, with a couple side pieces from school projects and your music generator and
# # that stuff.
# # Eventually have a packaging system for the stock thing like docker to ship or something
# # eventually also have a non-web interface for the stock thing to where you just run analysis off command line
#
