import React,{  useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error, success } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading : userDetailsLoading, error : userDetailsError } = userDetails;


   useEffect(() => {
    if (success) {
      navigate('/dashboard')
    }
    else if (user.success && userInfo) {
      navigate('/dashboard')
    }
  }, [success, user]);


  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setMessage("Please fill all fields");
    } else {
      dispatch(login(email, password))
    }
  };

  return (
    <div className="login">
      <div className="customer-signin">
        <div className="customer-signin-header">
          <h3 className="customer-signin-heading">Log In</h3>
          {message && <p>{message}</p>}
          {error && <p className="color-red">{error}</p>}
          {loading && "LOADING  ......"}
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