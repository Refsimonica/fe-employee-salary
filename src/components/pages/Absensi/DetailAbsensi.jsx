import React, { useState } from 'react'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody, 
    MDBModalFooter
} from 'mdb-react-ui-kit';
import './DetailAbsensi.css';
import { updateAbsentDays, updateOvertime, updateAbsentDetail } from '../../../api/absensiAPI';
import LoaderOverlay from '../../atom/LoaderOverlay';

const DetailAbsensi = (props) => {

    const {show, handleClose, handleShow, detail, absent, user} = props;
    const [ presence, setPresence ] = useState([]);
    const [status, setStatus] = useState('idle');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    console.log(absent);
    const absentStatus = (status) => {
        switch (status) {
            case 'attend':
                return '#FFFFFF';

            case 'sick':
                return '#fff2d6';
        
            default:
                return '#ffd6d6';
        }
    }

    const dateFormatter = (date) => {
        const newDate = date.split('/');
        if (newDate.length === 3) {
            return new Date(`
                ${newDate[1]}/${newDate[0]}/${newDate[2]}`
            )
        }
        return '-';
    }

    async function updateAbsentSalary(event) {
        setStatus('proccess');
        const newAbsent = absent;
        const date = event.target.getAttribute('data-date');
        const index = absent.findIndex(function(abs) {
            return abs.Date === date
        });
        newAbsent[index].status = event.target.value;
        const token = user.token || '';
        const result = await updateAbsentDetail({id: detail.id, absent: newAbsent, status: event.target.value}, token);
        if (result.status === 200) {
            console.log(result.data);
            setPresence(result.data);
            setStatus('success');
        } else {
            setStatus('errror');
        }
    }

    React.useEffect(() => {
        setPresence(absent);
    }, [absent, presence]);

    return (
        <div>
            <MDBBtn onClick={handleShow}>Detail</MDBBtn>
            <MDBModal show={show} tabIndex='-1' onHide={handleClose}>
                <MDBModalDialog size="fullscreen">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Detail Absensi <b>{detail.length > 0 && detail[0].Name }</b></MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Tanggal</th>
                                                <th>Jam In</th>
                                                <th>Jam Out</th>
                                                <th>Absen In</th>
                                                <th>Absen Out</th>
                                                <th>Telat</th>
                                                <th>Awal</th>
                                                <th>Mangkir</th>
                                                <th>OTTime</th>
                                                <th>Jam Kerja</th>
                                                <th>Total Jam Masuk</th>
                                                <th>Keterangan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {presence.length > 0 ? presence.map((value, index) => 
                                                <tr key={index} style={{backgroundColor: absentStatus(value.status)}}>
                                                    <th scope="row">{parseInt(index) + 1}</th>
                                                    <td>{ dateFormatter(value.Date).toLocaleString("id-ID", options) }</td>
                                                    <td>{value.Onduty}</td>
                                                    <td>{value.Offduty}</td>
                                                    <td>{value.ClockIn}</td>
                                                    <td>{value.ClockOut}</td>
                                                    <td>{value.Late}</td>
                                                    <td>{value.Early}</td>
                                                    <td>{value.Absent !== '' && `✔`}</td>
                                                    <td>{value.OTTime}</td>
                                                    <td>{value.WorkTime}</td>
                                                    <td>{value.ATTTime}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <div className="form-check form-check-inline">
                                                                <input data-date={value.Date} disabled={value.status !== 'attend' && 
                                                                        (dateFormatter(value.Date).getDay() === 6 || dateFormatter(value.Date).getDay() === 0) ? 'disabled' : ``
                                                                    }
                                                                    defaultChecked={value.status === 'attend' ? 'checked' : ''}
                                                                    onChange={updateAbsentSalary}
                                                                    className="form-check-input" type="radio" name={`${index}-status`} id={`${index}-attend`} value={`attend`}/>
                                                                <label className="form-check-label" htmlFor={`${index}-attend`}>Hadir</label>
                                                            </div>

                                                            <div className="form-check form-check-inline">
                                                                <input data-date={value.Date} disabled={value.status !== 'attend' && 
                                                                        (dateFormatter(value.Date).getDay() === 6 || dateFormatter(value.Date).getDay() === 0) ? 'disabled' : ``
                                                                    } 
                                                                    defaultChecked={value.status === 'sick' ? 'checked' : ''}
                                                                    className="form-check-input" type="radio" name={`${index}-status`} id={`${index}-sick`} value={`sick`}
                                                                    onChange={updateAbsentSalary}/>
                                                                <label className="form-check-label" htmlFor={`${index}-sick`}>Sakit</label>
                                                            </div>

                                                            <div className="form-check form-check-inline">
                                                                <input data-date={value.Date} disabled={value.status !== 'attend' && 
                                                                        (dateFormatter(value.Date).getDay() === 6 || dateFormatter(value.Date).getDay() === 0) ? 'disabled' : ``
                                                                    }
                                                                    defaultChecked={value.status === 'permit' ? 'checked' : ''}
                                                                    onChange={updateAbsentSalary}
                                                                    className="form-check-input" type="radio" name={`${index}-status`} id={`${index}-permit`} value={`permit`}/>
                                                                <label className="form-check-label" htmlFor={`${index}-permit`}>Izin</label>
                                                            </div>

                                                            <div className="form-check form-check-inline">
                                                                <input data-date={value.Date} 
                                                                    disabled={value.status !== 'attend' && 
                                                                        (dateFormatter(value.Date).getDay() === 6 || dateFormatter(value.Date).getDay() === 0) ? 'disabled' : ``
                                                                    }
                                                                    defaultChecked={value.status === 'absent' ? 'checked' : ''}
                                                                    attr={dateFormatter(value.Date).getDay()}
                                                                    className="form-check-input" type="radio" name={`${index}-status`} 
                                                                    id={`${index}-absent`} value={`absent`}
                                                                    onChange={updateAbsentSalary}
                                                                    />
                                                                <label className="form-check-label" htmlFor={`${index}-absent`}>Off/Mangkir</label>
                                                            </div>
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : <tr>
                                            <td colSpan={12}>
                                                <div className="alert alert-info" style={{textAlign: 'center'}}>
                                                    Data Absensi Tidak Tersedia
                                                </div>
                                            </td>
                                        </tr>}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th style={{width: '10%'}}>Mangkir</th>
                                            <td>{`${parseInt(detail.absent)} Hari x 8 : ${parseInt(detail.absent) * 8} Jam` }</td>
                                        </tr>
                                        <tr>
                                            <th style={{width: '10%'}}>Sakit</th>
                                            <td>Tanggal</td>
                                        </tr>
                                        <tr>
                                            <th style={{width: '10%'}}>Izin</th>
                                            <td>Tanggal</td>
                                        </tr>
                                        <tr>
                                            <th style={{width: '10%'}}>Lembur</th>
                                            <td>Tanggal</td>
                                        </tr>
                                        <tr>
                                            <th style={{width: '10%'}}>Lembur Weekend</th>
                                            <td>{detail.overtime}</td>
                                        </tr>
                                    </thead>
                                </table>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button className='btn btn-secondary' onClick={handleClose}>Tutup</button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {status === 'proccess' && <LoaderOverlay property={'proccess'} text='Loading...'></LoaderOverlay>} 
        </div>
    )
}

export default DetailAbsensi