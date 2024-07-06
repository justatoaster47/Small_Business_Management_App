
# Small Business Management App

## STACK
front end: React 
api: Flask
backend: Python3
database: PostgreSQL
deployment: AWS? Azure?
version control: git


python is in /usr/local/bin/python3

### FULL STEPS
* make this file // project plan
* update/upgrade python (homebrew)
* make git repo (make on github account, then create repo in local directory and link)
  ```bash
    echo "# Small_Business_Management_App" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/justatoaster47/Small_Business_Management_App.git
    git push -u origin main
  ```
* make react app
  ```bash
    npx create-react-app small_business_management_app
  ```
* make postgres db, assuming your user is already set up in defaults
  ```bash
    psql 
  ```
  ```sql
    CREATE DATABASE small_business_management_app;
    \c small_business_management_app
  ```
* upgrade pip
  ```bash
    pip install --upgrade pip
  ```
* make python virtual environment, activate it, install requirements, create flask app file
  ```bash
    pip install --upgrade pip
    python3 -m venv myEnv
    source myEnv/bin/activate
    echo "\nflask \npython-dotenv \nsqlalchemy" >> requirements.txt
    pip install -r requirements.txt
    echo 'from flask import Flask' >> app.py
  ```


* add postgres db to your nvim ui
```
postgresql:small_business_management_app
```
  heres some good stuff for a saved query
  save with nvim.ui using
  ```sql
    create table example (
      id serial primary key,
      name text,
      age integer
    );

    insert into example (name, age) values ('Alice', 88);

    select * from example;

    -- shows all tables in the current database
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public';

    drop table if exists example;
  ```








