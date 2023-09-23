import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CProgress
} from '@coreui/react'

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
    cilPeople,
    cilUser,
    cilUserFemale,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'


export const PersonalDashboard = () => {

    const progressGroupExample1 = [
        { title: '25.09.2023', value1: 34, value2: 78 },
        { title: '24.09.2023', value1: 56, value2: 94 },
        { title: '23.09.2023', value1: 12, value2: 67 },
        { title: '22.09.2023', value1: 43, value2: 91 },
        { title: '21.09.2023', value1: 22, value2: 73 },
        { title: '20.09.2023', value1: 53, value2: 82 },
        { title: '19.09.2023', value1: 9, value2: 69 },
    ]

    const progressGroupExample2 = [
        { title: 'Male', icon: cilUser, value: 53 },
        { title: 'Female', icon: cilUserFemale, value: 43 },
    ]

    const progressGroupExample3 = [
        { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
        { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
        { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
        { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
    ]

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: "15px" }}>
                {/* <CRow> */}
                <CCol xs={4} md={4} xl={4}>
                    <CRow>
                        <CCol sm={4}>
                            <div className="border-start border-start-4 border-start-info py-1 px-3">
                                <div className="text-medium-emphasis small">Активность</div>
                                <div className="fs-5 fw-semibold">Бег</div>
                            </div>
                        </CCol>
                        <CCol sm={4}>
                            <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                <div className="text-medium-emphasis small">Фактические результаты</div>
                                <div className="fs-5 fw-semibold">25 км.</div>
                            </div>
                        </CCol>
                        <CCol sm={4}>
                            <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                <div className="text-medium-emphasis small">Усл. единиц</div>
                                <div className="fs-5 fw-semibold">25</div>
                            </div>
                        </CCol>
                    </CRow>

                    <hr className="mt-0" />
                    {progressGroupExample1.map((item, index) => (
                        <div className="progress-group mb-4" key={index}>
                            <div className="progress-group-prepend">
                                <span className="text-medium-emphasis small">{item.title}</span>
                            </div>
                            <div className="progress-group-bars">
                                <CProgress thin color="info" value={item.value1} />
                                <CProgress thin color="danger" value={item.value2} />
                            </div>
                        </div>
                    ))}
                </CCol>
                <CCol xs={4} md={4} xl={4}>
                    <CRow>
                        <CCol sm={4}>
                            <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                <div className="text-medium-emphasis small">Pageviews</div>
                                <div className="fs-5 fw-semibold">78,623</div>
                            </div>
                        </CCol>
                        <CCol sm={4}>
                            <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                <div className="text-medium-emphasis small">Organic</div>
                                <div className="fs-5 fw-semibold">49,123</div>
                            </div>
                        </CCol>
                    </CRow>

                    <hr className="mt-0" />

                    {progressGroupExample2.map((item, index) => (
                        <div className="progress-group mb-4" key={index}>
                            <div className="progress-group-header">
                                <CIcon className="me-2" icon={item.icon} size="lg" />
                                <span>{item.title}</span>
                                <span className="ms-auto fw-semibold">{item.value}%</span>
                            </div>
                            <div className="progress-group-bars">
                                <CProgress thin color="warning" value={item.value} />
                            </div>
                        </div>
                    ))}

                    <div className="mb-5"></div>

                    {progressGroupExample3.map((item, index) => (
                        <div className="progress-group" key={index}>
                            <div className="progress-group-header">
                                <CIcon className="me-2" icon={item.icon} size="lg" />
                                <span>{item.title}</span>
                                <span className="ms-auto fw-semibold">
                                    {item.value}{' '}
                                    <span className="text-medium-emphasis small">({item.percent}%)</span>
                                </span>
                            </div>
                            <div className="progress-group-bars">
                                <CProgress thin color="success" value={item.percent} />
                            </div>
                        </div>
                    ))}
                </CCol>
                {/* </CRow> */}
            </div>

        </div>
    );
};