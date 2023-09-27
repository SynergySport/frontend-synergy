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

// import { every } from 'core-js/core/array'


// сервис для работы с API
const serviceApiPromise = (method = 'get', full_url = '', data = {}, headers = {}) => {
    return axios({ method: method, url: full_url, headers: headers, data: data }).then(res => res).catch(err => console.log(err))
}



const StaffList = (props) => { // настройки приложения
    const { startUrlApi, userData, getHeaders } = useContext(AppContext);

    return (
        <div>Сотрудники</div>
    )
}

export default StaffList
