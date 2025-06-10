import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PricingPage from './components/PricingPage';
import AboutUsPage from './pages/AboutUsPage';
import CardHubExperiment from './components/CardHubExperiment';
import SwipeApp from './components/SwipeApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/app/cards" element={<CardHubExperiment />} />
        <Route path="/app/jobs" element={<SwipeApp onCollapse={() => {}} userType={null} jobListings={[
          {company: 'Microsoft', title: 'Software Engineer', location: 'Remote', description: 'Build cool stuff!', logo: 'https://pngimg.com/d/microsoft_PNG13.png'},
          {company: 'Google', title: 'Frontend Developer', location: 'NYC', description: 'Work on search UI.', logo: 'https://pngimg.com/d/google_PNG19644.png'},
          {company: 'Amazon', title: 'Cloud Architect', location: 'Seattle', description: 'Design AWS solutions.', logo: 'https://pngimg.com/d/amazon_PNG11.png'}
        ]} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);