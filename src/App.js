import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import About from './Pages/About/About';

function App() {
  return (
    <div className="App">
      <h1>MiniBlog</h1>
      <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
