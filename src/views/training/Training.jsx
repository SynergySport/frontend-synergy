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
import { PersonalDashboard } from "./PersonalDashboards";

// import { every } from 'core-js/core/array'


// сервис для работы с API
const serviceApiPromise = (method = 'get', full_url = '', data = {}, headers = {}) => {
    return axios({ method: method, url: full_url, headers: headers, data: data }).then(res => res).catch(err => console.log(err))
}



const Training = (props) => { // настройки приложения
    const { startUrlApi, userData, getHeaders } = useContext(AppContext);

    // Данные из профиля пользователя
    const [dataProfile, setDataProfile] = useState(userData)
    const [myActivityStatList, setmyActivityStatList] = useState([
        {
            results: []
        }
    ]
    )

    // Загружаем данные аналитики
    async function loadDataService(url) {
        return axios({ url: `${startUrlApi}${url}`, method: 'get', headers: getHeaders() }).then(req => req.data);
    }

    async function postData(url, dataJson) {
        return axios({ url: `${startUrlApi}${url}`, method: 'post', headers: getHeaders(), data: dataJson }).then(req => req.data);
    }

    //  # 1 Данные моей активности
    const dataMyActiviry = async (period = null) => {
        const url = period ? `/api/analytics/tracker/my/?period=${period}` : `/api/analytics/tracker/my/`;
        const data = await loadDataService(url);
        setmyActivityStatList(data);
    }
    const dataMyEvents = async (period = null) => {
        const url = period ? `/api/analytics/tracker/my/?period=${period}` : `/api/analytics/tracker/my/`;
        const data = await loadDataService(url);
        setmyActivityStatList(data);
    }

    // # 2 События
    const dataEvents = async (status = 'new') => {
        const url = status ? `/api/events/all/?status=${status}` : `/api/events/all/`;
        const data = await loadDataService(url);
        setEventsDataList(data);
    }





    useEffect(() => {
        setDataProfile(userData);
        dataMyActiviry(7);
        // dataEvents('new')
        // loadData();

    }, [])

    return (
        <div className="content_container">
            <CCard className="mb-4">

                <CCardBody>
                    <CRow className='margin-top'>Выберите период детализации:
                    </CRow>
                    <CRow className='margin-top'>

                        {
                            myActivityStatList.map((item) =>
                                <PersonalDashboard myActivityStat={item} />
                            )
                        }
                    </CRow>
                </CCardBody>
            </CCard>
        </div>
    )
}

export default Training
