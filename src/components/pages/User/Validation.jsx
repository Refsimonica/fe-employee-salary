const rules = {
    name: {
        required: { value: true, message: 'nama harus diisi.'}, 
        maxLength: { value: 100, message: 'panjang nama maksimal 100 karakter.'}
    },
    email: {
        required: { value: true, message: 'silahkan pilih email'},
        pattern: {value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/, message: 'Email tidak valid'}
    },
    password: {
        required: { value: true, message: 'password harus diisi.'}, 
    },
    role_id: {
        required: { value: true, message: 'role harus diisi.'}, 
    },
}

export {rules}