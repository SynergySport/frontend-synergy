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

import { CharityCard } from './CharityCard/CharityCard';

import './charity.css'




// сервис для работы с API
const serviceApiPromise = (method = 'get', full_url = '', data = {}, headers = {}) => {
    return axios({ method: method, url: full_url, headers: headers, data: data }).then(res => res).catch(err => console.log(err))
}



const Charity = (props) => { // настройки приложения
    const { startUrlApi, userData, getHeaders } = useContext(AppContext);
    const [modalEventVisible, setModalEventVisible] = useState(false);

    // описание триггеров для бизнес логики
    const [inputSearch, setInputSearch] = useState('');
    // статус события
    const [statusCharity, setStatusCharity] = useState('in-process');

    // Event data list
    const [charityDataList, setCharityDataList] = useState([{
        company: [],
        company_detail: [],
        foundation_detail: {
            name: ''
        }
    }]);


    // динамический поиск
    const handleInputSeacrh = (event) => {
        setInputSearch(event.target.value);
    }

    const handleTab = (event) => {
        console.log(event.target.id);
        setStatusCharity(event.target.id);
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

    const addCharityInFavorite = async (event) => {
        const checkTargetId = event.target.id
        const checkData = {
            "charity": checkTargetId

        }
        const url = `/api/charity/check/`;
        const data = await postData(url, checkData);
        dataCharity(statusCharity);
    }




    async function loadData(url) {
        return axios({ url: `${startUrlApi}${url}`, method: 'get', headers: getHeaders() }).then(req => req.data);
    }

    async function postData(url, dataJson) {
        return axios({ url: `${startUrlApi}${url}`, method: 'post', headers: getHeaders(), data: dataJson }).then(req => req.data);
    }


    const dataCharity = async (status = null) => {
        const url = status ? `/api/charity/all/?status=${status}` : `/api/charity/all/`;
        const data = await loadData(url);
        setCharityDataList(data);
    }

    useEffect(() => {
        console.log('Будут загружены данные');
        dataCharity(statusCharity);
    }, [statusCharity,])

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
                                        onClick={handleButtonCreateEvent}>+ Предложить новую</CButton>
                                </div>

                            </CForm>
                            {/* Табы */}
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className={
                                        statusCharity == "in-process" ? "nav-link active" : "nav-link"
                                    }
                                        id="in-process"
                                        data-coreui-toggle="tab"
                                        data-coreui-target="#nav-activity-in-process"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-home"
                                        aria-selected="true"
                                        onClick={
                                            (e) => handleTab(e)
                                        }>В процессе</button>
                                    <button className={
                                        statusCharity == "completed" ? "nav-link active" : "nav-link"
                                    }
                                        id="completed"
                                        data-coreui-toggle="tab"
                                        data-coreui-target="#nav-activity-completed"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-profile"
                                        aria-selected="false"
                                        onClick={
                                            (e) => handleTab(e)
                                        }>Завершены</button>

                                </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="in-process" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0"></div>
                                <div class="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"></div>
                            </div>
                            {/* Карточки с данными */}
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
                                {charityDataList.map((item) =>
                                    <div>
                                        <CharityCard key={item.id} item={item} checkCharityFunc={addCharityInFavorite} />

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

export default Charity
