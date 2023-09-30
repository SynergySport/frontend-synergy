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
import { getFormatDate, getDate } from '../../../utils/datetime.js';
import { getFormatRuForNum } from '../../../utils/numformat.js';


export const CharityCard = ({ item, checkCharityFunc }) => {
    return (
        <CCard key={item.id} className='card_activity' style={{ width: '30rem', height: '700px', marginTop: '15px' }}>
            <div style={{ height: "250px" }}>
                <CCardImage orientation="top" src={item.image} style={{ height: '250px', objectFit: 'cover' }} placeholder={item.title} />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', position: 'relative', bottom: "55px", right: "15px" }}>
                    <CBadge color="info" shape="rounded-pill" style={{ padding: '10px 20px', fontSize: '15px' }}>{item.target_group_str}</CBadge> :
                </div>
            </div>

            <CCardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div >
                    <CCardTitle>{item.title}</CCardTitle>
                    <CCardTitle style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <span className='title-small-info '>Баллы: {Math.round(item.transaction_in_units)} / {item.units_required}</span>
                        <span className='title-small-info '>{getDate(item.start_date)} - {getDate(item.end_date)}</span>

                    </CCardTitle>

                    <div className="clearfix">
                        <div className="float-start" style={{ width: '150px' }}>
                            <strong>{item.percentage_completion}%</strong>
                        </div>
                        <div className="float-end">
                            <small className="text-medium-emphasis"></small>
                        </div>
                    </div>
                    <CProgress thin color='green' value={item.percentage_completion} />

                    <CCardText className='description-activity' style={{ height: '80px', overflowX: 'hidden', overflowY: 'auto', marginTop: "10px" }}>
                        {item.description}
                    </CCardText>
                </div>
                <div class="form-check form-switch" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id={item.id}
                        name="is_active"
                        checked={item.is_my_favorite}
                        onChange={checkCharityFunc}
                        disabled={item.is_finished}
                    />
                </div>


            </CCardBody>
            <CListGroup flush>
                <CListGroupItem style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className='title-small-info '>Наименование фонда: {item.foundation_detail.name}</span>
                    <span className='title-small-info '>Собрано в руб.: {getFormatRuForNum(item.transaction_current_sum)} / {getFormatRuForNum(item.required_sum_current)}</span>
                </CListGroupItem>
                <CListGroupItem>
                    <span className='title-small-info'>Поддерживают компании: {item.company.length}</span>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', flexWrap: 'wrap' }}>
                        {item.company_detail.slice(0, 5).map((item) => <div>
                            <CAvatar key={item.id} src={item.logo} status="success" />
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
