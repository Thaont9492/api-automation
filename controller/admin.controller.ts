import * as supertest from 'supertest'
import config from '../config/base.config'
import baseConfig from '../config/base.config'
const request = supertest(config.baseUrlCat)

class AdminController {

    postLogin(data: { [key: string]: string }) {
        return request
            .post('/admin/login')
            .send(data)
    }

}


export default new AdminController()