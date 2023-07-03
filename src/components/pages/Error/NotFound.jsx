import React from 'react'
import { Link } from 'react-router-dom';
import Image from '../../atom/Image';

const NotFound = (props) => {
  return (
    <div className="row w-100 mx-0 auth-page">
      <div className="col-md-8 col-xl-6 mx-auto d-flex flex-column align-items-center">
        <Image url="/images/404.svg" class='img-fluid mb-2'></Image>
        <h1 className="fw-bolder mb-22 mt-2 tx-80 text-muted">404</h1>
        <h4 className="mb-2">Page Not Found</h4>
        <h6 className="text-muted mb-3 text-center">Oopps!! Halaman yang anda cari tidak tersedia.</h6>
        <Link to={props.prevPage ? props.prevPage : '/'}>
          <span className="btn btn-primary">Kembali</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
