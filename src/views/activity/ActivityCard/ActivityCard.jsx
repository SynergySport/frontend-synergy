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


export const ActivityCard = ({ item }) => {
    return (
        <CCard className='card_activity' style={{ width: '25rem', height: '600px', marginTop: '10px' }}>
            <CCardImage orientation="top" src={item.logo} style={{ height: '150px', width: '150px' }} />
            <CCardBody>
                <CCardTitle>{item.title}</CCardTitle>
                <CCardText style={{ height: '50px' }}>
                    {item.description}
                </CCardText>
            </CCardBody>
            <CListGroup flush>
                <CListGroupItem>Единица измерения: {item.unit}</CListGroupItem>
                <CListGroupItem>Стоимость в условных единицах: {item.cost_unit}</CListGroupItem>
                <CListGroupItem>Количество участников: {item.user.length}
                    {item.user_data.map((user) => <div>{user.first_name}</div>)}
                </CListGroupItem>
                <CListGroupItem>Участники: {item.user.length}
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', flexWrap: 'wrap' }}>
                        {item.user_data.map((user) => <div>
                            <CAvatar src={user.avatar} status="success" />
                            {/* {user.first_name} */}
                        </div>)}
                    </div>
                </CListGroupItem>
            </CListGroup>
            <CCardBody>
                <CCardLink href="#">Добавить в избранное</CCardLink>
                <CCardLink href="#">Мои коллеги</CCardLink>
            </CCardBody>
        </CCard>
    );
}
