import React, {Fragment,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../../config';
import { imagePreview, storeData, updateData, setStatus, getRow, setInput, setDepartement, setBagian, setJabatan } from '../../../reduce/karyawan/actions';
import { useForm } from 'react-hook-form';
import { getDataDepartment, getDataBagian, getDataJabatan } from '../../../api/karyawanAPI';

import { rules } from './Validation';
import Toast from '../../atom/Toast';
import ContentLoaderRow from '../../atom/ContentLoaderRow'


const Form = (props) => {

    let redirect = useNavigate();

    if (props.permission.includes(`add karyawan`) === false)
        redirect(`/karyawan`);
    

    const { register, handleSubmit, setValue, setError, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    let response = useSelector( state => state.karyawans );
	
    let params = useParams();
    let user = useSelector( state => state.auth );
    let token = user.token || '';

    let [disabledBagian, setDisabledBagian] = useState('disabled');
    let [disabledJabatan, setDisabledJabatan] = useState('disabled');

    const bagianJabatan = (idDepartement) => {
        const bagians = getDataBagian({departemen_id: idDepartement}, token);
        bagians.then(function (bagian) {
            dispatch(setBagian(bagian.data.data.data))
        });

        const jabatans = getDataJabatan({departemen_id: idDepartement}, token);
        jabatans.then(function (jabatan) {
            dispatch(setJabatan(jabatan.data.data.data))
        });
    }

    React.useEffect(() => {
        if (params.id) {
            dispatch(setStatus('process'));
            let result = dispatch(getRow(params.id));
            result.then(function (data) {
                let row = data.data.data

                dispatch(setStatus('success'))
                dispatch(setInput(row));
                dispatch(imagePreview(`${config.api_host}/${row.image_url}`));

                setValue("name", row.name);
                setValue("departemen_id", row.departemen.id);
                setValue("bagian_id", row.bagian.id);
                setValue("jabatan_id", row.jabatan.id);

                setValue("gender", row.gender);
                setValue("no_bpjs_kesehatan", row.no_bpjs_kesehatan);
                setValue("no_bpjs_ketenagakerjaan", row.no_bpjs_ketenagakerjaan);
                setValue("no_karyawan", row.no_karyawan);

                setValue("no_kk", row.no_kk);
                setValue("no_ktp", row.no_ktp);
                setValue("no_rekening", row.no_rekening);
                setValue("phone_number", row.phone_number);

                setValue("place_birth", row.place_birth);
                setValue("religion", row.religion);
                setValue("education", row.education);
                setValue("email", row.email);
                setValue("emergency_phone_number", row.emergency_phone_number);
                setValue("description", row.description);
                setValue("bank_name", row.bank_name);
                setValue("address", row.address);
                setValue("date_birth", row.date_birth);

                bagianJabatan(row.departemen.id);

            });
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
        dispatch(setInput(data));
        if (params.id) {
            result = dispatch(updateData());
        } else {
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
                redirect(`/karyawan`);
            }
        });
    }

    const departementChange = event => {

        bagianJabatan(event.target.value);
        setDisabledBagian('');
        setDisabledJabatan('');
        setValue("bagian_id", '');
        setValue("jabatan_id", '');

    };

    return (
        <Fragment>
            <div className='row'>
                <div className='col-md-12 grid-margin stretch-card'>
                    {response.status === 'error' && <Toast property={'error'} text={response.message}></Toast>} 
                    <div className="card" >
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                {response.status === 'process' ? <ContentLoaderRow row={10}></ContentLoaderRow> :
                                <div className='row'>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="name" className="form-label">Nama</label>
                                        <input type="text" className="form-control" {...register('name', rules.name)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.name && <p className='error-message' role="alert">{errors.name?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="penempatan_id" className="form-label">Penempatan</label>
                                        <select className="form-select" defaultValue={''} id="penempatan_id" {...register('penempatan_id', rules.penempatan_id)}>
                                            <option value="1">STL 1</option>
                                            <option value="2">STL 2</option>
                                            <option value="3">STL 3</option>
                                            <option value="4">DELTA</option>
                                        </select>
                                        {errors.departemen_id && <p className='error-message' role="alert">{errors.departemen_id?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-4">
                                        <label htmlFor="departemen_id" className="form-label">Departement</label>
                                        <select className="form-select" defaultValue={''} id="departemen_id" {...register('departemen_id', { onChange: (event) => {departementChange(event)}}, rules.departemen_id)}>
                                            {response.departements && response.departements.map((data, key) => 
                                                <option key={data.id} value={data.id}>{data.name}</option>
                                            )}
                                        </select>
                                        {errors.departemen_id && <p className='error-message' role="alert">{errors.departemen_id?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-4">
                                        <label htmlFor="bagian_id" className="form-label">Bagian</label>
                                        <select disabled={disabledBagian} className="form-select" defaultValue={''} id="bagian_id" {...register('bagian_id', rules.bagian_id)}>
                                            <option value="" disabled>Pilih Bagian</option>
                                            {response.bagians && response.bagians.map((data, key) => 
                                                <option key={data.id} value={data.id}>{data.name}</option>
                                            )}
                                        </select>
                                        {errors.bagian_id && <p className='error-message' role="alert">{errors.bagian_id?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-4">
                                        <label htmlFor="jabatan_id" className="form-label">Jabatan</label>
                                        <select disabled={disabledJabatan} className="form-select" defaultValue={''} id="jabatan_id" {...register('jabatan_id', rules.jabatan_id, { onChange: (e) => {}})}>
                                            <option value="" disabled>Pilih Jabatan</option>
                                            {response.jabatans && response.jabatans.map((data, key) => 
                                                <option key={data.id} value={data.id}>{data.name}</option>
                                            )}
                                        </select>
                                        {errors.jabatan_id && <p className='error-message' role="alert">{errors.jabatan_id?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" {...register('email', rules.email)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.email && <p className='error-message' role="alert">{errors.email?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="gender" className="form-label">Jenis Kelamin</label>
                                        <select className="form-select" defaultValue={''} id="gender" {...register('gender', rules.gender)}>
                                            <option value="" disabled>Pilih Jenis Kelamin</option>
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                        {errors.departemen_id && <p className='error-message' role="alert">{errors.departemen_id?.message}</p>}
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="place_birth" className="form-label">Tempat Lahir</label>
                                        <input type="text" className="form-control" {...register('place_birth', rules.place_birth)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.place_birth && <p className='error-message' role="alert">{errors.place_birth?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="date_birth" className="form-label">Tanggal Lahir</label>
                                        <input type="date" className="form-control" {...register('date_birth', rules.date_birth)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.date_birth && <p className='error-message' role="alert">{errors.date_birth?.message}</p>}
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="no_ktp" className="form-label">NO KTP</label>
                                        <input type="text" className="form-control" {...register('no_ktp', rules.no_ktp)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.no_ktp && <p className='error-message' role="alert">{errors.no_ktp?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="phone_number" className="form-label">NO Telepon</label>
                                        <input type="text" className="form-control" {...register('phone_number', rules.phone_number)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.phone_number && <p className='error-message' role="alert">{errors.phone_number?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="religion" className="form-label">Agama</label>
                                        <select className="form-select" defaultValue={''} id="religion" {...register('religion', rules.religion)}>
                                            <option value="" disabled>Pilih Agama</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Katolik">Katolik</option>
                                            <option value="Protestan">Protestan</option>
                                            <option value="Hindu">Hindu</option>
                                            <option value="Budha">Budha</option>
                                            <option value="Lainnnya">Lainnnya</option>
                                        </select>
                                        {errors.departemen_id && <p className='error-message' role="alert">{errors.departemen_id?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="education" className="form-label">Pendidikan</label>
                                        <input type="text" className="form-control" {...register('education', rules.education)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.education && <p className='error-message' role="alert">{errors.education?.message}</p>}
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="no_bpjs_kesehatan" className="form-label">NO BPJS Kesehatan</label>
                                        <input type="text" className="form-control" {...register('no_bpjs_kesehatan', rules.no_bpjs_kesehatan)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.no_bpjs_kesehatan && <p className='error-message' role="alert">{errors.no_bpjs_kesehatan?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="no_bpjs_ketenagakerjaan" className="form-label">NO BPJS Ketenagakerjaan</label>
                                        <input type="text" className="form-control" {...register('no_bpjs_ketenagakerjaan', rules.no_bpjs_ketenagakerjaan)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.no_bpjs_ketenagakerjaan && <p className='error-message' role="alert">{errors.no_bpjs_ketenagakerjaan?.message}</p>}
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="no_kk" className="form-label">NO KK</label>
                                        <input type="text" className="form-control" {...register('no_kk', rules.no_kk)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.no_kk && <p className='error-message' role="alert">{errors.no_kk?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="no_karyawan" className="form-label">NO Karyawan</label>
                                        <input type="text" className="form-control" {...register('no_karyawan', rules.no_karyawan)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.no_karyawan && <p className='error-message' role="alert">{errors.no_karyawan?.message}</p>}
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="bank_name" className="form-label">Nama Bank</label>
                                        <input type="text" className="form-control" {...register('bank_name', rules.bank_name)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.bank_name && <p className='error-message' role="alert">{errors.bank_name?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="no_rekening" className="form-label">NO Rekening Bank</label>
                                        <input type="text" className="form-control" {...register('no_rekening', rules.no_rekening)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.no_rekening && <p className='error-message' role="alert">{errors.no_rekening?.message}</p>}
                                    </div>

                                    <div className="mb-3 col-md-12">
                                        <label htmlFor="address" className="form-label">Alamat Lengkap</label>
                                        <input type="text" className="form-control" {...register('address', rules.address)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.address && <p className='error-message' role="alert">{errors.address?.message}</p>}
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="emergency_phone_number" className="form-label">Nomor Darurat</label>
                                        <input type="text" className="form-control" {...register('emergency_phone_number', rules.emergency_phone_number)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.emergency_phone_number && <p className='error-message' role="alert">{errors.emergency_phone_number?.message}</p>}
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="description" className="form-label">Keterangan</label>
                                        <input type="text" className="form-control" {...register('description', rules.description)} />
                                        {params.id && <input type="hidden" value={params.id} {...register('id')}></input>}
                                        {errors.description && <p className='error-message' role="alert">{errors.description?.message}</p>}
                                    </div>

                                </div>
                                }
                                {response.status === 'process' ?
                                    <button type="submit" disabled className="btn btn-primary">Loading...</button> : 
                                    <button type="submit" className="btn btn-primary">Submit</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Form