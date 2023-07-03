import React, {Fragment} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../../config';
import { imagePreview, storeData, updateData, setStatus, getRow, setInput, setDepartement } from '../../../reduce/jabatan/actions';
import { useForm } from 'react-hook-form';
import { getDataDepartment } from '../../../api/jabatanAPI';

import { rules } from './Validation';
import Toast from '../../atom/Toast';


const Form = () => {

    const { register, handleSubmit, setValue, setError, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    let response = useSelector( state => state.jabatans );
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
                setValue("departemen_id", row.departemen.id);
            })
        }

        const departements = getDataDepartment({}, token);
        departements.then(function (departement) {
            dispatch(setDepartement(departement.data.data.data))
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
                redirect(`/jabatan`);
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
                                        <label htmlFor="departemen_id" className="form-label">Nama</label>
                                        <select className="form-select" defaultValue={''} id="departemen_id" {...register('departemen_id', rules.departemen_id)}>
                                            <option value="" disabled>Pilih Departement</option>
                                            {response.departements && response.departements.map((data, key) => 
                                                <option key={data.id} value={data.id}>{data.name}</option>
                                            )}
                                        </select>
                                        {errors.departemen_id && <p className='error-message' role="alert">{errors.departemen_id?.message}</p>}
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