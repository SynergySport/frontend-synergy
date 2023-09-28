import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useContext } from 'react'

import { AppContext } from "../../App";

import axios from 'axios';
import { eventListeners } from '@popperjs/core'

import {
    CButton,
    CCard,
    CCardBody,
    CCardImage,
    CCardHeader,
    CCardTitle,
    CCardText,
    CListGroup,
    CListGroupItem,
    CCardLink,
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

// import { every } from 'core-js/core/array'

import { ActivityCard } from './ActivityCard/ActivityCard';

import './activity.css'




// сервис для работы с API
const serviceApiPromise = (method = 'get', full_url = '', data = {}, headers = {}) => {
    return axios({ method: method, url: full_url, headers: headers, data: data }).then(res => res).catch(err => console.log(err))
}



const Activity = (props) => { // настройки приложения
    const { startUrlApi, userData, getHeaders } = useContext(AppContext);
    const [modalEventVisible, setModalEventVisible] = useState(false);

    // описание триггеров для бизнес логики
    const [inputSearch, setInputSearch] = useState('');
    // статус события
    const [statusActivity, setStatusActivity] = useState('favorite');

    // Event data list
    const [activityDataList, setActivityDataList] = useState([{
        user: [],
        user_data: []
    }]);


    // динамический поиск
    const handleInputSeacrh = (event) => {
        setInputSearch(event.target.value);
        console.log(event.target.value);
    }

    const handleTab = (event) => {
        console.log(event.target.id);
        setStatusActivity(event.target.id);
    };

    // Создание события
    const handleButtonCreateEvent = (event) => {
        alert('Будет создано новое событи');
    }

    // Чек на карточке
    const handleCheckFavoriteActivity = async (event) => {
        console.log('чек сработал')
        const checkTargetId = event.target.id
        const checkData = {
            "activity": checkTargetId
        }
        const url = `/api/activity/check/`;
        const data = await postData(url, checkData);
        dataActivity(statusActivity)
    }


    // Модальная форма
    const handleModalFormEventDetail = (event) => {
        alert(`Будет показана форма с описанием события ${event.target.id
            }`);
    }

    async function loadData(url) {
        return axios({ url: `${startUrlApi}${url}`, method: 'get', headers: getHeaders() }).then(req => req.data);
    }

    async function postData(url, dataJson) {
        return axios({ url: `${startUrlApi}${url}`, method: 'post', headers: getHeaders(), data: dataJson }).then(req => req.data);
    }


    const dataActivity = async (status = null) => {
        const searchTxt = inputSearch ? `&search=${inputSearch}` : ``;
        const url = status ? `/api/activity/list/?status=${status}${searchTxt}` : `/api/activity/list/?status=${statusActivity}${searchTxt}`;
        const data = await loadData(url);
        setActivityDataList(data);
    }

    useEffect(() => {
        console.log('Будут загружены данные');
        dataActivity(statusActivity);
    }, [statusActivity, inputSearch])

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
                                            (e) => handleInputSeacrh(e)
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
                                        onClick={handleButtonCreateEvent}>+ Добавить новую</CButton>
                                </div>

                            </CForm>
                            {/* Табы */}
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className={
                                        statusActivity == "favorite" ? "nav-link active" : "nav-link"
                                    }
                                        id="favorite"
                                        data-coreui-toggle="tab"
                                        data-coreui-target="#nav-activity-favorite"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-home"
                                        aria-selected="true"
                                        onClick={
                                            (e) => handleTab(e)
                                        }>Избранное</button>
                                    <button className={
                                        statusActivity == "all" ? "nav-link active" : "nav-link"
                                    }
                                        id="all"
                                        data-coreui-toggle="tab"
                                        data-coreui-target="#nav-activity-all"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-profile"
                                        aria-selected="false"
                                        onClick={
                                            (e) => handleTab(e)
                                        }>Доступные</button>

                                </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="favorite" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0"></div>
                                <div class="tab-pane fade" id="all" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"></div>
                            </div>
                            {/* Карточки с данными */}
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap' }}>
                                {activityDataList.map((item) =>
                                    <div>
                                        <ActivityCard item={item} postDataFunc={postData} checkActivityFunc={handleCheckFavoriteActivity} />
                                    </div>
                                )
                                }
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

export default Activity
