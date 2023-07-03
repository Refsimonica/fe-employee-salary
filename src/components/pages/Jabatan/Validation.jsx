const rules = {
    name: {
        required: { value: true, message: 'nama harus diisi.'}, 
        maxLength: { value: 100, message: 'panjang nama maksimal 100 karakter.'}
    },
    departemen_id: {
        required: { value: true, message: 'silahkan pilih departement'}
    }
}

export {rules}