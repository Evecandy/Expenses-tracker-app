
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing.page'
import { useContext} from 'react';
import {AuthContext} from './context/userContext/Context';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import EditExpenseForm from './components/EditExpenseForm';


function App() {
    const { user } = useContext (AuthContext);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/dashboard" element={ user ? <Dashboard/> : <LandingPage/>} />
          <Route path="/editexpense/:id" element={ user ? <EditExpenseForm/> : <LandingPage/>} />
          {/* <Route path="/home-main" element={<Home/>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
