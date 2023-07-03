import React, {Fragment} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../../config';
import { imagePreview, storeData, updateData, setStatus, getRow, setInput } from '../../../reduce/departement/actions';
import { useForm } from 'react-hook-form';

import { rules } from './Validation';
import Toast from '../../atom/Toast';


const Form = () => {

    const { register, handleSubmit, setValue, setError, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    let response = useSelector( state => state.departements );
	let redirect = useNavigate();
    let params = useParams();

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
            })
        }
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
                redirect(`/departement`);
            }
        });
    }

    return (
        <Fragment>
            <div className='row'>
                <div className='col-md-6 grid-margin stretch-card'>
                    {response.status === 'error' && <Toast property={'error'} text={response.message}></Toast>} 
                    <div className="card" >
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nama</label>
                                    <input type="text" className="form-control" {...register('name', rules.name)} />
                                    {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                    {errors.name && <p className='error-message' role="alert">{errors.name?.message}</p>}
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