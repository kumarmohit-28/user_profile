import React, { useState, useContext }from 'react';
import {  useNavigate  } from 'react-router-dom';
import { loginAPI } from '../services/handle';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { AccessTokenContext } from '../context/AccessTokenContext';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const { setAccessToken} = useContext(AccessTokenContext);


  const handleLogin = async (userData) => {
    // try {
      try {
        const response = await loginAPI(userData);
        setMessage(response.data.message);
        setAccessToken(response.data.access_token);
        setIsAuthenticated(true);
        setUser(userData.username);
        // console.log(accessToken);
        // console.log(response.data.access_token);
        navigate("/");

      } catch (error) {
        setMessage(`Error: ${error.response.data.message}`);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    handleLogin(userData);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <h2>Login</h2>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   </label>
    //   <button type="submit">Login</button>
    // </form>
    <div class="theme-layout">
      <div class="container-fluid pdng0">
        <div class="row merged">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="land-featurearea">
              <div class="land-meta">
                <h1>Glitchh</h1>
                <p>
                  Glitchh
                </p>
                <div class="friend-logo">
                  {/* <span>
                    <img
                      style={{
                        height: "100px",
                        width: "130px",
                        paddingBottom: "30px",
                        paddingLeft: "3px",
                      }}
                      src={logo}
                      alt=""
                    />
                  </span> */}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="login-reg-bg"></div>
            <div class="log-reg-area sign">
              <h2 class="log-title">Login</h2>
              <form method="post" onSubmit={handleSubmit}>
                
                <div class="form-group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label class="control-label" for="input">
                    Username
                  </label>
                  <i class="mtrl-select"></i>
                </div>

                

                <div class="form-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label class="control-label" for="input">
                    Password
                  </label>
                  <i class="mtrl-select"></i>
                </div>
                

                
                <div class="submit-btns">
                  <button
                    class="mtr-btn signin"
                    type="submit"
                    // onClick={() => handleSubmit()}
                  >
                    <span>Login</span>
                  </button>
                </div>
                {message && <p>{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
