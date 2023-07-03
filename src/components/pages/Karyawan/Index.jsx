import React, {Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, setPage, goToNextPage, goToPrevPage, setKeyword, setLimit } from '../../../reduce/karyawan/actions';
import { deleteData } from '../../../api/karyawanAPI';
import Swal from 'sweetalert2'

// COMPONENT
import Pagination from '../../atom/Pagination';
import Filter from '../../atom/Filter';
import ContentLoaderRow from '../../atom/ContentLoaderRow'
import Button from '../../atom/Button';
import Toast from '../../atom/Toast';

const Index = (props) => {

    let redirect = useNavigate();

    if (props.permission.includes(`view karyawan`) === false)
        redirect(`/not-found`);

    let dispatch = useDispatch();
    let response = useSelector( state => state.karyawans );

    let user = useSelector( state => state.auth );

    React.useEffect(() => {
		dispatch(fetchData());
	}, [dispatch, response.currentPage, response.keyword, response.perPage]);

    const deleteHandler = (id) => {
        let token = user.token || '';

        Swal.fire({
            title: 'Delete This Item ?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                let result = deleteData(id, token);
                result.then(function(data) {
                    if (data.data.error === 1) {
                        Swal.fire(data.data.message, '', 'error')
                    } else {
                        Swal.fire('Deleted !', '', 'success')
                        dispatch(fetchData());
                    }
                })
            }
        })
    }
    // console.log(response.status);
    const editHandler = (id) => {
        redirect(`/karyawan/form/${id}`);
    }

    return (
        <Fragment>
            {props.permission && props.permission.includes(`view karyawan`) &&
            <div className='row'>
                <Filter 
                    perPage={ limit => dispatch(setLimit(limit))} 
                    keyWord={ key => dispatch(setKeyword(key))}
                    limit={response.perPage}>
                </Filter>
                <div className='col-6 col-sm-6 col-md-6 my-3'>
                    {props.permission && props.permission.includes(`add karyawan`) && 
                        <Link to="/karyawan/form" className="btn btn-primary float-right" style={{float: 'right'}}>Add</Link> 
                    }
                </div>
                
                <div className='col-12 col-sm-12 col-md-12 my-3'>
                    {response.status === 'success' && <Toast property={`success`} text={response.message ? response.message : 'Berhasil'}></Toast>} 
                    {response.status === 'error' && <Toast property={`error`} text={'Gagal Menampilkan Data'}></Toast>} 
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Departement</th>
                                <th scope="col">Bagian</th> 
                                <th scope="col">Jabatan</th>
                                <th width="14%" scope="col">Actions</th>
                            </tr>
                        </thead>
                        {<tbody>
                            { response.status === 'success' && response.data.data && response.data.data.map((karyawan, index) => 
                                <tr key={karyawan.id}>
                                    <td>{index+1}</td>
                                    <td>{karyawan.name}</td>
                                    <td>{karyawan.departemen && karyawan.departemen.name}</td>
                                    <td>{karyawan.bagian ? karyawan.bagian.name : '-'}</td>
                                    <td>{karyawan.jabatan && karyawan.jabatan.name}</td>
                                    <td>
                                        <div className='row'>
                                            {props.permission && props.permission.includes(`edit karyawan`) && 
                                                <Button onAction={() => editHandler(karyawan.id)} text={`Edit`} icon={`bi bi-pencil-square`} property={`col-12 col-sm-3 col-md-3 btn btn-sm btn-light mx-1`}></Button> 
                                            }
                                            {props.permission && props.permission.includes(`delete karyawan`) && 
                                                <Button onAction={() => deleteHandler(karyawan.id)} text={`Delete`} icon={`bi bi-trash-fill`} property={`col-12 col-sm-3 col-md-3 btn btn-sm btn-light mx-1`}></Button> 
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {response.status === 'process' && <tr>
                                <th colSpan="6">
                                    <ContentLoaderRow row={5}></ContentLoaderRow>
                                </th>
                            </tr>}
                        </tbody>}
                    </table>
                </div>
                <Pagination 
                    currentPage={response.data.current_page} 
                    perPage={response.data.per_page} 
                    totalItems={response.data.total} 
                    maxPageLimit={response.maxPageLimit}
                    minPageLimit={response.minPageLimit}
                    paginate={ number => dispatch(setPage(number))} 
                    goToPrevPage={ () => dispatch(goToPrevPage())} 
                    goToNextPage={ () => dispatch(goToNextPage())}>
                </Pagination>
            </div>}
        </Fragment>
    )

}
export default Index