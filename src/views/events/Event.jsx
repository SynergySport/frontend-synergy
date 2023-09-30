import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useContext } from 'react'

import { AppContext } from "../../App";

import axios from 'axios';
import { eventListeners } from '@popperjs/core'

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDatePicker,
    CBadge,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CFormSelect,
    CRow,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
    CTableBody,
    CContainer,
    CAvatar,
    CProgress,
    CFormCheck,
    CNav,
    CTabContent,
    CNavItem,
    CNavLink,
    CTabPane,
    CButtonGroup,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CModalBody,
    CCallout,
    CInputGroup,
    CInputGroupText
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilCheck,
    cilPeople,
    cilUser,
    cilUserFemale,
    cilTrash,
    cilSpreadsheet,
    cilSearch,
    cilCheckCircle,
    cilAvTimer

} from '@coreui/icons'

import { getFormatDate } from '../../utils/datetime.js';

import { EventCard } from './EventCard/EventCard'

// import { every } from 'core-js/core/array'


// сервис для работы с API
const serviceApiPromise = (method = 'get', full_url = '', data = {}, headers = {}) => {
    return axios({ method: method, url: full_url, headers: headers, data: data }).then(res => res).catch(err => console.log(err))
}



const Events = (props) => { // настройки приложения
    const { startUrlApi, userData, getHeaders } = useContext(AppContext);
    const [modalEventVisible, setModalEventVisible] = useState(false);

    // описание триггеров для бизнес логики
    const [inputSearch, setInputSearch] = useState('');
    // статус события
    const [statusEvent, setStatusEvent] = useState('new');

    // Event data list
    const [eventsDataList, setEventsDataList] = useState([{
        users_data: []
    }]);


    // динамический поиск
    const handleInputSeacrh = (event) => {
        setInputSearch(event.target.value);
    }

    const handleTab = (event) => {
        console.log(event.target.id);
        setStatusEvent(event.target.id);
    };

    // Создание события
    const handleButtonCreateEvent = (event) => {
        alert('Будет создано новое событи');
    }

    // Модальная форма
    const handleModalFormEventDetail = (event) => {
        alert(`Будет показана форма с описанием события ${event.target.id
            }`);
    }

    // Регистрация на активность
    const registerOnEvent = async (event) => {
        const checkTargetId = event.target.id
        const checkData = {
            "event": checkTargetId

        }
        const url = `/api/events/registration/`;
        const data = await postData(url, checkData);
        dataEvents(statusEvent)
    }


    async function loadData(url) {
        return axios({ url: `${startUrlApi}${url}`, method: 'get', headers: getHeaders() }).then(req => req.data);
    }

    async function postData(url, dataJson) {
        return axios({ url: `${startUrlApi}${url}`, method: 'post', headers: getHeaders(), data: dataJson }).then(req => req.data);
    }


    const dataEvents = async (status = null) => {
        const url = status ? `/api/events/all/?status=${status}` : `/api/events/all/`;
        const data = await loadData(url);
        setEventsDataList(data);
    }

    useEffect(() => {
        console.log('Будут загружены данные');
        dataEvents(statusEvent);
    }, [statusEvent,])

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4" size="lg">
                        <CCardBody>
                            <CForm>
                                <div className="mb-3"
                                    style={
                                        {
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }
                                    }>
                                    <CIcon icon={cilSearch}
                                        style={
                                            {
                                                width: '25px',
                                                height: '25px',
                                                marginRight: '15px'
                                            }
                                        } />
                                    <CFormInput type="text" id="" placeholder="Начните вводить текст"
                                        value={inputSearch}
                                        onChange={
                                            (e) => setInputSearch(e.target.value)
                                        } />
                                </div>

                                <div style={
                                    {
                                        display: 'flex',
                                        justifyContent: 'end',
                                        alignItems: 'center',
                                        marginTop: '10px'
                                    }
                                }>
                                    <CButton className='btn btn-primary btn-sm'
                                        onClick={handleButtonCreateEvent}>+ Добавить событие</CButton>
                                </div>

                            </CForm>
                            {/* Табы */}
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className={
                                        statusEvent == "new" ? "nav-link active" : "nav-link"
                                    }
                                        id="new"
                                        data-coreui-toggle="tab"
                                        data-coreui-target="#nav-new"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-home"
                                        aria-selected="true"
                                        onClick={
                                            (e) => handleTab(e)
                                        }>Планируются</button>
                                    <button className={
                                        statusEvent == "in_progress" ? "nav-link active" : "nav-link"
                                    }
                                        id="in_progress"
                                        data-coreui-toggle="tab"
                                        data-coreui-target="#nav-in-progress"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-profile"
                                        aria-selected="false"
                                        onClick={
                                            (e) => handleTab(e)
                                        }>Проходят</button>
                                    <button className={
                                        statusEvent == "completed" ? "nav-link active" : "nav-link"
                                    }
                                        id="completed"
                                        data-coreui-toggle="tab"
                                        data-coreui-target="#nav-close"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-contact"
                                        aria-selected="false"
                                        onClick={
                                            (e) => handleTab(e)
                                        }>Завершены</button>
                                    <button className={
                                        statusEvent == "cancelled" ? "nav-link active" : "nav-link"
                                    }
                                        id="cancelled"
                                        data-coreui-toggle="tab"
                                        data-coreui-target="#nav-close"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-contact"
                                        aria-selected="false"
                                        onClick={
                                            (e) => handleTab(e)
                                        }>Отменены</button>
                                </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="new" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0"></div>
                                <div class="tab-pane fade" id="in_progress" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"></div>
                                <div class="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"></div>
                                <div class="tab-pane fade" id="cancelled" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"></div>
                            </div>
                            {/* Вывод карточек событий */}
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap' }}>
                                {eventsDataList.map((item) => <EventCard item={item} checkEventFunc={registerOnEvent} statusEvent={statusEvent} />)}
                            </div>

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Модальная форма */}
            <CModal size="lg" scrollable
                visible={modalEventVisible}
                onClose={
                    () => setModalEventVisible(false)
                }></CModal>
        </>

    )
}

export default Events
