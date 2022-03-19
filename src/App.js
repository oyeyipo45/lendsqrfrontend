
import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MyErrorBoundary } from './components/MyErrorBoundary'

const Header  = lazy(() => import('./components/Header'));
const Footer  = lazy(() => import('./components/Footer'));
const Login  = lazy(() => import('./pages/Login'));
const Register  = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Notfound = lazy(() => import('./pages/Notfound'));

function App() {
  return (
    <Router>
      <Suspense fallback={'...loading !!!!!'}>
        <div className='main-body'>
          <Header />
          <main className='main-section'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' element={<Notfound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
