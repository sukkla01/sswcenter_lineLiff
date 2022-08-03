import React from 'react'

const NavHeader = () => {
    return (
        <nav className="navbar navbar-expand-md fixed-top navbar-dark " style={{ backgroundColor: '#0f55a3' }}>
            <div className='text-center' >
                <img src='../images/logo.png' width={30} height={30} style={{ marginRight: 10, marginLeft: 10 }} />
                <a className="navbar-brand" href="#">รพ.ศรีสังวรสุโขทัย</a>
            </div>
        </nav>
    )
}

export default NavHeader