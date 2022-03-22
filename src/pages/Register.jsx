import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {

  const navigate = useNavigate();

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("")
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error, success } = userLogin;
  
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo : userInfoRegister, loading : userRegisterLoading, error  :userRegisterError } = userRegister;

  const userDetails = useSelector((state) => state.userDetails);
  const {  user , loading : userDetailsLoading, error : userDetailsError } = userDetails;

  useEffect(() => {

      if (user.success) {
       navigate('/dashboard')
     } else if (userInfo && userInfoRegister) {
      navigate('/dashboard')
      }
  }, [success, user, navigate, userInfoRegister]);

  const submitHandler = (e) => {
    e.preventDefault();
     if (!first_name || !last_name || !email || !username || !password ) {
      setMessage("Please fill all fields ");
     } else {
         dispatch(register(first_name, last_name, email, username, password));
    }
  };

  return (
    <div className="register">
      <div className="customer-signup">
        <div className="customer-signup-header">
          <h3 className="customer-signup-heading">Create an account</h3>
          {message && <p>{message}</p>}
          {error && <p className="color-red">{error}</p>}
          {loading && "Loading ..."}    
        </div>

        <form action="" onSubmit={submitHandler}>
          <div className="customer-signup-form-group">
            <input
              type="text"
              className="customer-signup-form-input"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              required
            />
          </div>
          
           <div className="customer-signup-form-group">
            <input
              type="text"
              className="customer-signup-form-input"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              required
            />
          </div>

           <div className="customer-signup-form-group">
            <input
              type="text"
              className="customer-signup-form-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="customer-signup-form-group">
            <input
              type="email"
              className="customer-signup-form-input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="customer-signup-form-group">
            <input
              type="password"
              className="customer-signup-form-input"
              placeholder="Password"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="customer-signup-form-group">
            <button type="submit" className="customer-signup-btn">
              Create my account
            </button>

            <Link to="/login" className="customer-signin-forgot-link mt-4">
            Click to LOGIN !!!
          </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register