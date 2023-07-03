const rules = {
    email: {
        required: { value: true, message: 'email harus diisi.'}, 
        pattern: {value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/, message: 'Email tidak valid'}
    },
    password: {
        required: { value: true, message: 'password harus diisi.'}, 
    }
}

export {rules}