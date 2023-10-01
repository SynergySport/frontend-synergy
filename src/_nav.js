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
  cilBank,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Мои ресурсы',
    role: {
      'employee': 'сотрудник',
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
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
    role: {
      'employee': 'сотрудник',
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
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
    role: {
      'employee': 'сотрудник',
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
  },
    {
    component: CNavItem,
    name: 'Тренировки',
    to: '/training',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    role: {
      'employee': 'сотрудник',
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
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
    role: {
      'employee': 'сотрудник',
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
  },

  {
    component: CNavItem,
    name: 'Благотворительность',
    to: '/charity',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
    role: {
      'employee': 'сотрудник',
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
  },
  {
    component: CNavItem,
    name: 'Рейтинг участников',
    to: '/rating',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
    role: {
      'employee': 'сотрудник',
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
  },
  {
    component: CNavItem,
    name: 'Достижения компании',
    to: '/progress',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    badge: {
      color: '',
      text: '',
    },
    role: {
      'employee': 'сотрудник',
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
  },
  {
    component: CNavTitle,
    name: 'Инструменты руководителя',
    role: {
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
  },
  {
    component: CNavItem,
    name: 'Управленческий учет',
    to: '/accounting',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
    role: {
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
  },
  {
    component: CNavItem,
    name: 'Сотрудники',
    to: '/staff',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    role: {
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
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
    role: {
      'manager': 'руководитель',
      'repr_found': 'представитель фонда',
    },
  },
]

export default _nav
