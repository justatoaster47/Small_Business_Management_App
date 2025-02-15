# Small_Business_Management_App



# to run program
## start client
  ```
  cd ./client
  npm run dev
  ```
## start server
  ```
  cd ./server
  npx nodemon server.js
  ```

sometimes you have to start postgres manually via..
```
sudo systemctl stop postgresql
sudo systemctl start postgresql
sudo systemctl status postgresql
```


# fresh setup
## install npm on system
  ```
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
  sudo apt install -y nodejs
  ```
then on both client and server dirs, run..
  ```
  npm install
  ```
which pulls from your package.json. 
## set up .env file
  ```
  touch server/.env
  ```
  ```.env
DB_USER=alexpetro
DB_PASSWORD=postgres888
DB_NAME=small_business_db
DB_HOST=localhost
SERVER_PORT=8000
DB_PORT=5432
CLIENT_URL=http://localhost:5173

# generate secret key with command:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET_KEY=
  ```

## set up database locally
```
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql
CREATE USER alexpetro WITH PASSWORD 'postgres888';
ALTER ROLE alexpetro WITH SUPERUSER;
CREATE DATABASE small_business_db OWNER alexpetro;
\c small_business_db
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash CHAR(60) NOT NULL,
);
```
## optional:
add postgres db to your nvim ui if wanted
  ```
  postgresql:small_business_db
  ```




refs
* https://www.youtube.com/watch?v=7LNl2JlZKHA
* https://www.youtube.com/watch?v=PppslXOR7TA&list=WL&index=4
* https://www.youtube.com/watch?v=Rgvec9UA2_I (this one for tailwind, font)
* https://github.com/oldboyxx/jira_clone  




also the client .env:
  VITE_API_BASE_URL=http://localhost:8000







to build virtual env:
  `python3 -m venv venv`
to run virtual env
  `source venv/bin/activate`
to install dependencies
  `pip3 install -r requirements.txt`
to use jupyter notebooks (lab)
  `jupyter-lab`
to enable your venv installs in jupyter lab
` python -m ipykernel install --user --name=venv --display-name "Python (venv)" `

