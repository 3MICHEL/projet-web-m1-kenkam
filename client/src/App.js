import {BrowserRouter, Navigate, Routes,Route } from 'react-router-dom';
import Navbar from './components/navbar';
import User from './views/user';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<User/>} />
        <Route path='/Book' element={<User/>} />
      </Routes>
      </BrowserRouter>
          </div>
  );
}

export default App;
