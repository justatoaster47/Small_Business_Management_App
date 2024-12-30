  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Homepage from './pages/Homepage';
  import Login from './pages/Login';
  import Records from './pages/Records';
  import CreateTicket from './pages/CreateTicket';

  function App() {

    return (
      <>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/records' element={<Records />} />
            <Route path='/create-ticket' element={<CreateTicket />} />
          </Routes>
        </Router>

        
        

      
      </>
    );
  }

  export default App;

