import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import SolarSystem from './pages/SolarSystem'
import Missions from './pages/Missions' // ← Tambahkan ini
import Education from './pages/Education' // ← Tambahkan ini
import Gallery from './pages/Gallery' // ← Pastikan ini ada
import Observation from './pages/Observation' // ← Pastikan ini ada
import Technology from './pages/Technology'
import Chatbot from './pages/Chatbot'
import ChatbotTest from './pages/ChatbotTest';
import SolarSystemCourse from './pages/courses/SolarSystemCourse'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-950">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solar-system" element={<SolarSystem />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/education" element={<Education />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/observation" element={<Observation />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/test" element={<ChatbotTest />} />
            <Route path="/education/courses/solar-system" element={<SolarSystemCourse />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App