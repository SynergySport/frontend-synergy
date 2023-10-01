import React, { useState } from "react";

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

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./index.css";

export const ProfileTabs = ({
    is_private,
    position,
    organization,
    department,
    city,
    birthday,
    aboutMe,
    birthdate,
    salary,
    experience,
    visible,
    setVisible
}) => {
    return (

        <div>
            <CButton href="#"
                onClick={
                    (event) => {
                        event.preventDefault()
                        setVisible(!visible)
                    }
                }>
                Показать информацию обо мне
            </CButton>

            {/* <CButton onClick={
                () => setVisible(!visible)
            }>Button</CButton> */}
            <CCollapse visible={visible}>
                <CCard className="mt-3">
                    <CCardBody>
                        <Tabs>
                            <TabList>
                                <Tab>Публичные сведения</Tab>
                                {
                                    !is_private ? <Tab>Приватная информация</Tab> : ''
                                } </TabList>

                            <TabPanel>
                                <table className="tabs_data">
                                    <tr>
                                        <td>Должность</td>
                                        <td>{position}</td>
                                    </tr>
                                    <tr>
                                        <td>Организация</td>
                                        <td>{organization}</td>
                                    </tr>
                                    <tr>
                                        <td>Организация</td>
                                        <td>{department}</td>
                                    </tr>
                                    <tr>
                                        <td>День рождения</td>
                                        <td>{birthday}</td>
                                    </tr>
                                    <tr>
                                        <td>Обо мне</td>
                                        <td className="td-about">
                                            {aboutMe}</td>
                                    </tr>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <table className="tabs_data">
                                    <tr>
                                        <td>Дата рождения</td>
                                        <td>{birthdate}</td>
                                    </tr>
                                    <tr>
                                        <td>Оклад</td>
                                        <td>{salary}</td>
                                    </tr>
                                    <tr>
                                        <td>Стаж, лет</td>
                                        <td>{experience}</td>
                                    </tr>
                                </table>
                            </TabPanel>
                        </Tabs>
                    </CCardBody>
                </CCard>
            </CCollapse>

        </div>

    );
};
