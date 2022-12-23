import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from './UserRegister';
import { DataParser } from './DataParser';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={ <UserRegister /> } />
      <Route path='/csv' element={ <DataParser />} />
    </Routes>
  </Router>
  );
}

export default App;
