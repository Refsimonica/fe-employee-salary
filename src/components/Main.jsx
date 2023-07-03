
import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Sidebar from './atom/Sidebar';
import Navbar from './atom/Navbar';
import Home from './pages/Home/Home';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { userProfile } from '../reduce/auth/actions';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import NotFoundPage from './pages/Error/NotFound';

import LoginPage from './pages/Auth/Login';
import LogoutPage from './pages/Auth/Logout';

import DepartementIndex from './pages/Departement/Index';
import DepartementForm from './pages/Departement/Form';

import JabatanIndex from './pages/Jabatan/Index';
import JabatanForm from './pages/Jabatan/Form';

import BagianIndex from './pages/Bagian/Index';
import BagianForm from './pages/Bagian/Form';

import KaryawanIndex from './pages/Karyawan/Index';
import KaryawanForm from './pages/Karyawan/Form';

import RoleIndex from './pages/Role/Index';
import RoleForm from './pages/Role/Form';

import UserIndex from './pages/User/Index';
import UserForm from './pages/User/Form';

import SalaryForm from './pages/Setting/FormSalary';

import AbsensiIndex from './pages/Absensi/Index';
import AbsensiForm from './pages/Absensi/Form';
import AbsensiDetail from './pages/Absensi/Detail';

Sentry.init({
    dsn: "https://c1f925dac68d4b52a9d1f7a12ca4fc7d@o4504925166698496.ingest.sentry.io/4504926475583488",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});

const Main = () => {

    let { user } = useSelector(state => state.auth);
    let dispatch = useDispatch();
    // const [message, setMessage] = useState('');

    // React.useEffect(() => {
	// 	let message = dispatch(userProfile());
    //     message.then(function (res) {
    //         setMessage(res)
    //     })
	// }, [dispatch]);

    let permissions = [];
    user && user.roles[0].permissions.forEach(permission => {
        permissions.push(permission.name);
    });

    const Logout = [
        { path: '/logout', element: <LogoutPage />, key: 1 }
    ]
    
    const Departement = [
        { path: '/departement', element: <DepartementIndex permission={permissions}/>, key: 1 }, 
        { path: '/departement/form', element: <DepartementForm permission={permissions}/>, key: 2 },
        { path: '/departement/form/:id', element: <DepartementForm permission={permissions}/>, key: 3 }
    ]
    
    const Jabatan = [
        { path: '/jabatan', element: <JabatanIndex permission={permissions}/>, key: 1 }, 
        { path: '/jabatan/form', element: <JabatanForm permission={permissions}/>, key: 2 },
        { path: '/jabatan/form/:id', element: <JabatanForm permission={permissions}/>, key: 3 }
    ]
    
    const Bagian = [
        { path: '/bagian', element: <BagianIndex permission={permissions}/>, key: 1 }, 
        { path: '/bagian/form', element: <BagianForm permission={permissions}/>, key: 2 },
        { path: '/bagian/form/:id', element: <BagianForm permission={permissions}/>, key: 3 }
    ]
    
    const Karyawan = [
        { path: '/karyawan', element: <KaryawanIndex permission={permissions}/>, key: 1 }, 
        { path: '/karyawan/form', element: <KaryawanForm permission={permissions}/>, key: 2 },
        { path: '/karyawan/form/:id', element: <KaryawanForm permission={permissions}/>, key: 3 }
    ]
    
    const Role = [
        { path: '/role', element: <RoleIndex permission={permissions}/>, key: 1 }, 
        { path: '/role/form', element: <RoleForm permission={permissions}/>, key: 2 },
        { path: '/role/form/:id', element: <RoleForm permission={permissions}/>, key: 3 }
    ]
    
    const User = [
        { path: '/user', element: <UserIndex permission={permissions}/>, key: 1 }, 
        { path: '/user/form', element: <UserForm permission={permissions}/>, key: 2 },
        { path: '/user/form/:id', element: <UserForm permission={permissions}/>, key: 3 }
    ]

    const Absensi = [
        { path: '/absensi', element: <AbsensiIndex permission={permissions}/>, key: 1 }, 
        { path: '/absensi/form', element: <AbsensiForm permission={permissions}/>, key: 2 },
        { path: '/absensi/form/:id', element: <AbsensiForm permission={permissions}/>, key: 3 },
        { path: '/absensi/detail/:id', element: <AbsensiDetail permission={permissions}/>, key: 3 },
    ]

    return (
        <Router>
        {user && <Sidebar />}
        <div className='page-wrapper'>
        {user && <Navbar /> }
            <div className='page-content'>
            <Routes>
                {/* GUARD ROUTE */}
                <Route exact path='/' element={ user ? <Home /> : <Navigate to="/login"/> }></Route>
                { Departement.map( props => <Route key={props.key} path={props.path} permission={permissions} element={ user ? props.element : <Navigate to="/login"/> } /> )}
                { Jabatan.map( props => <Route key={props.key} path={props.path} permission={permissions} element={ user ? props.element : <Navigate to="/login"/> } /> )}
                { Bagian.map( props => <Route key={props.key} path={props.path} permission={permissions} element={ user ? props.element : <Navigate to="/login"/> } /> )}
                { Karyawan.map( props => <Route key={props.key} path={props.path} permission={permissions} element={ user ? props.element : <Navigate to="/login"/> } /> )}
                { Role.map( props => <Route key={props.key} path={props.path} permission={permissions} element={ user ? props.element : <Navigate to="/login"/> } /> )}
                { User.map( props => <Route key={props.key} path={props.path} permission={permissions} element={ user ? props.element : <Navigate to="/login"/> } /> )}
                <Route path='/salary' element={ user ? <SalaryForm /> : <Navigate to="/login"/> }></Route>
                { Absensi.map( props => <Route key={props.key} path={props.path} permission={permissions} element={ user ? props.element : <Navigate to="/login"/> } /> )}

                { Logout.map(props => <Route key={props.key} path={props.path} element={ user ? props.element : <Navigate to="/login"/> } /> )} 
                {/* GUEST ROUTE */}
                <Route path='/login' element={ !user ? <LoginPage /> : <Navigate to="/"/> }></Route>
                <Route path='/not-found' element={ <NotFoundPage /> }></Route>
                <Route path='*' element={ <NotFoundPage /> }></Route>
            </Routes>
            </div>
        </div>
    </Router>
    )
}

export default Main
