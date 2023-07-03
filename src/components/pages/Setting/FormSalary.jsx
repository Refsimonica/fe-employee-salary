import React, {Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { detailData } from '../../../api/SettingAPI';
import { rules } from './Validation';
import Toast from '../../atom/Toast';
import {NumericFormat } from "react-number-format";
import { setStatus, setInput, updateData } from '../../../reduce/setting/actions';
import ContentLoaderRow from '../../atom/ContentLoaderRow'

const FormSalary = () => {

    let dispatch = useDispatch();
    let response = useSelector( state => state.settings );

    let user = useSelector( state => state.auth );
    let token = user.token || ''

    React.useEffect(() => {

        let result = detailData('salary', token);
        result.then(function (data) {

            let row = data.data.data;
            let value = JSON.parse(row.value);
            let daily = Math.round(parseInt(value.salary) / 21);
            let hourly = Math.round(parseInt(daily) / 8);
            let l1 = Math.round(parseInt(value.salary) * 1.5 / 173);
            let l2 = Math.round(parseInt(value.salary) * 2 / 173);
            let l3 = Math.round(parseInt(value.salary) * 3 / 173);

            setValue('name', row.name);
            setValue("salary", value.salary);
            setValue("daily", daily);
            setValue("hourly", hourly);
            setValue("l1", l1);
            setValue("l2", l2);
            setValue("l3", l3);

        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { control, register, handleSubmit, setValue, setError, formState:{ errors } } = useForm();


    const submitHandler = data => {

        dispatch(setStatus('process'));

        if (typeof data.salary === 'string') 
            data = { ...data, salary:  data.salary.replace(/[^\d]/g, "") }

        let formData = data;
        dispatch(setInput(formData));
        let result = dispatch(updateData());
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
            }
        });
    }

    const salaryChange = (value) => {

        let daily = Math.round(parseInt(value) / 21);
        let hourly = Math.round(parseInt(daily) / 8);
        let l1 = Math.round(parseInt(value) * 1.5 / 173);
        let l2 = Math.round(parseInt(value) * 2 / 173);
        let l3 = Math.round(parseInt(value) * 3 / 173);
        let bpjs_kesehatan = Math.round(parseInt(value) * 1 / 100);
        let bpjs_ketenagakerjaan = Math.round(parseInt(value) * 3 / 100);

        setValue("salary", parseInt(value));
        setValue("daily", daily);
        setValue("hourly", hourly);
        setValue("l1", l1);
        setValue("l2", l2);
        setValue("l3", l3);
        setValue("bpjs_kesehatan", bpjs_kesehatan);
        setValue("bpjs_ketenagakerjaan", bpjs_ketenagakerjaan);
    }
    
    return (
        <Fragment>
            <div className='row'>
                <div className='col-md-12 grid-margin stretch-card'>
                    {response.status === 'error' && <Toast property={'error'} text={response.message}></Toast>} 
                    {response.status === 'success' && <Toast property={'success'} text={response.message}></Toast>} 
                    <div className="card" >
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                { response.status === 'process' ? <ContentLoaderRow row={6}></ContentLoaderRow> : <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">UMK / Bln </label>
                                        <input type="hidden" className="form-control" {...register('name')} />
                                        <Controller
                                            control={control}
                                            name="salary"
                                            rules={rules.salary}
                                            render={({ field: { onChange, name, value } }) => (
                                                <NumericFormat className="form-control" thousandSeparator={true} prefix={"Rp."} name={name} onChange={onChange} variant="outlined" value={value} onValueChange={(v) => { salaryChange(v.value) }} />
                                            )}
                                        />
                                        {errors.salary && <p className='error-message' role="alert">{errors.salary?.message}</p>}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Upah Harian</label>
                                        <Controller
                                            name="daily"
                                            control={control}
                                            render={({field: { onChange, name, value} }) => (
                                                <NumericFormat className="form-control" thousandSeparator={true} name={name} onChange={onChange} variant="outlined" value={value} prefix={"Rp."} disabled />
                                            )}
                                            
                                        />
                                        {errors.daily && <p className='error-message' role="alert">{errors.daily?.message}</p>}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Upah Per Jam</label>
                                        <Controller
                                            name="hourly"
                                            control={control}
                                            render={({field: { onChange, name, value} }) => (
                                                <NumericFormat className="form-control" thousandSeparator={true} name={name} onChange={onChange} variant="outlined" value={value} prefix={"Rp."} disabled />
                                            )}
                                            
                                        />
                                        {errors.hourly && <p className='error-message' role="alert">{errors.hourly?.message}</p>}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">L1</label>
                                        <Controller
                                            name="l1"
                                            control={control}
                                            render={({field: { onChange, name, value} }) => (
                                                <NumericFormat className="form-control" thousandSeparator={true} name={name} onChange={onChange} variant="outlined" value={value} prefix={"Rp."} disabled />
                                            )}
                                        />
                                        {errors.l1 && <p className='error-message' role="alert">{errors.l1?.message}</p>}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">L2</label>
                                        <Controller
                                            name="l2"
                                            control={control}
                                            render={({field: { onChange, name, value} }) => (
                                                <NumericFormat className="form-control" thousandSeparator={true} name={name} onChange={onChange} variant="outlined" value={value} prefix={"Rp."} disabled />
                                            )}
                                        />
                                        {errors.l2 && <p className='error-message' role="alert">{errors.l2?.message}</p>}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">L3</label>
                                        <Controller
                                            name="l3"
                                            control={control}
                                            render={({field: { onChange, name, value} }) => (
                                                <NumericFormat className="form-control" thousandSeparator={true} name={name} onChange={onChange} variant="outlined" value={value} prefix={"Rp."} disabled />
                                            )}
                                        />
                                        {errors.l3 && <p className='error-message' role="alert">{errors.l3?.message}</p>}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Potongan BPJS Kesehatan</label>
                                        <Controller
                                            name="bpjs_kesehatan"
                                            control={control}
                                            render={({field: { onChange, name, value} }) => (
                                                <NumericFormat className="form-control" thousandSeparator={true} name={name} onChange={onChange} variant="outlined" value={value} prefix={"Rp."} disabled />
                                            )}
                                        />
                                        {errors.bpjs_kesehatan && <p className='error-message' role="alert">{errors.bpjs_kesehatan?.message}</p>}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Potongan BPJS Ketenagakerjaan </label>
                                        <Controller
                                            name="bpjs_ketenagakerjaan"
                                            control={control}
                                            render={({field: { onChange, name, value} }) => (
                                                <NumericFormat className="form-control" thousandSeparator={true} name={name} onChange={onChange} variant="outlined" value={value} prefix={"Rp."} disabled />
                                            )}
                                        />
                                        {errors.bpjs_ketenagakerjaan && <p className='error-message' role="alert">{errors.bpjs_ketenagakerjaan?.message}</p>}
                                        </div>
                                    </div>
                                </div> }
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
export default FormSalary



