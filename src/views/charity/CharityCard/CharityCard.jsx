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

import './style.css'


export const CharityCard = ({ item }) => {
    return (
        <CCard key={item.id} className='card_activity' style={{ width: '30rem', height: '600px', marginTop: '10px' }}>
            <div>
                <CCardImage orientation="top" src={item.image} style={{ height: '250px', objectFit: 'cover' }} placeholder={item.title} />
            </div>

            <CCardBody>

                <CCardTitle>{item.title}</CCardTitle>
                <CCardText className='description-activity' style={{ height: '80px', overflowX: 'hidden', overflowY: 'auto' }}>
                    {item.description}
                </CCardText>
            </CCardBody>
            <CListGroup flush>
                <CListGroupItem style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className='title-small-info '>Сроки выполнения: с {item.start_date} до {item.end_date}</span>

                    <span className='title-small-info '>Требуется единиц: {item.units_required}</span>
                    <span className='title-small-info '>Выполнено: {`50%`}</span>
                </CListGroupItem>
                <CListGroupItem>
                    <span className='title-small-info'>Поддерживают компании: {item.company.length}</span>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', flexWrap: 'wrap' }}>
                        {item.company_detail.slice(0, 5).map((item) => <div>
                            <CAvatar key={item.id} src={item.logo} status="success" />
                            {item.name}
                        </div>)} + {item.company.length - item.company.slice(0, 5).length}
                    </div>
                </CListGroupItem>

            </CListGroup>
            {/* <CCardBody>
                <CCardLink href="#">Добавить в избранное</CCardLink>
            </CCardBody> */}
        </CCard >
    );
}
