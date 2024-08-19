  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Homepage from './pages/Homepage';
  import Login from './pages/Login';
  import Records from './pages/Records';

  function App() {

    return (
      <>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/records' element={<Records />} />
          </Routes>
        </Router>

        
        

      
      </>
    );
  }

  export default App;

