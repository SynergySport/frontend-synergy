import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useContext } from 'react'
import classNames from 'classnames'
import {
  CRow, CCol, CCard, CCardHeader, CCardBody, CCardImage, CCardTitle, CCardText, CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CCallout,
  CInputGroup,
  CInputGroupText,
  CBadge,
  CForm,
  CFormInput,
  CContainer,
  CFormSelect,
  CFormTextarea,
  CAvatar,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import imgCard from 'src/assets/images/react.jpg'
import { AppContext } from "../../App";

import axios from 'axios';

// сервис для работы с API
const serviceApiPromise = (method = 'get', full_url = '', data = {}, headers = {}) => {
  return axios({
    method: method,
    url: full_url,
    headers: headers,
    data: data
  }).then(res => res).catch(err => console.log(err))
}


const Vacancies = () => {
  // настройки приложения
  const { startUrlApi, userData, getHeaders } = useContext(AppContext);

  // модальные формы
  const [modalVacancyVisible, setModalVacancyVisible] = useState(false);
  const [statusVacancyModalForm, setStatusVacancyModalForm] = useState(false);

  const [flowReferData, setVacancyReferData] = useState({
    importance: [],
    managers: [],
  }
  )


  // Список вакансий
  const [flowList, setFlowList] = useState([]);
  const [vacancyDetail, setVacancyDetail] = useState({
    author_data: { avatar_status: {} },
    stages: [],
  });

  // --- работа с модальной формой
  const handleModalFormvacancyDetail = async (event) => {
    const id = event.target.id;
    getFlowReference();
    // getDemandReference()
    if (id) {
      let fullUrl = `${startUrlApi}/api/tools/vacancy/${id}/`
      let response = await serviceApiPromise(
        'get',
        fullUrl,
        '',
        getHeaders(),
      );
      if (response.data) {
        setVacancyDetail(response.data);
        setModalVacancyVisible(!modalVacancyVisible);
      }

    }
  }

  const handlerBtnNewFlow = () => {
    getFlowReference();
    setVacancyDetail({
      "author": userData.id,
      "author_data": {
        "id": userData.id,
        "first_name": userData.first_name,
        "company": userData.company,
        "author_full_name": userData.author_full_name,
        "avatar_status": {
          "src": userData.avatar,
          "status": 'success'
        }
      },
      "is_new": true,
    })
    setModalVacancyVisible(!modalVacancyVisible);
  }


  const handlerAddStageBtn = (event) => {
    const newStage = {
      "id": `new_${vacancyDetail.stages.length + 1}`,
      "sequence": vacancyDetail.stages.length + 1,
      "title": "",
      "description": "",
      "duration_of_stage": 1,
      "flow": vacancyDetail.id,
      "importance": null,
      "confirm_user": null,
      "is_new": true,
    };
    vacancyDetail.stages.push(newStage);
    setVacancyDetail({ ...vacancyDetail });
  }


  // -- сохарнение 
  const handleSaveModalFormVacancyDetail = async (event) => {
    // форма закрывается c сохранением данных
    if (!vacancyDetail.title) {
      alert('Необходимо указать заголовок заявки');
      return null
    }
    console.log(vacancyDetail)
    if (vacancyDetail.is_new) {

      // т.е. дело имеем с новой заявкой
      let fullUrl = `${startUrlApi}/api/tools/vacancy/`;
      let method = 'post';
      let response = await serviceApiPromise(
        'post',
        fullUrl,
        vacancyDetail,
        getHeaders(),
      );
      if (response.data) {
        setVacancyDetail(response.data);
        setStatusVacancyModalForm(false);
        loadData();
      }

    }
    const id = event.target.id;
    if (id) {
      let fullUrl = `${startUrlApi}/api/tools/vacancy/${id}/`
      let response = await serviceApiPromise(
        'put',
        fullUrl,
        vacancyDetail,
        getHeaders(),
      );
      if (response.data) {
        setVacancyDetail(response.data);
        setStatusVacancyModalForm(false);
        loadData();
      }
    }
  }


  // селекторы
  const handleSelectChangeChildModalForm = (event) => {
    const nameField = event.target.name;
    const targetId = event.target.id;

    let stageIndex = vacancyDetail.stages.findIndex((item) => item.id == targetId);
    vacancyDetail.stages[stageIndex][nameField] = event.target.options[event.target.selectedIndex].id;
    setVacancyDetail({ ...vacancyDetail });
    setStatusVacancyModalForm(true);
  }


  // inputs
  const handleInputsValue = (event) => {
    const nameField = event.target.name;
    vacancyDetail[nameField] = event.target.value;
    setVacancyDetail({ ...vacancyDetail });
    setStatusVacancyModalForm(true);
  }

  const handleInputsChildValue = (event) => {
    const nameField = event.target.name;
    const targetId = event.target.id;
    console.log(event)
    let stageIndex = vacancyDetail.stages.findIndex((item) => item.id == targetId)
    vacancyDetail.stages[stageIndex][nameField] = event.target.value;
    setVacancyDetail({ ...vacancyDetail });
    setStatusVacancyModalForm(true);
  }


  const handleInputsDateValue = (event) => {
    const nameField = event.target.name;
    const date = new Date(event.target.value)
    demandDetail[nameField] = `${date.toISOString()}`;
    demandDetail[`${nameField}_print`] = event.target.value
    setVacancyDetail({ ...demandDetail });
    // setStatusVacancyModalForm(true);
  }

  // чеки
  const handleCheckFlow = (event) => {
    vacancyDetail[event.target.name] = !vacancyDetail[event.target.name];
    setVacancyDetail({ ...vacancyDetail });
    setStatusVacancyModalForm(true);
  }


  // --- получение справочников для модальной формы
  // -- общие 
  const getFlowReference = () => {
    const url = `${startUrlApi}/api/tools/flow/refdata/`
    universalLoadData('get', url, '', '').then((response) => {
      setVacancyReferData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }


  //  ------- загручик основных данных 
  const loadData = async (search = '', id = '') => {
    let fullUrl = ''
    if (id != '') {
      fullUrl = `${startUrlApi}/api/tools/vacancy/${id}/`
    } else {
      fullUrl = `${startUrlApi}/api/tools/vacancy/`
    }

    let response = await serviceApiPromise(
      'get',
      fullUrl,
      '',
      getHeaders(),
    );

    if (id != '') {
      setVacancyDetail(response.data);
    } else {
      setFlowList(response.data);
    }
  }

  // универсальный загрузчик
  const universalLoadData = async (method = 'get', url = '', data = '') => {
    let response = await serviceApiPromise(
      method,
      url,
      data,
      getHeaders(),
    );
    return response
  }



  useEffect(
    () => {
      loadData();
    }, []
  )

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          Конструктор вакансий
          <CButton onClick={handlerBtnNewFlow}>+ Добавить</CButton>
        </CCardHeader>
        <CCardBody>
          <CRow>
            {flowList.map((item) => (
              <CCard style={{ width: '20rem', marginRight: '10px' }}>
                <CCardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: '10px' }}>
                  <p>#{item.id}</p>
                  <CCardTitle>{item.title}</CCardTitle>

                  <CCardText>
                    {`Автор: ${item.author_data.author_full_name}`}
                    <p>{`Компания: ${item.author_data.company}`}</p>
                  </CCardText>
                  <CButton id={item.id} onClick={handleModalFormvacancyDetail}>Открыть</CButton>
                </CCardBody>
              </CCard>
            ))
            }

          </CRow>
        </CCardBody>
      </CCard>

      {/* Модальная форма */}
      <CModal size="lg" scrollable visible={modalVacancyVisible} onClose={() => setModalVacancyVisible(false)}>
        {/* Заголовок маршрута */}
        <CModalHeader>
          <CModalTitle>{vacancyDetail.id ? `Вакансия  #${vacancyDetail.id}` : 'Создание новой вакансии'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow>
              <CCol xs={8}>
                <span>Содержимое вакансии</span>
                <CForm style={{ marginTop: '10px' }} scrollable>
                  <CFormInput
                    type="text"
                    id={vacancyDetail.id}
                    // label="Заголовок"
                    floatingLabel="Введите наименование вакансии"
                    placeholder="Введите значение"
                    aria-describedby="exampleFormControlInputHelpInline"
                    name='title'
                    value={vacancyDetail.title}
                    onChange={handleInputsValue}
                  />
                  <CFormInput
                    type="text"
                    id={vacancyDetail.id}
                    style={{ fontSize: '12px' }}
                    // label="Заголовок"
                    floatingLabel="Требуемый опыт работы"
                    placeholder="Введите значение"
                    aria-describedby="exampleFormControlInputHelpInline"
                    name='required_work_experience'
                    value={vacancyDetail.required_work_experience}
                    onChange={handleInputsValue}
                  />
                  <span style={{ fontSize: '12px' }}>Описание вакансии</span>
                  <CFormTextarea
                    type="text"
                    id={vacancyDetail.id}
                    style={{ fontSize: '12px' }}
                    rows={10}
                    placeholder="Описание вакансии"
                    text=""
                    // aria-describedby="exampleFormControlInputHelpInline"
                    name='description'
                    value={vacancyDetail.description}
                    onChange={handleInputsValue}
                  />
                  <span style={{ fontSize: '12px' }}>Требования</span>
                  <CFormTextarea
                    type="text"
                    id={vacancyDetail.id}
                    style={{ fontSize: '12px' }}
                    rows={10}
                    placeholder="Описание вакансии"
                    text=""
                    // aria-describedby="exampleFormControlInputHelpInline"
                    name='requirements'
                    value={vacancyDetail.requirements}
                    onChange={handleInputsValue}
                  />
                  <span style={{ fontSize: '12px' }}>Условния работы</span>
                  <CFormTextarea
                    type="text"
                    id={vacancyDetail.id}
                    style={{ fontSize: '12px' }}
                    rows={10}
                    placeholder="Описание вакансии"
                    text=""
                    // aria-describedby="exampleFormControlInputHelpInline"
                    name='conditions'
                    value={vacancyDetail.conditions}
                    onChange={handleInputsValue}
                  />


                </CForm>


              </CCol>
              <CCol xs={4}>
                <div className=''>
                  <span>Свойства</span>
                  <CCallout color="light">

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                      <CAvatar size="md" src={vacancyDetail.author_data.avatar_status.src} status={vacancyDetail.author_data.avatar_status.status} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '10px' }}>Автор маршрута</span>
                        <div>{vacancyDetail.author_data.first_name}</div>
                        <span style={{ fontSize: '12px' }}>{vacancyDetail.author_data.company}</span>
                      </div>
                    </div>
                  </CCallout>
                </div>

                {/* установка дат */}
                <div class="form-group">
                  <label for="inputDate" style={{ fontSize: '12px' }}>Дата создания</label>
                  <input type="date" name='create_at' class="form-control" value={vacancyDetail.created_at_print} onChange={handleInputsDateValue} disabled={true} />
                </div>

                <CCallout color="light">
                  <div class="form-check">
                    <input
                      className='form-check-input'
                      type="checkbox"
                      name="is_active"
                      checked={vacancyDetail.is_active}
                      onChange={handleCheckFlow}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      активная
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      className='form-check-input'
                      type="checkbox"
                      name="is_published"
                      checked={vacancyDetail.is_published}
                      onChange={handleCheckFlow}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      опубликована
                    </label>
                  </div>
                </CCallout>

              </CCol>
            </CRow>

          </CContainer>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVacancyVisible(false)}>
            Отмена
          </CButton>
          <CButton color="primary" id={vacancyDetail.id} disabled={!statusVacancyModalForm} onClick={handleSaveModalFormVacancyDetail}>Сохранить</CButton>
        </CModalFooter>


      </CModal>



    </>
  )
}

export default Vacancies

