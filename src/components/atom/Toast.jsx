import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({text, property}) => {

    switch (property) {
        case 'success':
            toast.success(text, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                theme: "dark",
            });
        break;

        case 'proccess':
            toast(text, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                theme: "dark",
            });
        break;
    
        default:
            toast.error(text, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                theme: "dark",
            });
        break;
    }
    
    // if (property === 'success') {
    //     toast.success(text, {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         draggable: true,
    //         theme: "dark",
    //     });
    // } else {
    //     toast.error(text, {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         draggable: true,
    //         theme: "dark",
    //     });
    // }

    return (
        <ToastContainer 
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />

    )


}

export default Toast
