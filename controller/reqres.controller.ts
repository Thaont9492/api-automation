import * as supertest from 'supertest'
import config from '../config/base.config'
import baseConfig from '../config/base.config'
const request = supertest(config.baseUrl)

class ReqresController {
    getUsers() {
        return request.get('/users')
    }

    getUserById(id:string) {
        return request.get('/users/' + id)
    }

    postUsers(data: {[key:string]: string | number}) {
        return request
            .post('/users')
            .send(data)
    }

   
    putUserById(id: string, data: {[key:string]: string}) {
        return request
            .put('/users/' + id)
            .send(data)
    }


    deleteUserById(id:string) {
        return request.delete('/users/' + id)
    }

    postRegister(data: {[key:string]: string}) {
        return request
            .post('/register')
            .send(data)
    }
}


export default new ReqresController()