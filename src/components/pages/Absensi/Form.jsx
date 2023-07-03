import React, {Fragment, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeData, updateData, setStatus, getRow, setInput } from '../../../reduce/absensi/actions';
import { useForm } from 'react-hook-form';
import { config } from '../../../config';

import { rules } from './Validation';
import Toast from '../../atom/Toast';
import ContentLoaderRow from '../../atom/ContentLoaderRow'
import Button from '../../atom/Button';


const Form = () => {

    const { register, handleSubmit, setValue, setError, clearErrors, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    let response = useSelector( state => state.absensies );
	let redirect = useNavigate();
    let params = useParams();
    const [file, setFile] = useState('')

    React.useEffect(() => {
        if (params.id) {
            dispatch(setStatus('process'));
            let result = dispatch(getRow(params.id));
            result.then(function (data) {

                if(data.err)
                    return dispatch(setStatus('error', data.err.response.data.message));

                let row = data.data.data

                dispatch(setStatus('success'));
                dispatch(setInput(data.data.data));

                setValue("start_date", row.start_date);
                setValue("end_date", row.end_date);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params.id]);

    const onImageUpload = (file) => {
        clearErrors()
        setFile(file);
    }

    const submitHandler = data => {

        if(file === '' && !params.id)
            return setError('file', {message: 'Silahkan upload file absensi !'});

        dispatch(setStatus('process'));
        
        let result
        if (params.id) {
            let formData = file !== '' ? {...data, file: file} : data;
            dispatch(setInput(formData));
            result = dispatch(updateData());
        } else {
            let formData = file !== '' ? {...data, file: file} : data;
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
                redirect(`/absensi/detail/${row.result.data.data.id}`);
            }
        });
    }

    const fileHandler = data => {
        if(data)
            window.location.replace(`${config.api_host}/storage/${data}`);
    }

    return (
        <Fragment>
            <div className='row'>
                <div className='col-md-10 grid-margin stretch-card'>
                    {response.status === 'error' && <Toast property={'error'} text={response.message}></Toast>} 
                    <div className="card" >
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                { response.status === 'process' ? <ContentLoaderRow row={6}></ContentLoaderRow> : <div className='row'>
                                    <div className='col-md-12'>
                                        <div className="mb-3">
                                            <label className="form-label">Periode</label>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <input type="date" placeholder='dari tanggal' className="form-control" {...register('start_date', rules.start_date)} />
                                                    {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                                    {errors.start_date && <p className='error-message' role="alert">{errors.start_date?.message}</p>}
                                                </div>
                                                <div className='col-md-6'>
                                                    <input type="date" placeholder='sampai tanggal' className="form-control" {...register('end_date', rules.end_date)} />
                                                    {errors.end_date && <p className='error-message' role="alert">{errors.end_date?.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <label htmlFor="file" className="form-label">File Absensi</label>
                                                    <input type="file" accept=".xls,.xlsx" onChange={ (event) => onImageUpload(event.target.files[0]) } className="form-control"/>
                                                    {errors.file && <p className='error-message' role="alert">{errors.file?.message}</p>}
                                                </div>
                                                <div className='col-md-4'>
                                                    <label htmlFor="file" className="form-label">Potongan BPJS</label>
                                                    <br></br>
                                                    <input type="checkbox" className="form-check-input" {...register('bpjs_cut')}></input>
                                                </div>
                                                <div className='col-md-2'>
                                                    <label htmlFor="file" className="form-label">Download File</label>
                                                    {params.id && response.input.file ?
                                                        <Button onAction={() => fileHandler(response.input.file)} inner={`Download File`} text={`Download File`} icon={`bi bi-file-arrow-down-fill`} property={`form-control btn btn-sm btn-primary mx-1`}></Button>
                                                    : <Button onAction={() => fileHandler(response.input.file)} inner={`Download File`} text={`Belum Ada File`} icon={`bi bi-file-arrow-down-fill`} property={`form-control btn btn-sm btn-secondary mx-1`}></Button>}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div> }
                                { response.status === 'process' ?
                                    <button type="submit" disabled className="btn btn-primary">Loading&hellip;</button> : 
                                    <button type="submit" className="btn btn-primary">Submit</button> }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Form