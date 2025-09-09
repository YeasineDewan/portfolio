import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Service from './pages/Service';
import Blog from './pages/Blog';
import PentestingLab from './pages/PentestingLab';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Remove loading screen immediately for better UX
    // The actual content will load asynchronously
    setIsLoading(false);
  }, []);

  return (
    <HeroUIProvider>
      <ThemeProvider>
        <AuthProvider>
          <LoadingScreen isLoading={isLoading} text="Loading" />
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/services" element={<Service />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/pentesting-lab" element={<PentestingLab />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
};

export default App;
