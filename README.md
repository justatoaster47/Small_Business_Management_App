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
  node server.js
  ```

# setup
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

# PLANNING DOCUMENT
STACK!!
front end: React (vite)
backend & api: JSX/Express
database: PostgreSQL
version control: git

# todos
need Docker app as well
list dependencies better

### FULL STEPS
1. make planning document (this)

#### CONFIGURE CLIENT END
2. make git repo (make on github account, then create repo in local directory and link)
[https://github.com]
  ```bash
    echo "# Small_Business_Management_App" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/justatoaster49/Small_Business_Management_App.git
    git push -u origin main
  ```

4. cd to project dir, make react app with vite
[https://v7.vitejs.dev/guide/]
  ```bash
    npm create vite@latest client -- --template react  
    cd client
    npm install
    npm run dev
  ```

6. install tailwindcss (in client dir)
[https://tailwindcss.com/docs/guides/vite]
  ```bash
  npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
  npx tailwindcss init -p
  ```

7. alter tailwind.config.js
  ```javascript
  export default {
    content: [
      "./index.html",
      "./src/8.*/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

9. alter src/index.css
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

10. run project
  ```bash
    npm run dev
  ```

11. check tailwind working (in App.jsx) 
  should be red background with underlined text
  ```javascript
  import React from 'react';

  function App() {
    return (
      <h12 className='underline bg-red-500'>
        Hello, World!
      </h13>
    );
  }

  export default App;
  ```

14. install react-router-dom
  ```bash
    npm install react-router-dom
  ```

15. create pages/Home.jsx
  ```bash
    mkdir src/pages
    touch src/pages/Homepage.jsx
  ```
  ```javascript
    import React from 'react';
    
    const Homepage = () => {
      return (
        <h16 className='bg-blue-500'>
          Home Page Content
        </h17>
      );
    }

    export default Homepage;
  ```

18. alter App.jsx to include Homepage.jsx route
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



#### link backend to frontend

1. make postgres db, assuming your user is already set up in defaults
  ```bash
    psql 
  ```
  ```sql
    CREATE DATABASE small_business_management_app;
    \c small_business_management_app
  ```
  create login table
  ```sql
    CREATE TABLE items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT
    );
    insert into items (name, description) values ('Fork', 'A utensil used to eat food');
    select * from items;
  ```

2. add postgres db to your nvim ui if wanted
  ```
  postgresql:small_business_management_app
  ```

3. make server directory, install express, cors, pg
  ```bash
    mkdir server
    cd server
    npm init -y
    npm install express cors pg dotenv
  ```

4. configure server files
  .env file
  ```bash
    echo "DB_USER = 'alexpetro' \nDB_PASSWORD = 'postgres888'" >> .env
  ```
  server.js
  ```bash 
    touch server.js
  ```
  ```javascript
      const express = require('express');
      const cors = require('cors');
      const { Pool } = require('pg');

      require('dotenv').config();

      const app = express();
      const PORT = process.env.PORT || 8000;

      app.use(cors());
      app.use(express.json());

      // PostgreSQL connection
      const pool = new Pool({
        user: process.env.DB_USER,
        host: 'localhost',
        database: 'small_business_management_app',
        password: process.env.DB_PASSWORD,
        port: 5432,
      });

      // Define routes here
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });

      // Get all items
      app.get('/api/items', async (req, res) => {
        try {
          const { rows } = await pool.query('SELECT * FROM items');
          res.json(rows);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Server error' });
        }
      });

  ```
5. adjust homepage.jsx to test server/client connection (should route to app.jsx)
  ```javascript
    import React, {useState, useEffect} from 'react';

    const Homepage = () => {
      const [data, setData] = useState([]);

      useEffect(() => {
        fetch('http://localhost:8000/api/items')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);


      return (
        <div>
          hello! homepage

          {data.map(item => (
            <div key={item.id}>{item.name}, {item.description}</div>
          ))}
        </div>
      );
    }

    export default Homepage;
```







## will include...
User Management:

    User registration and authentication
    Role-based access control (e.g., admin, manager, employee)
    User profiles and settings

Inventory Management:

    Product catalog
    Stock tracking
    Low stock alerts
    Barcode/SKU management

Customer Relationship Management (CRM):

    Customer database
    Contact information
    Purchase history
    Communication logs

Order Management:

    Order creation and tracking
    Invoice generation
    Order status updates

Financial Management:

    Basic accounting features
    Expense tracking
    Revenue reporting
    Financial dashboards

Employee Management:

    Employee profiles
    Time tracking
    Shift scheduling
    Performance metrics

Reporting and Analytics:

    Sales reports
    Inventory reports
    Financial reports
    Custom report generation

Document Management:

    File storage and organization
    Document sharing and collaboration
    Version control

Communication Tools:

    Internal messaging system
    Email integration
    Notification system

Task and Project Management:

    Task assignment and tracking
    Project timelines and milestones
    Collaboration tools

Marketing and Sales:

    Basic CRM functionality
    Email marketing integration
    Sales pipeline tracking

Settings and Configuration:

    Business profile management
    System settings
    Customization options

Security Features:

    Data encryption
    Regular backups
    Audit logs

Integration Capabilities:

    API for third-party integrations
    Common integrations (e.g., payment gateways, shipping services)

Mobile Accessibility:

    Responsive design or mobile app for on-the-go access


### CREATION OF LOGIN PAGE:
  Here are some key steps to build a high-quality login page with React:

      Create a new React component for the login page, e.g. LoginPage.jsx.
      Design a clean and user-friendly UI with input fields for username/email and password. Use semantic HTML elements like <form>, <label>, and <input>.
      Add state management to handle form inputs:

  jsx
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

      Implement form validation:

      Check that email and password are not empty
      Validate email format
      Ensure password meets minimum requirements

      Handle form submission:

      Prevent default form behavior
      Call authentication API/service
      Handle success/failure responses

      Add error handling and display error messages to the user.
      Implement "Remember me" functionality using local storage.
      Add a "Forgot password" link.
      Use React Router to handle navigation after successful login.
      Style the page for a polished look - consider using CSS modules or a UI library.
      Make the form accessible with proper labels, ARIA attributes, etc.
      Add loading indicators for API calls.
      Implement security best practices like HTTPS, CSRF protection, rate limiting.
      Add unit and integration tests for the login functionality.
      Consider adding social login options.
      Make the page responsive for mobile devices.

  Key things to focus on are user experience, security, error handling, and clean, maintainable
  code. Using a UI component library like Material-UI can help create a polished look quickly.
  Testing thoroughly and following React best practices will result in a high-quality login
  page.

