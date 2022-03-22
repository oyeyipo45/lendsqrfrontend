import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ping } from '../redux/actions'
import { useDispatch } from "react-redux";

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ping())
  }, [dispatch])
  

    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    const goToRegister = () => {
        navigate('/register')
    }



  return (
     <div className="login">
          <div className="customer-signin">
              <h3 align="center">Lendsqr App</h3>
              <div className='home-wrapper'>
                  <div className="customer-signin-form-group">
                      <button type="submit"  onClick={goToLogin} className="customer-signin-btn">
                        Login
                      </button>
                  </div>

                  <div className="customer-signin-form-group">
                      <button type="submit"  onClick={goToRegister} className="customer-signin-btn">
                        Register
                      </button>
                  </div>
              </div>
      </div>
    </div>
  )
}

export default Home