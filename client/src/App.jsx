import React from 'react';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const routes = [
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
]


const App = () => {
  return(
    <div>
      {routes}
    </div>
  )
}

export default App;
