import React, {Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, setPage, goToNextPage, goToPrevPage, setKeyword, setLimit } from '../../../reduce/jabatan/actions';
import { deleteData } from '../../../api/jabatanAPI';
import Swal from 'sweetalert2'

// COMPONENT
import Pagination from '../../atom/Pagination';
import Filter from '../../atom/Filter';
import ContentLoaderRow from '../../atom/ContentLoaderRow'
import Button from '../../atom/Button';
import Toast from '../../atom/Toast';

const Index = (props) => {

    let redirect = useNavigate();

    if (props.permission.includes(`view jabatan`) === false)
        redirect(`/not-found`);

    let dispatch = useDispatch();
    let response = useSelector( state => state.jabatans );

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

    const editHandler = (id) => {
        redirect(`/jabatan/form/${id}`);
    }

    return (
        <Fragment>
            <div className='row'>
                <Filter 
                    perPage={ limit => dispatch(setLimit(limit))} 
                    keyWord={ key => dispatch(setKeyword(key))}
                    limit={response.perPage}>
                </Filter>
                <div className='col-6 col-sm-6 col-md-6 my-3'>
                {props.permission && props.permission.includes(`add jabatan`) &&
                    <Link to="/jabatan/form" className="btn btn-primary float-right" style={{float: 'right'}}>Add</Link>}
                </div>
                <div className='col-12 col-sm-12 col-md-12 my-3'>
                    {response.status === 'success' && <Toast property={`success`} text={response.message}></Toast>} 
                    {response.status === 'error' && <Toast property={`error`} text={'Gagal Menampilkan Data'}></Toast>} 
                    <div className="card" >
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Departement</th>
                                        <th width="14%" scope="col">Actions</th>
                                    </tr>
                                </thead>
                                {<tbody>
                                    { response.status === 'success' && response.data.data && response.data.data.map((jabatan, index) => 
                                        <tr key={jabatan.id}>
                                            <td>{index+1}</td>
                                            <td>{jabatan.name}</td>
                                            <td>{jabatan.departemen && jabatan.departemen.name}</td>
                                            <td>
                                                {props.permission && props.permission.includes(`edit jabatan`) &&
                                                    <Button onAction={() => editHandler(jabatan.id)} text={`Edit`} icon={`bi bi-pencil-square`} property={`btn btn-sm btn-light mx-1`}></Button>}
                                                {props.permission && props.permission.includes(`delete departemen`) &&
                                                    <Button onAction={() => deleteHandler(jabatan.id)} text={`Delete`} icon={`bi bi-trash-fill`} property={`btn btn-sm btn-light mx-1`}></Button>}
                                            </td>
                                        </tr>
                                    )}
                                    {response.status === 'process' && <tr>
                                        <th colSpan="5">
                                            <ContentLoaderRow row={5}></ContentLoaderRow>
                                        </th>
                                    </tr>}
                                </tbody>}
                            </table>
                        </div>
                    </div>
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
            </div>
        </Fragment>
    )

}
export default Index