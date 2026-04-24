import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import HowToUse from '@/pages/HowToUse';
import Terms from '@/pages/Terms';
import Download from '@/pages/Download';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <Routes>
          {/* Default route - redirect to Bengali */}
          <Route path="/" element={<Navigate to="/bn" replace />} />
          
          {/* Bengali routes */}
          <Route path="/bn" element={<Home />} />
          <Route path="/bn/features" element={<Features />} />
          <Route path="/bn/pricing" element={<Pricing />} />
          <Route path="/bn/how-to-use" element={<HowToUse />} />
          <Route path="/bn/terms" element={<Terms />} />
          <Route path="/bn/download" element={<Download />} />
          <Route path="/bn/contact" element={<Contact />} />
          <Route path="/bn/privacy" element={<Privacy />} />
          <Route path="/bn/cookies" element={<Cookies />} />
          
          {/* English routes */}
          <Route path="/en" element={<Home />} />
          <Route path="/en/features" element={<Features />} />
          <Route path="/en/pricing" element={<Pricing />} />
          <Route path="/en/how-to-use" element={<HowToUse />} />
          <Route path="/en/terms" element={<Terms />} />
          <Route path="/en/download" element={<Download />} />
          <Route path="/en/contact" element={<Contact />} />
          <Route path="/en/privacy" element={<Privacy />} />
          <Route path="/en/cookies" element={<Cookies />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
}

export default App;
