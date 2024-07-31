# Small_Business_Management_App

refs
* https://www.youtube.com/watch?v=7LNl2JlZKHA
* https://www.youtube.com/watch?v=PppslXOR7TA&list=WL&index=4
* https://www.youtube.com/watch?v=Rgvec9UA2_I (this one for tailwind, font)

# PLANNING DOCUMENT
STACK!!
front end: React (vite)
backend & api: JSX/Express
database: PostgreSQL
version control: git


### FULL STEPS
* make planning document (this)

CONFIGURE CLIENT END
* make git repo (make on github account, then create repo in local directory and link)
[https://github.com]
  ```bash
    echo "# Small_Business_Management_App" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/justatoaster47/Small_Business_Management_App.git
    git push -u origin main
  ```

* cd to project dir, make react app with vite
[https://v3.vitejs.dev/guide/]
  ```bash
    npm create vite@latest client -- --template react  
    cd client
    npm install
    npm run dev
  ```

* install tailwindcss (in client dir)
[https://tailwindcss.com/docs/guides/vite]
  ```bash
  npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
  npx tailwindcss init -p
  ```

* alter tailwind.config.js
  ```javascript
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

* alter src/index.css
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

* run project
  ```bash
    npm run dev
  ```

* check tailwind working (in App.jsx) 
  should be red background with underlined text
  ```javascript
  import React from 'react';

  function App() {
    return (
      <h1 className='underline bg-red-500'>
        Hello, World!
      </h1>
    );
  }

  export default App;
  ```

* install react-router-dom
  ```bash
    npm install react-router-dom
  ```

* create pages/Home.jsx
  ```bash
    mkdir src/pages
    touch src/pages/Homepage.jsx
  ```
  ```javascript
    import React from 'react';
    
    const Homepage = () => {
      return (
        <h1 className='bg-blue-500'>
          Home Page Content
        </h1>
      );
    }

    export default Homepage;
  ```

* alter App.jsx to include Homepage.jsx route
  ```javascript
    import Homepage from './pages/Homepage';
  ```
  this is just to check homepage imports on its how
  ```javascript
    <Homepage />
  ```
  then add react-router-dom
  ```javascript
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
  ```
  ```javascript
        <Router>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
  ```
  (this should be the only thing now in return statement of app.jsx)
  (add another page and another route to test routing, adjust location of /)

















* install client dependencies in client dir
  ```bash
    npm install axios tailwindcss postcss autoprefixer react-router-dom
  ```

* run server / client, check they're linked
  ```bash
    cd client
    npm run dev
  ```
  ```bash
    cd server
    node server.js
  ```
  ```bash
    curl http://localhost:8000/api
  ```
  
* add postgres db to your nvim ui, url provided below
```
postgresql:small_business_management_app
```

* make postgres db, assuming your user is already set up in defaults
  ```bash
    psql 
  ```
  ```sql
    CREATE DATABASE small_business_management_app;
    \c small_business_management_app
  ```

* add proxy links to server -> package.json
  ```json
    "proxy": "http://localhost:5173"
  ```

* add proxy link to client -> vite.config.js
  ```javascript
    server: {
      proxy: {
        // Proxy API requests to the backend server
        '/api': {
          target: 'http://localhost:8000', // URL of the backend server
          changeOrigin: true, // Changes the origin of the host header to the target URL
          rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the URL path
        },
      },
    },
  ```

# RUNNING THE APPLICATION


setup backend
--------------------------------
```bash
mkdir small_business_management_app
cd small_business_management_app
mkdir server
cd server
npm init -y
npm install express cors pg
```

        make server.js file, add api routes
----------------------------
```bash
touch server.js
```
```javascript
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// etc etc

```

                setup frontend
--------------------------------
```bash
npx create-react-app client
cd client
npm install axios
```

          setup proxy in package.json
--------------------------------
```json
"proxy": "http://localhost:5000"
```

       create postgres db and connect
---------------------------
```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);
insert into items (name, description) values ('Fork', 'A utensil used to eat food');
select * from items;

```

     run both servers, seperate terminals
--------------
```bash
cd server
node server.js
```
```bash
cd client
npm start
```

install talwindcss
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init 
```
-----------------------





current implementation goals:
  * add tailwind
  * be able to import/export components
  


