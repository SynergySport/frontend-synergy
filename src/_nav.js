import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPeople,
  cilNoteAdd,
  cilViewStream,
  cilChart,
  cilList,
  cilContact,
  cilBraille,
  cilUser,
  cilFlagAlt,
  cilGraph,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Мои ресурсы',
  },
  {
    component: CNavItem,
    name: 'Мой профиль',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: CNavItem,
    name: 'События',
    to: '/events',
    icon: <CIcon icon={cilFlagAlt} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: CNavItem,
    name: 'Выбор активностей',
    to: '/activity',
    icon: <CIcon icon={cilBraille} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: CNavItem,
    name: 'Тренировки',
    to: '/tools/mergeflow',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Благотворительность',
    to: '/interviews',
    icon: <CIcon icon={cilFlagAlt} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: CNavItem,
    name: 'Рейтинг участников',
    to: '/interviews',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: CNavItem,
    name: 'Достижения компании',
    to: '/interviews',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: CNavTitle,
    name: 'Инструменты руководителя',
  },
  {
    component: CNavItem,
    name: 'Управленческий учет',
    to: '/events',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Сотрудники',
    to: '/events',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Аналитика',
    to: '/dashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
]

export default _nav
