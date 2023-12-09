import React, { useContext } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ContextUser } from '../../UserContext/UserContext';
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form?.pathname || '/';
  const { loginGoogle, loginEmailPass } = useContext(ContextUser);
  // handler form submision
  const handlerFormsubmit = e => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    loginEmailPass(email, password)
      .then(result => {
        const logedUser = result.user;
        console.log(logedUser);
        navigate(form, { replace: true });
      })
      .catch(er => console.log(er.message));
  };
  const handlerGoogleLogin = () => {
    loginGoogle()
      .then(result => {
        const logeduser = result.user;
        console.log(logeduser);
        navigate(form, { replace: true });
      })
      .catch(er => console.log(er.message));
  };
  return (
    <div className="form-container">
      <h4 className="title">Login</h4>
      <form onSubmit={handlerFormsubmit} action="">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" placeholder="Enter email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password" />
        </div>
        <input className="submitBtn" type="submit" value="Login" />
      </form>
      <p className="link-text">
        <small>
          New to Ema-john? <Link to="/registation">Create New Account</Link>{' '}
        </small>
      </p>
      <div className="line-field">
        <div className="line"></div>
        <small>Or</small>
        <div className="line"></div>
      </div>

      <div onClick={handlerGoogleLogin} className="googleLogin">
        <img
          src="https://pbs.twimg.com/profile_images/1605297940242669568/q8-vPggS_400x400.jpg"
          alt=""
        />{' '}
        <p>Continue With Google</p>
      </div>
    </div>
  );
};

export default Login;
