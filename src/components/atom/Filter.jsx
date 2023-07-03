import React from 'react'

const Filter = ({perPage, keyWord, limit}) => {

    const handleInputChange = (event) => {
        let keyword = event.target.value;
        keyWord(keyword)
    }

    return (
        <div className='col-6 col-sm-6 col-md-6 my-3'>
            <div className='d-flex'>
                <div className="dropdown">
                    <button className="btn btn-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='d-flex'>
                                {limit !== 0 ? limit : 'All'}
                                <i className="bi bi-caret-down-fill"></i>
                        </div>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button onClick={() => perPage(5)} className="dropdown-item" >5</button></li>
                        <li><button onClick={() => perPage(10)} className="dropdown-item" >10</button></li>
                        <li><button onClick={() => perPage(50)} className="dropdown-item" >50</button></li>
                        <li><button onClick={() => perPage(100)} className="dropdown-item" >100</button></li>
                        <li><button onClick={() => perPage(0)} className="dropdown-item" >All</button></li>
                    </ul>
                </div>
                <input type="text" onChange={handleInputChange} placeholder='search' className="form-control mx-2"></input>
            </div>
        </div>
    )
}

export default Filter