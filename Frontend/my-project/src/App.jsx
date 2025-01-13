import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NGORegister from './components/NGORegister'
import "./App.css"
import NGOLogin from './components/NGOLogin'
import DonorRegister from './components/DonorRegister'
import DonorLoginModal from './components/DonorLoginModal'
import NGODashboard from './components/NGODashboard'
import CustomizePageNGO from './components/CustomizePageNGO'
import RaiseFundsNGO from './components/RaiseFundsNGO'
import DonorsDonatePage from './components/DonorsDonatePage'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'

function App() {
 
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/registerngo" element={<NGORegister />} />
            <Route path="/loginngo" element={<NGOLogin />} />
            <Route path="/registerdonor" element={<DonorRegister />} />
            <Route path="/logindonor" element={<DonorLoginModal />} />
            <Route path="/ngodashboard" element={<NGODashboard />} />
            <Route path="/customizepage" element={<CustomizePageNGO />} />
            <Route path="/raisefunds" element={<RaiseFundsNGO />} />
            <Route path="/donorsdonate" element={<DonorsDonatePage />} />
          </Routes>
    </Router>
  )
}

export default App
