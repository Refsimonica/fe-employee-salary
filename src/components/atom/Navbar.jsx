import React from 'react'
import {Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

const navStyle = {
    "--bs-breadcrumb-divider": ">",
    fontSize: '1rem',
    marginLeft: 0, 
    marginTop: '1.2%'
}
const Navbar = () => {

    let { user } = useSelector(state => state.auth);
    const location = useLocation();
    
    let url = location.pathname.split("/");
    if (url[1]) {
        document.title = url[1].toUpperCase();
    } else {
        document.title = 'Dashboard'.toUpperCase();
    }

    return (
        <nav className="navbar">
            <div className="sidebar-toggler">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="navbar-content">

                <ol className="breadcrumb" style={navStyle} >
                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link> {url[1] && <i className="bi bi-chevron-double-right"></i>}</li>
                    <li className="breadcrumb-item" aria-current="page"><Link to={`/${url[1]}`}>{url[1]}</Link> {url[2] && <i className="bi bi-chevron-double-right"></i>}</li>
                    <li className="breadcrumb-item" aria-current="page"><Link to={`/${url[2]}`}>{url[2]}</Link> {url[3] && <i className="bi bi-chevron-double-right"></i>}</li>
                </ol>
                
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="profile" />
                        </Link>
                        <div className="dropdown-menu p-0" aria-labelledby="profileDropdown">
                            <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
                                <div className="mb-3">
                                    <img className="wd-80 ht-80 rounded-circle" src="https://via.placeholder.com/80x80" alt="" />
                                </div>
                                <div className="text-center">
                                    <p className="tx-16 fw-bolder">{user.name}</p>
                                    <p className="tx-12 text-muted">{user.email}</p>
                                </div>
                            </div>
                            <ul className="list-unstyled p-1">
                                <li className="dropdown-item py-2">
                                    <Link to="/" className="text-body ms-0">
                                    <i className="me-2 icon-md" data-feather="user"></i>
                                    <span>Profile</span>
                                    </Link>
                                </li>
                                <li className="dropdown-item py-2">
                                    <Link to="/" className="text-body ms-0">
                                    <i className="me-2 icon-md" data-feather="edit"></i>
                                    <span>Edit Profile</span>
                                    </Link>
                                </li>
                                <li className="dropdown-item py-2">
                                    <Link to="/" className="text-body ms-0">
                                    <i className="me-2 icon-md" data-feather="repeat"></i>
                                    <span>Switch User</span>
                                    </Link>
                                </li>
                                <li className="dropdown-item py-2">
                                    <Link to="/logout" className="text-body ms-0">
                                        <i className="me-2 icon-md" data-feather="log-out"></i>
                                        <span>Log Out</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar