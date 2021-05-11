import React, { useState } from 'react';
import Head from 'next/head';
import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../globalStyles/index.scss';
import '../globalStyles/main.scss';
import 'typeface-metropolis';
import '@typefaces-pack/typeface-inter';
import userContext from '../context/userContext';
// Import Swiper styles
import 'swiper/swiper.scss';

// Data Picker styles
import 'react-datepicker/dist/react-datepicker.css';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

function ContextWrapper({children}) {
  // You can use hooks here
  let user, setUser;
  if (typeof(window) !== "undefined"){
    [user, setUser] = useState({ username: window.localStorage.getItem('username'), phone: window.localStorage.getItem('phone')});
    //window.localStorage.clear();
    console.log(user);
  }

  return <> 
          <userContext.Provider value={{user, setUser}}>
            {children}
          </userContext.Provider>
        </>
}


class Srr extends App {
  componentDidMount() {
    new WOW().init({
      offset: 50,
    });
    
  }

  render() {
    
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Houses</title>
        </Head>

        <ContextWrapper>
          <Component {...pageProps} />
        </ContextWrapper>
        
        
      </React.Fragment>
    );
  }
}

export default Srr;
