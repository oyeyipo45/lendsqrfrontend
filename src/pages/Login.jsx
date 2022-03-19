import React,{  useState, useEffect} from 'react'
import { Link } from "react-router-dom";

const Login = () => {

   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);


  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setMessage("Please fill all fields");
    } else {;
    }
  };

  return (
    <div className="login">
      <div className="customer-signin">
        <div className="customer-signin-header">
          <h3 className="customer-signin-heading">Log In</h3>

        </div>

        <form
          action=""
          onSubmit={submitHandler}
          className="customer-signin-form"
        >
          <div className="customer-signin-form-group">
            <input
              type="email"
              className="customer-signin-form-input"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="customer-signin-form-group">
            <input
              type="password"
              className="customer-signin-form-input"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="customer-signin-form-group">
            <button type="submit" className="customer-signin-btn">
              Log In
            </button>
          </div>
          <Link to="/register" className="customer-signin-forgot-link">
            Click to REGISTER !!!
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login