import React,{ useState, Fragment } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {

    const [active, setActive] = useState('');

    let { user } = useSelector(state => state.auth);

    let permissions = [];
    user.roles[0].permissions.forEach(permission => {
        permissions.push(permission.name);
    });

    const sidebarToggle = () => {
        active === '' ? setActive('active') : setActive('');
        active === '' ? document.body.classList.add('sidebar-folded') : document.body.classList.remove('sidebar-folded'); 
    }

    const location = useLocation();

    return (
        <Fragment>
            <nav className="sidebar">
                <div className="sidebar-header">
                    <div className={`${active === "active" ? 'sidebar-toggler active' : 'sidebar-toggler not-active'}`} onClick={sidebarToggle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="sidebar-body">
                    <ul className="nav">
                        <li className="nav-item nav-category">Main</li>
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${location.pathname === '/' && 'active'}`}> 
                                <i className="bi bi-border-style"></i>
                                <span className="link-title">Dashboard</span> 
                            </Link>
                        </li>
                        <li className="nav-item nav-category">Master Data</li>
                        {permissions && permissions.includes(`view departement`) && <li className="nav-item">
                            <Link to="/departement" className={`nav-link ${location.pathname.includes('/departement') && 'active'}`}> 
                                <i className="bi bi-briefcase"></i>
                                <span className="link-title">Departement</span> 
                            </Link> 
                        </li>}
                        {permissions && permissions.includes(`view jabatan`) && <li className="nav-item">
                            <Link to="/jabatan" className={`nav-link ${location.pathname.includes('/jabatan') && 'active'}`}> 
                                <i className="bi bi-stickies-fill"></i>
                                <span className="link-title">Jabatan</span> 
                            </Link> 
                        </li>}
                        {permissions && permissions.includes(`view bagian`) && <li className="nav-item">
                            <Link to="/bagian" className={`nav-link ${location.pathname.includes('/bagian') && 'active'}`}> 
                                <i className="bi bi-ticket-detailed-fill"></i>
                                <span className="link-title">Bagian</span> 
                            </Link> 
                        </li>}
                        {permissions && permissions.includes(`view karyawan`) && <li className="nav-item">
                            <Link to="/karyawan" className={`nav-link ${location.pathname.includes('/karyawan') && 'active'}`}> 
                                <i className="bi bi-people-fill"></i>
                                <span className="link-title">Karyawan</span> 
                            </Link> 
                        </li>}
                        <li className="nav-item nav-category">Transaksi</li>
                        {permissions && permissions.includes(`view departement`) && <li className="nav-item">
                            <Link to="/absensi" className={`nav-link ${location.pathname.includes('/absensi') && 'active'}`}> 
                                <i className="bi bi-people-fill"></i>
                                <span className="link-title">Data Absensi Karyawan</span> 
                            </Link> 
                        </li>}
                        <li className="nav-item nav-category">Setting</li>
                        {permissions && (permissions.includes(`view salary`) || permissions.includes(`view email`)) ?
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="collapse" href="#general-setting" role="button" aria-expanded="false" aria-controls="general-setting">
                                <i className="bi bi-dash-circle-fill"></i>
                                <span className="link-title">Pengaturan Umum </span>
                                <i className="ms-2 bi bi-caret-down-fill"></i>
                            </a>
                            <div className="collapse" id="general-setting">
                            <ul className="nav sub-menu" style={{padding: '0 0 15px 74px' }}>
                                {permissions && permissions.includes(`view salary`) && <li className="nav-item">
                                    <Link to="/salary" className={`nav-link ${location.pathname.includes('/salary') && 'active'}`}> 
                                        Gaji dan Potongan
                                    </Link> 
                                </li>}
                            </ul>
                            </div>
                        </li> : <li></li>
                        }
                        {permissions && (permissions.includes(`view user`) || permissions.includes(`view role`)) ?
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="collapse" href="#access" role="button" aria-expanded="false" aria-controls="access">
                                <i className="bi bi-dash-circle-fill"></i>
                                <span className="link-title">User & Hak Akses </span>
                                <i className="ms-2 bi bi-caret-down-fill"></i>
                            </a>
                            <div className="collapse" id="access">
                            <ul className="nav sub-menu" style={{padding: '0 0 15px 74px' }}>
                                {permissions && permissions.includes(`view user`) && <li className="nav-item">
                                    <Link to="/user" className={`nav-link ${location.pathname.includes('/user') && 'active'}`}> 
                                        User
                                    </Link> 
                                </li>}
                                {permissions && permissions.includes(`view role`) && <li className="nav-item">
                                    <Link to="/role" className={`nav-link ${location.pathname.includes('/role') && 'active'}`}> 
                                        Hak Akses
                                    </Link> 
                                </li>}
                            </ul>
                            </div>
                        </li> : <li></li>
                        }
                        
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}

export default Sidebar