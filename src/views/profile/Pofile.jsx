import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useContext } from 'react'
import { AppContext } from "../../App";

import classNames from 'classnames'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import axios from 'axios';

import { ProfileContext } from "./ProfileContext";
import { ProfileTabs } from "./ProfileTabs";

import { PersonalDashboard } from "./PersonalDashboards";

import avatarImg from "../../assets/images/avatars/avatar_static.png";


const Profile = () => {
    const { startUrlApi, userData, getHeaders } = useContext(AppContext);

    // Данные из профиля пользователя
    const [dataProfile, setDataProfile] = useState(userData)
    const [visible, setVisible] = useState(false)

    // Загружаем данные по пользователю
    const loadData = () => {
        let url = `${startUrlApi}/api/myprofile/`;
        axios.get(url, { headers: getHeaders() }).then(response => {
            setDataProfile(response.data[0])
        })
    }

    useEffect(() => {
        setDataProfile(userData);
        // loadData();

    }, [])

    return (
        <div className="content_container">
            <CCard className="mb-4">

                <CCardBody>
                    <ProfileContext avatar={
                        dataProfile.avatar ? dataProfile.avatar : avatarImg
                    }
                        fullName={
                            dataProfile.full_name
                        }
                        position={
                            dataProfile.employee_position
                        }
                        organization={
                            dataProfile.company
                        }
                        department={
                            dataProfile.department_str
                        }
                        email={
                            dataProfile.email
                        }
                        phone={
                            dataProfile.mobile_number
                        }
                        telegram={
                            dataProfile.telegram
                        } />
                    <ProfileTabs is_private={false}
                        position={
                            dataProfile.employee_position
                        }
                        organization={
                            dataProfile.company
                        }
                        department={
                            dataProfile.department_str
                        }
                        city={
                            dataProfile.city
                        }
                        birthday={
                            dataProfile.birthday
                        }
                        aboutMe={
                            dataProfile.about
                        }
                        birthdate={
                            dataProfile.birthday
                        }
                        salary={
                            dataProfile.salary
                        }
                        experience={
                            dataProfile.work_years
                        }
                        visible={visible}
                        setVisible={setVisible} />

                    <CRow className='margin-top'>
                        <CAccordion activeItemKey={1}>
                            <CAccordionItem itemKey={1}>
                                <CAccordionHeader>Мои результаты</CAccordionHeader>
                                <CAccordionBody>
                                    <PersonalDashboard />
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={2}>
                                <CAccordionHeader>Ближайшие события</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>This is the second item&#39;s accordion body.</strong>
                                    <code>.accordion-body</code>
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={3}>
                                <CAccordionHeader>Мой вклад в достижение целей
                                </CAccordionHeader>
                                <CAccordionBody>
                                    <strong>This is the second item&#39;s accordion body.</strong>
                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>
                    </CRow>
                </CCardBody>
            </CCard>
        </div>
    )
}

export default Profile
