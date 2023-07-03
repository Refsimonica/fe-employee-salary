const rules = {
    name: {
        required: { value: true, message: 'nama harus diisi.'}, 
        maxLength: { value: 100, message: 'panjang nama maksimal 100 karakter.'}
    },
    departemen_id: {
        required: { value: true, message: 'silahkan pilih departement'}
    },
    bagian_id: {
        required: { value: true, message: 'silahkan pilih bagian'}
    },
    jabatan_id: {
        required: { value: true, message: 'silahkan pilih jabatan'}
    },
    email: {
        required: { value: true, message: 'nama harus diisi.'}, 
        maxLength: { value: 100, message: 'panjang email maksimal 100 karakter.'}
    },
    gender: {
        required: { value: true, message: 'silahkan pilih jenis kelamin'}
    },
    no_ktp: {
        required: { value: true, message: 'no ktp harus diisi'}
    },
    phone_number: {
        required: { value: true, message: 'no telepon harus diisi'}
    },
    religion: {
        required: { value: true, message: 'silahkan pilih agama'}
    },
}

export {rules}