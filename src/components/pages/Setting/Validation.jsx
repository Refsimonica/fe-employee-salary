const rules = {
    salary: {
        required: { value: true, message: 'salary harus diisi.'}, 
        // maxLength: { value: 10, message: 'panjang salary maksimal 10 karakter.'}
    },
    daily: {
        required: { value: true, message: 'upah harian harus diisi.'}, 
    }
}

export {rules}