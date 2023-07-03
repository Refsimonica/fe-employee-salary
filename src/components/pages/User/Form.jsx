import React, {Fragment} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../../config';
import { imagePreview, storeData, updateData, setStatus, getRow, setInput, setRoles } from '../../../reduce/user/actions';
import { useForm } from 'react-hook-form';
import { getDataRole } from '../../../api/userAPI';

import { rules } from './Validation';
import Toast from '../../atom/Toast';


const Form = () => {

    const { register, handleSubmit, setValue, setError, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    let response = useSelector( state => state.users );
	let redirect = useNavigate();
    let params = useParams();
    let user = useSelector( state => state.auth );
    let token = user.token || '';

    React.useEffect(() => {
        if (params.id) {
            dispatch(setStatus('process'));
            let result = dispatch(getRow(params.id));
            result.then(function (data) {
                let row = data.data.data

                dispatch(setStatus('success'))
                dispatch(setInput(data.data.data));
                dispatch(imagePreview(`${config.api_host}/${row.image_url}`));

                setValue("name", row.name);
                setValue("role_id", row.roles[0].id);
            })
        }

        const roles = getDataRole({}, token);
        roles.then(function (role) {
            dispatch(setRoles(role.data.data.data))
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params.id]);

    const submitHandler = data => {

        dispatch(setStatus('process'));
        
        let result
        if (params.id) {
            let formData = data;
            dispatch(setInput(formData));
            result = dispatch(updateData());
        } else {
            let formData = data;
            dispatch(setInput(formData));
            result = dispatch(storeData());
        }

        result.then(function(row) {
            if (row.error) {
                dispatch(setStatus('error', row.error.message));
                const fields = row.error.response.data.message;
                Object.keys(fields).forEach((field) => {
                    setError(field, {message: fields[field]});
                });
            } else {
                dispatch(setStatus('success', row.result.data.message));
                dispatch(setInput(''));
                redirect(`/user`);
            }
        });
    }

    return (
        <Fragment>
            <div className='row'>
                <div className='col-md-8 grid-margin stretch-card'>
                    {response.status === 'error' && <Toast property={'error'} text={response.message}></Toast>} 
                    <div className="card" >
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className='row'>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="name" className="form-label">Nama</label>
                                        <input type="text" className="form-control" {...register('name', rules.name)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.name && <p className='error-message' role="alert">{errors.name?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" {...register('email', rules.email)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.email && <p className='error-message' role="alert">{errors.email?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" {...register('password', rules.password)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.password && <p className='error-message' role="alert">{errors.password?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="role_id" className="form-label">Role</label>
                                        <select className="form-select" defaultValue={''} id="role_id" {...register('role_id', rules.role_id)}>
                                            <option value="" disabled>Pilih Role</option>
                                            {response.roles && response.roles.map((data, key) => 
                                                (data.id !== 0 && <option key={data.id} value={data.id}>{data.name}</option>)
                                            )}
                                        </select>
                                        {errors.role_id && <p className='error-message' role="alert">{errors.role_id?.message}</p>}
                                    </div>
                                </div>
                                {   
                                    response.status === 'process' ?
                                    <button type="submit" disabled className="btn btn-primary">Loading...</button> : 
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Form