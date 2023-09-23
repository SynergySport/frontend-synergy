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


const Mergeflow = () => {
  // настройки приложения
  const { startUrlApi, userData, getHeaders } = useContext(AppContext);

  // модальные формы
  const [modalFlowVisible, setModalFlowVisible] = useState(false);
  const [statusFlowModalForm, setStatusFlowModalForm] = useState(false);

  const [flowReferData, setFlowReferData] = useState({
    importance: [],
    managers: [],
  }
  )


  // Список маршрутов
  const [flowList, setFlowList] = useState([]);
  const [flowDetail, setFlowDetail] = useState({
    author_data: { avatar_status: {} },
    stages: [],
  });

  // --- работа с модальной формой
  const handleModalFormFlowDetail = async (event) => {
    const id = event.target.id;
    getFlowReference();
    // getDemandReference()
    if (id) {
      let fullUrl = `${startUrlApi}/api/tools/flow/${id}/`
      let response = await serviceApiPromise(
        'get',
        fullUrl,
        '',
        getHeaders(),
      );
      if (response.data) {
        setFlowDetail(response.data);
        setModalFlowVisible(!modalFlowVisible);
      }

    }
  }

  const handlerBtnNewFlow = () => {
    getFlowReference();
    setFlowDetail({
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
      "stages": [],
      "is_new": true,
    })
    setModalFlowVisible(!modalFlowVisible);
  }


  const handlerAddStageBtn = (event) => {
    const newStage = {
      "id": `new_${flowDetail.stages.length + 1}`,
      "sequence": flowDetail.stages.length + 1,
      "title": "",
      "description": "",
      "duration_of_stage": 1,
      "flow": flowDetail.id,
      "importance": null,
      "confirm_user": null,
      "is_new": true,
    };
    flowDetail.stages.push(newStage);
    setFlowDetail({ ...flowDetail });
  }


  // -- сохарнение 
  const handleSaveModalFormFlowDetail = async (event) => {
    // форма закрывается c сохранением данных
    alert('сработал')
    if (!flowDetail.title) {
      alert('Необходимо указать заголовок заявки');
      return null
    }
    console.log(flowDetail)
    if (flowDetail.is_new) {

      // т.е. дело имеем с новой заявкой
      let fullUrl = `${startUrlApi}/api/tools/flow/`;
      let method = 'post';
      let response = await serviceApiPromise(
        'post',
        fullUrl,
        flowDetail,
        getHeaders(),
      );
      if (response.data) {
        setFlowDetail(response.data);
        setStatusFlowModalForm(false);
        loadData();
      }

    }
    const id = event.target.id;
    if (id) {
      let fullUrl = `${startUrlApi}/api/tools/flow/${id}/`
      let response = await serviceApiPromise(
        'put',
        fullUrl,
        flowDetail,
        getHeaders(),
      );
      if (response.data) {
        setFlowDetail(response.data);
        setStatusFlowModalForm(false);
        loadData();
      }
    }
  }


  // селекторы
  const handleSelectChangeChildModalForm = (event) => {
    const nameField = event.target.name;
    const targetId = event.target.id;

    let stageIndex = flowDetail.stages.findIndex((item) => item.id == targetId);
    flowDetail.stages[stageIndex][nameField] = event.target.options[event.target.selectedIndex].id;
    setFlowDetail({ ...flowDetail });
    setStatusFlowModalForm(true);
  }


  // inputs
  const handleInputsValue = (event) => {
    const nameField = event.target.name;
    flowDetail[nameField] = event.target.value;
    setFlowDetail({ ...flowDetail });
    setStatusFlowModalForm(true);
  }

  const handleInputsChildValue = (event) => {
    const nameField = event.target.name;
    const targetId = event.target.id;
    console.log(event)
    let stageIndex = flowDetail.stages.findIndex((item) => item.id == targetId)
    flowDetail.stages[stageIndex][nameField] = event.target.value;
    setFlowDetail({ ...flowDetail });
    setStatusFlowModalForm(true);
  }


  const handleInputsDateValue = (event) => {
    const nameField = event.target.name;
    const date = new Date(event.target.value)
    demandDetail[nameField] = `${date.toISOString()}`;
    demandDetail[`${nameField}_print`] = event.target.value
    setFlowDetail({ ...demandDetail });
    // setStatusFlowModalForm(true);
  }

  // чеки
  const handleCheckFlow = (event) => {
    flowDetail[event.target.name] = !flowDetail[event.target.name];
    setFlowDetail({ ...flowDetail });
    setStatusFlowModalForm(true);
  }


  // --- получение справочников для модальной формы
  // -- общие 
  const getFlowReference = () => {
    const url = `${startUrlApi}/api/tools/flow/refdata/`
    universalLoadData('get', url, '', '').then((response) => {
      setFlowReferData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }


  //  ------- загручик основных данных 
  const loadData = async (search = '', id = '') => {
    let fullUrl = ''
    if (id != '') {
      fullUrl = `${startUrlApi}/api/tools/flow/${id}/`
    } else {
      fullUrl = `${startUrlApi}/api/tools/flow/`
    }

    let response = await serviceApiPromise(
      'get',
      fullUrl,
      '',
      getHeaders(),
    );

    if (id != '') {
      setFlowDetail(response.data);
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
          Конструктор маршрутов собеседований
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
                  <CButton id={item.id} onClick={handleModalFormFlowDetail}>Открыть</CButton>
                </CCardBody>
              </CCard>
            ))
            }

          </CRow>
        </CCardBody>
      </CCard>

      {/* Модальная форма */}
      <CModal size="lg" scrollable visible={modalFlowVisible} onClose={() => setModalFlowVisible(false)}>
        {/* Заголовок маршрута */}
        <CModalHeader>
          <CModalTitle>{flowDetail.id ? `Маршрут  #${flowDetail.id}` : 'Создание нового маршрута'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow>
              <CCol xs={8}>
                <span>Содержимое маршрута</span>
                <CForm style={{ marginTop: '10px' }} scrollable>
                  <CFormInput
                    type="text"
                    id={flowDetail.id}
                    // label="Заголовок"
                    floatingLabel="Наименование маршрута"
                    placeholder="Введите значение"
                    aria-describedby="exampleFormControlInputHelpInline"
                    name='title'
                    value={flowDetail.title}
                    onChange={handleInputsValue}
                  />


                  <span style={{ fontSize: '12px' }}>Добавьте описание</span>
                  <CFormTextarea
                    type="text"
                    id={flowDetail.id}
                    style={{ fontSize: '12px' }}
                    rows={10}
                    placeholder="Опишите задачу для рекрутера"
                    text=""
                    // aria-describedby="exampleFormControlInputHelpInline"
                    name='description'
                    value={flowDetail.description}
                    onChange={handleInputsValue}
                  />


                  {/*  */}
                  <span>Этапы собеседований</span>
                  {flowDetail.stages.map((item) => (
                    <CCallout color="dark" id={item.id}>
                      <CBadge color="success">{`Этап ${item.sequence}`}</CBadge>
                      <p></p>

                      <CFormInput
                        type="text"
                        id={item.id}
                        // label="Заголовок"
                        floatingLabel="Наименование этапа"
                        placeholder="Введите значение"
                        aria-describedby="exampleFormControlInputHelpInline"
                        name='title'
                        value={item.title}
                        onChange={handleInputsChildValue}
                      />
                      <CFormTextarea
                        type="textarea"
                        id={item.id}
                        // label="Заголовок"
                        style={{ fontSize: '12px', 'marginTop': '10px' }}
                        floatingLabel="Описание задач на этапе"
                        placeholder="Введите значение"
                        aria-describedby="exampleFormControlInputHelpInline"
                        name='description'
                        value={item.description}
                        onChange={handleInputsChildValue}
                      />
                      {/* Длительность этапа в днях */}
                      <CInputGroup size="sm" className="mb-3" style={{ 'marginTop': '10px' }}>
                        <CInputGroupText id="inputGroup-sizing-sm">Длительность этапа, в днях</CInputGroupText>
                        <CFormInput
                          id={item.id}
                          type="number"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          value={item.duration_of_stage}
                          name='duration_of_stage'
                          onChange={handleInputsChildValue}
                        />
                      </CInputGroup>

                      {/* Уровень важности этапа - используется для рейтинга */}
                      <CFormSelect
                        id={item.id}
                        size="sm" className="mb-3" name='direction' aria-label="Large select example"
                        floatingLabel="Уровень важности этапа" style={{ 'padding': '1rem 2rem 0.1rem 0.75rem', 'marginTop': '10px' }}
                        onChange={(e) => handleSelectChangeChildModalForm(e)}
                      >
                        <option>Выберите значение</option>

                        {flowReferData.importance ? flowReferData.importance.map(
                          (itemImp) => (
                            <option
                              id={itemImp.id}
                              name={itemImp.tag}
                              selected={itemImp.id == item.importance ? 'selected' : ''}
                            >
                              {`${itemImp.title} (${itemImp.number_points} баллов)`}
                            </option>
                          )
                        ) : ''}
                      </CFormSelect>

                      {/* Принимающий этап */}
                      <CFormSelect
                        id={item.id}
                        size="sm" className="mb-3" name='direction' aria-label="Large select example"
                        floatingLabel="Ответственный за этап" style={{ 'padding': '1rem 2rem 0.1rem 0.75rem', 'marginTop': '10px' }}
                        onChange={(e) => handleSelectChangeChildModalForm(e)}
                      >
                        <option>Выберите значение</option>

                        {flowReferData.managers ? flowReferData.managers.map(
                          (itemImp) => (
                            <option
                              id={itemImp.id}
                              // name={itemImp.tag}
                              selected={itemImp.id == item.confirm_user ? 'selected' : ''}
                            >
                              {`${itemImp.user_full_name} | ${itemImp.company} `}
                            </option>
                          )
                        ) : ''}
                      </CFormSelect>

                    </CCallout>
                  ))
                  }

                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <CButton id={flowDetail.id} onClick={handlerAddStageBtn}>Добавить</CButton>
                  </div>

                </CForm>


              </CCol>
              <CCol xs={4}>
                <div className=''>
                  <span>Свойства</span>
                  <CCallout color="light">

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                      <CAvatar size="md" src={flowDetail.author_data.avatar_status.src} status={flowDetail.author_data.avatar_status.status} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '10px' }}>Автор маршрута</span>
                        <div>{flowDetail.author_data.first_name}</div>
                        <span style={{ fontSize: '12px' }}>{flowDetail.author_data.company}</span>
                      </div>
                    </div>
                  </CCallout>
                </div>

                {/* установка дат */}
                <div class="form-group">
                  <label for="inputDate" style={{ fontSize: '12px' }}>Дата создания</label>
                  <input type="date" name='create_at' class="form-control" value={flowDetail.created_at_print} onChange={handleInputsDateValue} disabled={true} />
                </div>

                <CCallout color="light">
                  <div class="form-check">
                    <input
                      className='form-check-input'
                      type="checkbox"
                      name="is_active"
                      checked={flowDetail.is_active}
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
                      checked={flowDetail.is_published}
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
          <CButton color="secondary" onClick={() => setModalFlowVisible(false)}>
            Отмена
          </CButton>
          <CButton color="primary" id={flowDetail.id} disabled={!statusFlowModalForm} onClick={handleSaveModalFormFlowDetail}>Сохранить</CButton>
        </CModalFooter>


      </CModal>



    </>
  )
}

export default Mergeflow
