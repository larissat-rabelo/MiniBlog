import './App.css';
import { AuthProvider } from './Context/Context';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './Components/Hooks/useAuthentication';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import NavBar from './Components/NavBar'
import Footer from './Components/Footer';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import CreatePost from './Pages/CreatePost/CreatePost'
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()
  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }
  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />}/>
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />}/>
              <Route path='/daahboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
