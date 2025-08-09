// src/App.js
import './App.css';
import Navbar from './travel_1/Navbar';
import Footer from './travel_1/Footer';
import Quiz from './travel_1/Quiz';
import Home from './travel_1/Home';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
// import ReviewForm from './travel_1/ReviewForm ';
import useAuth from './authentication/useAuth';
import DestinationManager from './Destinations/DestinationManager';
import ProfileManagement from './profile/ProfileManagement ';
import TrendingCountries from './countries/TrendingCountries ';
import QuizLanding from './quiz/QuizLanding';
import CountryDetails from './countries/CountryDetails';
// src/App.js

import NotAllowed from './gardes/NotAllowed';
import AdminPanel from './admin/AdminPanel';
function App() {
  const isLogin = useAuth();

  return (
    <div id="root">
      <Router>
        <div className="app-container">
          {isLogin && <Navbar className="nav" />}
          
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={isLogin ? <Home /> : <Navigate to="/out" replace />} 
              />
              <Route 
                path="/admin" 
                element={isLogin ? <AdminPanel /> : <Navigate to="/out" replace />} 
              />
              <Route 
                path="/quiz" 
                element={isLogin ? <Quiz /> : <Navigate to="/out" replace />} 
              />
              <Route 
                path="/destinations" 
                element={isLogin ? <DestinationManager /> : <Navigate to="/out" replace />} 
              />
              <Route 
                path="/profile" 
                element={isLogin ? <ProfileManagement /> : <Navigate to="/out" replace />} 
              />
              <Route 
                path="/trending" 
                element={isLogin ? <TrendingCountries /> : <Navigate to="/out" replace />} 
              />
              <Route 
                  path="/country/:id" 
                  element={isLogin ? <CountryDetails /> : <Navigate to="/out" replace />} 
                />
              <Route path="/out" element={<NotAllowed />} />
              <Route 
                path="*" 
                element={isLogin ? <Navigate to="/" replace /> : <Navigate to="/out" replace />} 
              />
            </Routes>
          </main>
          
          {isLogin && <Footer />}
        </div>
      </Router>
    </div>
  );
}

export default App;