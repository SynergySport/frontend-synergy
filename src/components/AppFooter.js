import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          StaffHunt
        </a>
        <span className="ms-1">&copy; 2023 StaffHunt</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Разработано</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          FastCoder. Zhirnov Pavel
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
