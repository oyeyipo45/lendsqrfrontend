
import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MyErrorBoundary } from './components/MyErrorBoundary'

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Register  = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Notfound = lazy(() => import('./pages/Notfound'));

function App() {
  
  return (
    <Router>
      <Suspense fallback={'...loading !!!!!'}>
        <div className=''>
          {/* <Header /> */}
          <main className=''>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' element={<Notfound />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
