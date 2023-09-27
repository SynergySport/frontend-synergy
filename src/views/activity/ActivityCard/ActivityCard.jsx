import React, { useEffect, useState, createRef, useContext } from 'react';

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

import './ActivityCard.css'


export const ActivityCard = ({ item }) => {
    return (
        <CCard className='card_activity' style={{ width: '30rem', height: '600px', marginTop: '10px' }}>
            <div>
                <CCardImage orientation="top" src={item.logo} style={{ height: '250px', objectFit: 'cover' }} placeholder={item.first_name} />
            </div>

            <CCardBody>

                <CCardTitle>{item.title}</CCardTitle>
                <CCardText className='description-activity' style={{ height: '80px', overflowX: 'hidden', overflowY: 'auto' }}>
                    {item.description}
                </CCardText>
            </CCardBody>
            <CListGroup flush>
                <CListGroupItem style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className='title-small-info '>Единица измерения: {item.unit_txt}</span>
                    <span className='title-small-info '>Стоимость единицы: {item.cost_unit}</span>
                </CListGroupItem>
                <CListGroupItem>
                    <span className='title-small-info'>Участники: {item.user.length}</span>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', flexWrap: 'wrap' }}>
                        {item.user_data.slice(0, 5).map((user) => <div>
                            <CAvatar src={user.avatar} status="success" />
                            {/* {user.first_name} */}
                        </div>)} + {item.user.length - item.user_data.slice(0, 5).length}
                    </div>
                </CListGroupItem>

            </CListGroup>
            {/* <CCardBody>
                <CCardLink href="#">Добавить в избранное</CCardLink>
            </CCardBody> */}
        </CCard >
    );
}
