import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useContext } from 'react'
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
    CInputGroupText,
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
    cilAvTimer,

} from '@coreui/icons'

import { AppContext } from "../../App";

import axios from 'axios';


// import { every } from 'core-js/core/array'


// сервис для работы с API
const serviceApiPromise = (method = 'get', full_url = '', data = {}, headers = {}) => {
    return axios({
        method: method,
        url: full_url,
        headers: headers,
        data: data
    }).then(res => res).catch(err => console.log(err))
}



const Events = (props) => {

    // настройки приложения
    const { startUrlApi, userData, getHeaders } = useContext(AppContext);
    // модальне формы
    const [modalEventVisible, setModalEventVisible] = useState(false);

    // описание триггеров для бизнес логики
    const [inputSearch, setInputSearch] = useState('');


    // динамический поиск
    const handleInputSeacrh = (event) => {
        setInputSearch(event.target.value);
    }

    // Создание события 
    const handleButtonCreateEvent = (event) => {
        alert('Будет создано новое событи');
    }

    // Модальная форма 
    const handleModalFormEventDetail = (event) => {
        alert(`Будет показана форма с описанием события ${event.target.id}`);
    }

    useEffect(
        () => {
            // loadData();
        }, []
    )

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4" size="lg">

                        <CCardBody>
                            <CForm>
                                <div className="mb-3" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <CIcon icon={cilSearch} style={{ width: '25px', height: '25px', marginRight: '15px' }} />
                                    <CFormInput
                                        type="text"
                                        id=""
                                        placeholder="Начните вводить текст"
                                        value={inputSearch}
                                        onChange={(e) => setInputSearch(e.target.value)}
                                    />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '10px' }}>
                                    <CButton className='btn btn-secondary btn-sm' onClick={handleButtonCreateEvent}>+ Добавить событие</CButton>
                                </div>

                            </CForm>
                            {/* Табы */}
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button class="nav-link active" id="new" data-coreui-toggle="tab" data-coreui-target="#nav-new"
                                        type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={(e) => handleTab(e)}>Планируются</button>
                                    <button class="nav-link" id="in_progress" data-coreui-toggle="tab" data-coreui-target="#nav-in-progress"
                                        type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={(e) => handleTab(e)}>Проходят</button>
                                    <button class="nav-link" id="close" data-coreui-toggle="tab" data-coreui-target="#nav-close"
                                        type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={(e) => handleTab(e)}>Завершены</button>
                                    <button class="nav-link" id="close" data-coreui-toggle="tab" data-coreui-target="#nav-close"
                                        type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={(e) => handleTab(e)}>Отменены</button>
                                </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="new" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                </div>
                                <div class="tab-pane fade" id="in_progress" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"></div>
                                <div class="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"></div>
                                <div class="tab-pane fade" id="canceled" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"></div>
                            </div>
                            {/* Таблица с данными */}
                            <CTable align="middle" className="mb-0 border" hover responsive style={{ marginTop: "15px" }}>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell className="text-center">
                                            <CIcon icon={cilCheck} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">
                                            <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Наименование</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Описание</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Дата начала</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Дата окончания</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Количество единиц</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Участников</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Создана</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {[].map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index} id={item.id}>
                                            <CTableDataCell className="text-center" id={item.id}>
                                                {/* <CFormCheck id="flexCheckChecked" label="" /> */}
                                                <CBadge color="success">{`${item.status_name}`}</CBadge>
                                                <CBadge color="info">#{`${item.id}`}</CBadge>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center" id={item.id}>
                                                <b>Обложка</b>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>Тут заголовок</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>Дата начала</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>Дата окончания</div>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CBadge color="primary" shape="rounded-pill">Статус</CBadge>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>Баллы за участия</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>Участников</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>Создана</div>
                                            </CTableDataCell>

                                            <CTableDataCell id={item.id} className="text-center" style={{ width: '200px' }}>
                                                <CButton id={item.id} color="secondary" variant="outline" className='add-margin'
                                                    onClick={(e) => handleModalFormEventDetail(e)}
                                                >
                                                    <CIcon id={item.id} icon={cilSpreadsheet} />
                                                </CButton>
                                                <CButton id={item.id} color="secondary" variant="outline" className='add-margin' onClick={(e) => alert(e.target.id)}>
                                                    <CIcon id={item.id} icon={cilCheckCircle} />
                                                </CButton>
                                                <CButton id={item.id} color="secondary" variant="outline" onClick={(e) => alert(e.target.id)}>
                                                    <CIcon id={item.id} icon={cilTrash} />
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Модальная форма */}
            <CModal size="lg" scrollable visible={modalEventVisible} onClose={() => setModalEventVisible(false)}>

            </CModal>
        </>

    )
}

export default Events
