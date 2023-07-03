import React from 'react';
import ContentLoader from 'react-content-loader';
import { useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import { userLogout } from '../../../reduce/auth/actions';
import { logout } from '../../../api/authAPI';

const Logout = (props) => {

    let redirect = useNavigate();
    let dispatch = useDispatch();

    React.useEffect(() => {

        logout()
            .then(() => dispatch(userLogout()))
            .then(() => redirect('/login'));

    }, [redirect, dispatch]);
    
    return (
        <div className='row'>
            <div className='col-md-12'>
                <ContentLoader
                    viewBox="0 0 400 160"
                    height={160}
                    width={1200}
                    backgroundColor="transparent"
                    {...props}
                >
                    <circle cx="150" cy="86" r="8" />
                    <circle cx="194" cy="86" r="8" />
                    <circle cx="238" cy="86" r="8" />
                </ContentLoader>
            </div>
        </div>
    )
}

export default Logout