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

