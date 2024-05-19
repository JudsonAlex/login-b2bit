import * as Yup from 'yup'

export default Yup.object().shape({
    email: Yup.string()
        .email('Email invalido')
        .required('Este campo é obrigatório'),

    password: Yup.string()
        .required('Este campo é obrigatório')
})