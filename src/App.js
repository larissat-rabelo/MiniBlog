import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import NavBar from './Components/NavBar'
import Footer from './Components/Footer';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />}/>
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
