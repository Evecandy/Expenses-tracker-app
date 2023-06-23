
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing.page'
import Home from './pages/Home';
import { useContext} from 'react';
import {AuthContext} from './context/userContext/Context';
import NotFound from './pages/NotFound';


function App() {
    const { user } = useContext (AuthContext);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/dashboard" element={ user ? <Home/> : <LandingPage/>} />
          {/* <Route path="/home-main" element={<Home/>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
