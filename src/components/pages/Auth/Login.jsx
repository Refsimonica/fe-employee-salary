import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';

import { userLogin } from '../../../reduce/auth/actions';
import { rules } from './Validation';
import { login } from '../../../api/authAPI';

const statuslist = {
    idle: 'idle', 
    process: 'process', 
    success: 'success', 
    error: 'error',
}

const styleCard = {
    position: "absolute",
    margin: "auto"
}

const Login = () => {

    const { register, handleSubmit, setError, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
	let redirect = useNavigate();
    const [status, setStatus] = useState(statuslist.idle);

    const submitHandler = async ({email, password}) => {

        setStatus(statuslist.process);

        try {
            let { data } = await login(email, password); 
            setStatus(statuslist.success);
            dispatch(userLogin(data.data.user, data.data.accessToken, data.data.role));
            redirect(`/`);
        } catch (error) {
            setStatus(statuslist.error);
            setError('email', {message: error.response.data.message });
        }

    }

    return (
        <div className="row w-100 mx-0 auth-page">
            <div className="col-md-12 col-xl-6 mx-auto" style={styleCard}>
                <div className="row">
                    
                    <div className='col-md-12 ps-md-0'>
                    {status === 'process' ? 
                        <ContentLoader viewBox="0 0 400 160" height={160} width={600} backgroundColor="black" >
                            <circle cx="150" cy="86" r="8" />
                            <circle cx="194" cy="86" r="8" />
                            <circle cx="238" cy="86" r="8" />
                        </ContentLoader> :
                        <div className="auth-form-wrapper px-5 py-5">
                            <span className="noble-ui-logo d-block mb-2">Sistem<span> Upah Karyawan</span></span>
                            <h5 className="text-muted fw-normal mb-4">PT. Sinar Terang Logamjaya</h5>
                            <form onSubmit={handleSubmit(submitHandler)} className="forms-sample">
                                <div className="mb-3">
                                    <input type="text" className="form-control" {...register('email', rules.email)} placeholder="Email" />
                                    {errors.email && <p className='error-message' role="alert">{errors.email?.message}</p>}
                                </div>
                                <div htmlFor="mb-3">
                                    <input type="password" autoComplete="on" className="form-control" {...register('password', rules.password)} placeholder="password" />
                                    {errors.password && <p className='error-message' role="alert">{errors.password?.message}</p>}
                                </div>
                                <div className="form-check mb-3 mt-3">
                                    <input type="checkbox" className="form-check-input" id="authCheck"/>
                                    <label className="form-check-label" htmlFor="authCheck"> Remember me </label>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary me-2 mb-2 mb-md-0 text-white">Login</button>
                                    {/* <button type="button" className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"> Lupa Password </button> */}
                                </div>
                            </form>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login