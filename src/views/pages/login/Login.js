import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Button } from '@coreui/coreui'

import logo_ss from '../../../assets/brand/SS.svg'

import axios from "axios";

const Login = (props) => {

  const navigate = useNavigate();
  // куки для хранения переменных
  const [cookies, setCookie, removeCookie] = useCookies();
  // Получаем значения из контекста
  const { startUrlApi } = useContext(AppContext);

  // Данные пользователя
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getUserData, setUserData] = useState("");

  // Авторизация

  const handleChangeUsername = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // Если авторизация прошла успешно, то устанавливаем cookie и переходим в мой профиль
  const setToken = async (access_token, refresh_token = null, username = null) => {
    // alert(`${access_token} ${refresh_token} ${username}`)
    setCookie("access", access_token, { path: '/' });
    setCookie("refresh", refresh_token, { path: '/' });
    setCookie("username", username, { path: '/' });
    return true;
  };


  const getToken = async (username, password) => {
    // В рамках проекта используется обычный токен
    const data = { "username": username, "password": password }
    const a = await axios.post(`${startUrlApi}/api-token-auth/`, data).then((response) => {
        const t = setToken(response.data["token"], response.data["refresh"], username);
      }).catch(() => 
      {
        alert("Введён неверный логин или пароль!")
        removeCookie("access");
        navigate("/", { replace: true });
      });
    console.log(a)
    console.log('test')
    navigate("/profile/", { replace: true });
    window.location.reload();
  };


  function handleClick() {
    alert('Логика авторизации!');
  }

  useEffect(() => {

  })


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>Авторизация</h2>
                    <p className="text-medium-emphasis">Введите свой логин и пароль</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username"
                        value={getUsername}
                        onChange={handleChangeUsername}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={getPassword}
                        onChange={handleChangePassword}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="dark" className="px-4" onClick={() => getToken(getUsername, getPassword)}>
                          Войти
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Забыли пароль?

                        </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ width: '44%', backgroundColor: '#2a2c30' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={logo_ss} style={{ width: '100px' }} />
                    <h2>Синергия спорта</h2>
                    <p>

                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Начнем?
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
