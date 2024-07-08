# Small_Business_Management_App

refs
* https://www.youtube.com/watch?v=7LNl2JlZKHA

# PLANNING DOCUMENT
STACK!!
front end: React 
api: Flask
backend: Python3
database: PostgreSQL
deployment: AWS? Azure?
version control: git

Structure:
- Project Name Folder
  - README.md
  - react-app
  - flask-server


### FULL STEPS
* make planning document (this)
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
    npx create-react-app react_app
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
* make postgres db, assuming your user is already set up in defaults
  ```bash
    psql 
  ```
  ```sql
    CREATE DATABASE small_business_management_app;
    \c small_business_management_app
  ```
* remove unneeded files from react app
  ```bash
    cd react-app/src
    rm App.css App.test.js logo.svg setupTests.js index.css
  ```
  also remove the imports inside index.js for the just deleted files
* add your backend link in react_app -> package.json
  ```json
    "proxy": "http://localhost:5000"
  ```


# RUNNING THE APPLICATION



terminal -> main project directory -> tmux -> 2 split vim terminals ->
1. cd to flask-server, activate venv, [flask run --debug] (port 5000)
2. cd to react-app, run react app [npm start] (port 3000)
this window now shows both the front and back end of the application running



