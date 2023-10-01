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

import { EventCard } from '../events/EventCard/EventCard';

import avatarImg from "../../assets/images/avatars/avatar_static.png";




const Profile = () => {
    const { startUrlApi, userData, getHeaders } = useContext(AppContext);

    // Данные из профиля пользователя
    const [dataProfile, setDataProfile] = useState(userData)
    const [myActivityStatList, setmyActivityStatList] = useState([
        {
            results: []
        }
    ]
    )
    const [eventsDataList, setEventsDataList] = useState([{
        users_data: []
    }]);
    const [statusEvent, setStatusEvent] = useState('new');

    const [visible, setVisible] = useState(false)

    // Загружаем данные по пользователю
    const loadData = () => {
        let url = `${startUrlApi}/api/myprofile/`;
        axios.get(url, { headers: getHeaders() }).then(response => {
            setDataProfile(response.data[0])
        })
    }

    // Загружаем данные аналитики
    async function loadDataService(url) {
        return axios({ url: `${startUrlApi}${url}`, method: 'get', headers: getHeaders() }).then(req => req.data);
    }

    async function postData(url, dataJson) {
        return axios({ url: `${startUrlApi}${url}`, method: 'post', headers: getHeaders(), data: dataJson }).then(req => req.data);
    }

    //  # 1 Данные моей активности
    const dataMyActiviry = async (period = null) => {
        const url = period ? `/api/analytics/tracker/my/?period=${period}` : `/api/analytics/tracker/my/`;
        const data = await loadDataService(url);
        setmyActivityStatList(data);
    }
    const dataMyEvents = async (period = null) => {
        const url = period ? `/api/analytics/tracker/my/?period=${period}` : `/api/analytics/tracker/my/`;
        const data = await loadDataService(url);
        setmyActivityStatList(data);
    }

    // # 2 События
    const dataEvents = async (status = 'new') => {
        const url = status ? `/api/events/all/?status=${status}` : `/api/events/all/`;
        const data = await loadDataService(url);
        setEventsDataList(data);
    }

    // Регистрация на активность
    const registerOnEvent = async (event) => {
        const checkTargetId = event.target.id
        const checkData = {
            "event": checkTargetId

        }
        const url = `/api/events/registration/`;
        const data = await postData(url, checkData);
        dataEvents(statusEvent)
    }




    useEffect(() => {
        setDataProfile(userData);
        dataMyActiviry(7);
        dataEvents('new')
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
                                <CAccordionHeader>Мои активность за неделю</CAccordionHeader>
                                <CAccordionBody>
                                    {
                                        myActivityStatList.map((item) =>
                                            <PersonalDashboard myActivityStat={item} />
                                        )
                                    }

                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={2}>
                                <CAccordionHeader>Ближайшие события с для регистрации</CAccordionHeader>
                                <CAccordionBody>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap' }}>
                                        {eventsDataList.map((item) => <EventCard item={item} checkEventFunc={registerOnEvent} statusEvent={statusEvent} />)}
                                    </div>
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
