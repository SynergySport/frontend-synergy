import React from "react";

import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CCollapse,
    CButton,
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem
} from '@coreui/react';

import "./index.css";

export const ProfileContext = ({
    avatar,
    fullName,
    position,
    organization,
    department,
    email,
    phone,
    telegram
}) => {
    return (
        <div className="profile">
            <img src={avatar}
                className="user-avatar_profile" />
            <div className="user-information">
                <p className="user_full-name">
                    {fullName}</p>
                <p className="user_position">
                    {position}</p>
                <p className="user_organization">
                    {organization}</p>
                <p className="user_organization">
                    {department}</p>
            </div>
            <div className="user-contacts">
                <h6>Контакты:</h6>
                <a className="user_email">
                    {email}</a>
                <p className="user_phone">
                    {phone}</p>
                <p className="user_telegram">
                    {telegram}</p>
            </div>
        </div>
    );
};
