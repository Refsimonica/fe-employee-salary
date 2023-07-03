/* eslint-disable no-unused-vars */
/* eslint-disable no-self-assign */
import React, {Fragment, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, getRow, setInput, setMessage } from '../../../reduce/absensi/actions';
import moment from 'moment';
import 'moment/locale/id';

import Toast from '../../atom/Toast';
import ContentLoaderRow from '../../atom/ContentLoaderRow'
import Filter from '../../atom/Filter';
import LoaderOverlay from '../../atom/LoaderOverlay';
import DetailAbsensi from './DetailAbsensi';

const Detail = () => {

    let dispatch = useDispatch();
    let response = useSelector( state => state.absensies );
    let params = useParams();
    let user = useSelector( state => state.auth );

    React.useEffect(() => {
        if (params.id) {
            dispatch(setStatus('process'));
            let result = dispatch(getRow(params.id));
            result.then(function (data) {

                if(data.err)
                    return dispatch(setStatus('error', data.err.response.data.message));

                let row = data.data.data;

                dispatch(setStatus('success'));
                dispatch(setInput(data.data.data));
                setKaryawans(row.absensi_karyawan);
                dispatch(setMessage(data.data.message));

            })
        }

    }, [dispatch, params.id]);

    let [karyawans, setKaryawans] = useState({});
    let [limitkaryawans, setLimitKaryawans] = useState(10);
    let [statusOvertime, setStatusOvertime] = useState('Status Lembur');
    let [keyword, setKeyword] = useState('');
    // console.log(karyawans);
    let [isDetail, setIsDetail] = useState(false);
    let [isDetailData, setIsDetailData] = useState([]);
    let [isDetailAbsent, setIsDetailAbsent] = useState([]);

    const handleClose = () => {
        setIsDetail(false);
        setIsDetailData([]);
        setIsDetailAbsent([]);
        dispatch(setStatus('process'));
        let result = dispatch(getRow(params.id));
        result.then(function (data) {

            if(data.err)
                return dispatch(setStatus('error', data.err.response.data.message));

            let row = data.data.data;

            dispatch(setStatus('success'));
            dispatch(setInput(data.data.data));
            setKaryawans(row.absensi_karyawan);
            dispatch(setMessage(data.data.message));

        });
    }

    const handleShow = (data = []) => {
        setIsDetail(true);
        setIsDetailData(data);
        setIsDetailAbsent(JSON.parse(data.absent_detail));
    }

    const keyFilter = (key) => {
        let result = '';
        if (key !== '') {
            setKeyword(key);
            result = response.input.absensi_karyawan.filter(function (item) {
                return item.absent_name.toLowerCase().includes(key.toLowerCase())
                    || item.bpjs_kesehatan_cut.toLowerCase().includes(key.toLowerCase())
                    || item.bpjs_ketenagakerjaan_cut.toLowerCase().includes(key.toLowerCase())
                    || item.no_absent.toLowerCase().includes(key.toLowerCase())
                    || item.no_karyawan.toLowerCase().includes(key.toLowerCase())
                    || item.total_overtime_salary.toLowerCase().includes(key.toLowerCase())
                    || item.total_regular_salary.toLowerCase().includes(key.toLowerCase())
                    || item.absent_cut.toLowerCase().includes(key.toLowerCase())
            });

            if (statusOvertime !== 'Status Lembur' || statusOvertime !== 'Semua') {
                switch (statusOvertime) {
                    case 'Lembur':
                        result = result.filter(function (item) {
                            return item.total_overtime_salary > 0 || item.overtime > 0
                        });
                    break;
                    case 'Tidak Lembur':
                        result = result.filter(function (item) {
                            return item.total_overtime_salary <= 0 || item.overtime <= 0
                        });
                    break;
                    default:
                        result = result;
                    break;
                }
            }
            setKaryawans(result);
        } else {
            setKeyword('');
            setKaryawans(response.input.absensi_karyawan);
        }
    }

    const overTimeFilter = (param) => {

        let result = ''
        setStatusOvertime(param);
        switch (param) {
            case 'Lembur':
                result = response.input.absensi_karyawan.filter(function (item) {
                    return item.total_overtime_salary > 0 || item.overtime > 0
                });
            break;
            case 'Tidak Lembur':
                result = response.input.absensi_karyawan.filter(function (item) {
                    return item.total_overtime_salary <= 0 || item.overtime <= 0
                });
            break;
            default:
                result = response.input.absensi_karyawan;
            break;
        }

        if (keyword !== '') {
            result = result.filter(function (item) {
                return item.absent_name.toLowerCase().includes(keyword.toLowerCase())
                    || item.bpjs_kesehatan_cut.toLowerCase().includes(keyword.toLowerCase())
                    || item.bpjs_ketenagakerjaan_cut.toLowerCase().includes(keyword.toLowerCase())
                    || item.no_absent.toLowerCase().includes(keyword.toLowerCase())
                    || item.no_karyawan.toLowerCase().includes(keyword.toLowerCase())
                    || item.total_overtime_salary.toLowerCase().includes(keyword.toLowerCase())
                    || item.total_regular_salary.toLowerCase().includes(keyword.toLowerCase())
                    || item.absent_cut.toLowerCase().includes(keyword.toLowerCase())
            });
        }

        setKaryawans(result);

    }

    const setLimit = limit => {
        setLimitKaryawans(limit)
    }

    const submitKaryawan = (id) => {
    }

    const numberWithCommas = (number) => {
        if(number > 0)
            return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        return 0;
    }

    return (
        <Fragment>
            {/* <DetailAbsensi  show={isDetail} handleClose={handleClose} handleShow={handleShow} detail={isDetailData} absent={isDetailAbsent} user={user}></DetailAbsensi> */}
            <div className='row'>
                <div className='col-md-12 grid-margin stretch-card'>
                    {response.status === 'error' && <Toast property={'error'} text={response.message}></Toast>} 
                    <div className="card" >
                        <div className="card-body">
                            { response.status !== 'success' && karyawans.length ? <ContentLoaderRow row={6}></ContentLoaderRow> : <div className='row'>
                                <div className='col-md-12'>
                                    <div className="container-fluid d-flex justify-content-between">
                                        <div className="col-lg-3 ps-0">
                                            <p>Validasi Upah Karyawan,<br/> PT.Logam Jaya,<br/>Cimahi.</p>
                                            <h5 className="mt-5 mb-2 text-muted">Invoice to :</h5>
                                            <p>Joseph E Carr,<br/> 102, 102  Crown Street,<br/> London, W3 3PR.</p>
                                        </div>
                                        <div className="col-lg-3 pe-0">
                                            <h4 className="fw-bolder text-uppercase text-end mt-4 mb-2">Absensi Karyawan</h4>
                                            <h6 className="text-end mb-5 pb-4"># INV-002308</h6>
                                            <p className="text-end mb-1">Periode Gaji</p>
                                            <h6 className="mb-0 mt-3 text-end fw-normal mb-2"><span className="text-muted">Awal :</span> {moment(response.input.start_date).format('LL')}</h6>
                                            <h6 className="text-end fw-normal"><span className="text-muted">Akhir :</span> {moment(response.input.end_date).format('LL')}</h6>
                                        </div>
                                    </div>
                                    <div className='container-fluid d-flex justify-content-between'>
                                        <Filter 
                                            perPage={ limit => setLimit(limit)} 
                                            keyWord={ key => keyFilter(key)}
                                            limit={limitkaryawans}>
                                        </Filter>
                                        <div className='col-6 col-sm-6 col-md-6 my-3'>
                                            <div className='d-flex'>
                                                <div className="dropdown">
                                                    <button className="btn btn-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <div className='d-flex'>
                                                            {statusOvertime} <i className="bi bi-caret-down-fill"></i>
                                                        </div>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li><button onClick={() => overTimeFilter('Semua')} className="dropdown-item" >Semua</button></li>
                                                        <li><button onClick={() => overTimeFilter('Lembur')} className="dropdown-item" >Lembur</button></li>
                                                        <li><button onClick={() => overTimeFilter('Tidak Lembur')} className="dropdown-item" >Tidak Lembur</button></li>
                                                    </ul>
                                                </div>
                                                { response.status === 'process' ?
                                                    <button type="button" disabled className="btn btn-primary" style={{marginLeft: 'auto'}}>Loading&hellip;</button> : 
                                                    <button type="button" onClick={() => submitKaryawan(params.id)} className="btn btn-primary" style={{marginLeft: 'auto'}}>Submit</button> }
                                            </div>
                                        </div>
                                    </div>
                                    {response.status !== 'success' ? <ContentLoaderRow row={6}></ContentLoaderRow> : 
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Informasi Karyawan</th>
                                                        <th>Detail Pendapatan</th>
                                                        <th>Detail Kehadiran</th>
                                                    </tr>
                                                </thead>
                                                { parseInt(karyawans.length) > 0 ? 
                                                <tbody>
                                                    {karyawans.length && karyawans.map((karyawan, index) => 
                                                        <Fragment key={index}>
                                                            {karyawans.length > 0 && karyawan.m_karyawan_id !== null && 
                                                            // <KaryawanList showDetail={(data)=> handleShow(data)} key={index} karyawan={karyawan} index={index} />
                                                            // <tr onClick={() => showDetail(karyawan)} style={{cursor: 'pointer'}}>
                                                            <tr style={{cursor: 'pointer'}}>
                                                                <td>
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><b>No Absent</b></td>
                                                                                <td> : {karyawan.no_absent}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><b>No Karyawan</b></td>
                                                                                <td> : {karyawan.no_karyawan}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><b>Nama</b></td>
                                                                                <td> : {karyawan.absent_name}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><b>Nama Bank</b></td>
                                                                                <td> : {karyawan.bank_name}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><b>No Rekening</b></td>
                                                                                <td> : {karyawan.no_rekening}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td style={{backgroundColor: "cornsilk"}}>
                                                                    <b >Gaji Pokok Harian</b> <span style={{float: "right"}} >{numberWithCommas(karyawan.total_regular_salary)}</span>
                                                                    <br></br>
                                                                    <span>Lembur Weekend</span> <span style={{float: "right"}} >{ numberWithCommas(karyawan.total_overtime_salary)}</span>
                                                                    <hr></hr>
                                                                    <span>Absent</span> <span style={{float: "right"}} >{numberWithCommas(karyawan.absent_cut)}</span>
                                                                    <br></br>
                                                                    <span>BPJS Kesehatan</span> <span style={{float: "right"}} >{numberWithCommas(karyawan.bpjs_kesehatan_cut)}</span>
                                                                    <br></br>
                                                                    <span>BPJS Ketenagakerjaan</span> <span style={{float: "right"}} >{numberWithCommas(karyawan.bpjs_ketenagakerjaan_cut)}</span>
                                                                    <hr style={{height: "2px"}}></hr>
                                                                    <b style={{backgroundColor: "burlywood"}}>Take Home Pay</b> <span style={{float: "right", backgroundColor: "burlywood"}} >{ 
                                                                        'IDR ' + numberWithCommas(
                                                                            (parseInt(karyawan.total_regular_salary) + parseInt(karyawan.total_overtime_salary)) - 
                                                                            (parseInt(karyawan.absent_cut) + parseInt(karyawan.bpjs_kesehatan_cut) + 
                                                                            parseInt(karyawan.bpjs_ketenagakerjaan_cut) )
                                                                        )
                                                                    }</span>
                                                                </td>
                                                                <td>
                                                                    <button className='btn btn-sm btn-secondary'><i className="bi bi-list-task"></i></button>
                                                                </td>
                                                            </tr> 
                                                            }
                                                        </Fragment>
                                                    )}
                                                </tbody> :
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={6}>
                                                            <div className="alert alert-info" style={{textAlign: 'center'}}>
                                                                Data Tidak Tersedia
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                }
                                            </table> 
                                        </div>
                                    }
                                </div>
                            </div> }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Detail