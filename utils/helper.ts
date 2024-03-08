import adminController from '../controller/admin.controller'


export const login = async (email: string, password: string) => {
    const data = {
        "email": email,
        "password": password
    }

    const res = await adminController.postLogin(data)
    return res.body.token
}


