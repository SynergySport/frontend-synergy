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
import { getFormatDate } from '../../../utils/datetime.js';
import { getFormatRuForNum } from '../../../utils/numformat.js';


export const EventCard = ({ item, postDataFunc, checkEventFunc, statusEvent }) => {


    return (
        <CCard className='card_activity' style={{ width: '30rem', height: '600px', marginTop: '10px' }}>
            <div style={{ height: "250px" }}>
                <CCardImage orientation="top" src={item.cover} style={{ height: '250px', objectFit: 'cover' }} placeholder={item.first_name} />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', position: 'relative', bottom: "55px", right: "15px" }}>
                    {(item.registration_is_completed == true || item.status != 'new') ?
                        <CBadge color="success" shape="rounded-pill" style={{ padding: '10px 20px', fontSize: '15px' }}>Завершена</CBadge> :
                        <CBadge color="info" shape="rounded-pill" style={{ padding: '10px 20px', fontSize: '15px' }}>Регистрация</CBadge>
                    }
                </div>
            </div>
            <CCardBody>
                <CCardTitle style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>{item.title}</div>
                </CCardTitle>
                <CCardTitle style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <span className='title-small-info '>Баллы: {item.cost_units}</span>
                    <span className='title-small-info '>{getFormatDate(item.start_date)}</span>
                </CCardTitle>


                <CCardText className='description-activity' style={{ height: '80px', overflowX: 'hidden', overflowY: 'auto' }}>
                    {item.description}
                </CCardText>
            </CCardBody>
            <CListGroup flush>
                <CListGroupItem style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className='title-small-info '>Единица измерения: событие</span>

                    <span className='title-small-info ' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>Участники {item.users_data.length} / {item.number_participants}</div>
                        <div>Ограничено количество: {item.limited_quantity ? `да` : `нет`}</div>
                    </span>
                </CListGroupItem>
                <CListGroupItem style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center'
                }}>


                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', flexWrap: 'wrap' }}>
                        {item.users_data.map((user) => <div>
                            <CAvatar src={user.avatar} status="success" />
                        </div>
                        )}
                    </div>


                    <div class="form-check form-switch" style={{ display: 'flex', gap: '10px' }}>
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id={item.id}
                            name="is_active"
                            checked={item.is_my_event}
                            onChange={checkEventFunc}
                            disabled={statusEvent == 'new' ? false : true}
                        />

                    </div>
                </CListGroupItem>

            </CListGroup>
            {/* <CCardBody>
                <CCardLink href="#">Добавить в избранное</CCardLink>
            </CCardBody> */}
        </CCard >
    );
}
