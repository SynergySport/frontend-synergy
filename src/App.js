import React, { Component, Suspense, createContext, useEffect, useState } from 'react';
import { Cookies, useCookies } from "react-cookie";
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import './scss/style.scss'
import './scss/synergy_css.css'

import axios from "axios";



function _navigateToPage(pageName) {
  const navigate = new useNavigate()
  navigate("/login", { replace: true });
}


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

export const AppContext = createContext();
// const navigate = useNavigate();
const startUrlApi = `http://${window.location.hostname}:8000`; // http://127.0.0.1:8000

class App extends Component {


  constructor(props) {
    super();

    this.cook = new Cookies();

    this.state = {
      userData: {},
      accessToken: '',
    };
    // биндинг методов
    this.getTokenFromCookies = this.getTokenFromCookies.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.getUser = this.getUser.bind(this);
    this.isAuth = this.isAuth.bind(this);
  }


  getTokenFromCookies() {
    let tokenData = {}
    tokenData['accessToken'] = this.cook.get('access');

    console.log(tokenData)
    this.setState(tokenData);
  };

  isAuth() {
    return !!this.state.accessToken;
  };

  getHeaders() {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${this.cook.get('access')}`
    };

    if (this.isAuth()) {
      headers["Authorization"] = `Token ${this.cook.get('access')}`;
    }
    return headers;
  };

  // Cразу получим данные пользователя в контекст
  getUser(token) {
    axios.get(`${startUrlApi}/api/myprofile/`, { headers: this.getHeaders() })
      .then(
        response => {
          console.log(response.data[0]);
          this.setState({ "userData": response.data[0] })
          this.getTokenFromCookies();
        }
      )
      .catch(error => {
        //Если ошибка, то выводим на страницу ошибки
        console.log(error)
        // alert(`${window.location.host} ${window.location}`)
        // if (window.location === window.location.host) {
        //   window.location.replace(`http://${window.location.host}`);
        // }
        // if (window.location != window.location.host) {
        //   window.location.replace(`http://${window.location.host}`);
        // }


        // _navigateToPage("/login")
        // setCookie("access", '', { path: '/' });
        // setCookie("refresh", '', { path: '/' });
        // setCookie("username", '', { path: '/' });
        // let navigate = useNavigate();
        // navigate("/login", { replace: true });
      })
  }

  componentDidMount() {
    
    this.getUser('');
  }


  render() {
    return (
      <AppContext.Provider value={
        {
          startUrlApi: startUrlApi,
          userData: this.state.userData,
          getUserData: this.getUser,
          getHeaders: this.getHeaders,
        }
      }>
        <HashRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="*" name="Главная" element={<DefaultLayout />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </AppContext.Provider>
    )
  }
}

export default App
