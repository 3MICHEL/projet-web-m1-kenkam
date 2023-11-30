import {BrowserRouter, Navigate, Routes,Route } from 'react-router-dom';
import Navbar from './components/navbar';
import User from './views/user';
import Author from './views/author'
import Book from './views/book';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<User/>} />
        <Route path='/authors' element={<Author/>} />
        <Route path='/books' element={<Book/>} />
      </Routes>
      </BrowserRouter>
          </div>
  );
}

export default App;
