import React from 'react';
import Nav from './Nav';
// import { AccessTokenContext } from '../context/AccessTokenContext';
const Home = () => {
  // const {accessToken}=useContext(AccessTokenContext);
  // console.log(accessToken);
  return (
    <div>
      <Nav />
      <h2>Welcome to the Home Page!</h2>
      {/* Display additional content as needed */}
    </div>
  );
};

export default Home;
