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


export const ActivityCard = ({ item, postDataFunc, checkActivityFunc }) => {


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
                <CListGroupItem style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <span className='title-small-info '> Учавствую: </span>
                    <div class="form-check form-switch" style={{ display: 'flex', gap: '10px' }}>
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id={item.id}
                            name="is_active"
                            checked={item.is_my_favorite}
                            onChange={checkActivityFunc}
                        />
                    </div>
                </CListGroupItem>
                <CListGroupItem>
                    <span className='title-small-info'>Участники: {item.user_data.length}</span>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', flexWrap: 'wrap' }}>
                        {item.user_data.slice(0, 5).map((user) => <div>
                            <CAvatar src={user.avatar} status="success" />
                            {/* {user.first_name} */}
                        </div>)}
                        {item.user_data.length > 5 ? `+ ` + (item.user_data.length - item.user_data.slice(0, 5).length) : ''}
                    </div>
                </CListGroupItem>

            </CListGroup>
            {/* <CCardBody>
                <CCardLink href="#">Добавить в избранное</CCardLink>
            </CCardBody> */}
        </CCard >
    );
}
