import React, {Fragment, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../../config';
import { imagePreview, storeData, updateData, setStatus, getRow, setInput } from '../../../reduce/role/actions';
import { useForm } from 'react-hook-form';
import { getMenus } from '../../../api/roleAPI';

import { rules } from './Validation';
import Toast from '../../atom/Toast';


const Form = () => {

    const { register, handleSubmit, setValue, setError, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    let response = useSelector( state => state.roles );
	let redirect = useNavigate();
    let params = useParams();
    let {token} = useSelector( state => state.auth );

    const [ menus, setMenus ] = useState('');
    // const [ permissionIndex, setPermissionIndex ] = useState('');

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
                for (let index = 1; index <= 6; index++) {
                    Object(row.permissions).forEach((permission) => {
                        if (permission.menu_id === index) {
                            setValue(`permission_id.${index}.${permission.id}`, permission.id);
                        }
                    });
                }
            })
        }

        let getMenu = getMenus(token);
        getMenu.then(function (menu) {
            setMenus(menu);
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
                redirect(`/role`);
            }
        });
    }

    return (
        <Fragment>
            <div className='row'>
                <div className='col-12 col-sm-6 col-md-10'>
                    {response.status === 'error' && <Toast property={'error'} text={response.message}></Toast>} 
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">NAMA</label>
                            <input type="text" className="form-control" {...register('name', rules.name)} />
                            {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                            {errors.name && <p className='error-message' role="alert">{errors.name?.message}</p>}
                        </div>
                        {menus && menus.data.data.map((menu, index) => 
                            <div key={index} className="mb-3">
                                <hr></hr>
                                <label htmlFor="name" className="form-label">{menu.name.toUpperCase()}</label>
                                <div className='row ms-1'>
                                    {menu.permissions && menu.permissions.map((permission, index2) => 
                                        <div key={index2} className="form-check col-12 col-sm-4 col-md-2">
                                            <input className="form-check-input" type="checkbox" value={permission.id} {...register(`permission_id.${menu.id}.${permission.id}`)}  id={permission.id}/>
                                            <label className="form-check-label" htmlFor={permission.id}>
                                                {permission.name}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                            // <span>{menu.name}</span>
                        )}
                        {   
                            response.status === 'process' ?
                            <button type="submit" disabled className="btn btn-primary">Loading...</button> : 
                            <button type="submit" className="btn btn-primary">Submit</button>
                        }
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
export default Form