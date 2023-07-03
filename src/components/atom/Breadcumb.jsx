import React from 'react'
import {Link} from 'react-router-dom';

const navStyle = {
    "--bs-breadcrumb-divider": ">",
    fontSize: '1.34rem'
}


const Breadcumb = () => {
    return (
        <div className='col-md-12 my-3'>
            <div className="card" >
                <div className="card-body">
                    <nav style={navStyle} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link> / </li>
                            <li className="breadcrumb-item active" aria-current="page">Index</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        
    )
}
export default Breadcumb