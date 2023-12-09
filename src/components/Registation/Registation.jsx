import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextUser } from '../../UserContext/UserContext';

const Registation = () => {
  const [error, setError] = useState('');
  const passRef1 = useRef();
  const passRef2 = useRef();
  const { loginGoogle, createUser } = useContext(ContextUser);
  // handler form submision
  const handlerFormsubmit = e => {
    setError('');
    e.preventDefault();
    const form = e.target;
    const confirmPass = form.confirm.value;
    const email = form.email.value;
    const password = form.password.value;
    if (password.length < 6) {
      setError('Password must be 6 charecter');
      return;
    }
    if (confirmPass !== password) {
      setError('Password not match');
      return;
    }

    createUser(email, password)
      .then(result => {
        const logedUser = result.user;
        console.log(logedUser);
      })
      .catch(er => setError(er.message));
  };
  // handler with google login
  const handlerGoogleLogin = () => {
    loginGoogle()
      .then(result => {
        const logeduser = result.user;
        console.log(logeduser);
      })
      .catch(er => console.log(er.message));
  };
  const handlerShowPass = e => {
    const isChecked = e.target.checked;
    if (isChecked) {
      passRef1.current.type = 'text';
      passRef2.current.type = 'text';
    } else {
      passRef1.current.type = 'password';
      passRef2.current.type = 'password';
    }
  };
  return (
    <div className="form-container">
      <h4 className="title">Registation</h4>
      <form onSubmit={handlerFormsubmit} action="">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" placeholder="Enter email" />
        </div>
        <div className="form-control">
          <label htmlFor="name">Password</label>
          <input
            ref={passRef1}
            type="password"
            name="password"
            placeholder="Enter password"
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            ref={passRef2}
            type="password"
            name="confirm"
            placeholder="Retype password"
          />
          <p className="error">{error}</p>
        </div>
        <div className="checkbox">
          <input
            onChange={handlerShowPass}
            type="checkbox"
            name="checkbox"
            id="check"
          />
          <label htmlFor="check">Show Password</label>
        </div>
        <input className="submitBtn" type="submit" value="Register" />
      </form>
      <p className="link-text">
        <small>
          Already have an account? <Link to="/login">Login</Link>{' '}
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

export default Registation;
