import * as supertest from 'supertest'
import config from '../config/base.config'
import baseConfig from '../config/base.config'
const request = supertest(config.baseUrlCat)

class CategoriesController {
    getCat() {
        return request.get('/categories')
    }

    getCatById(id: string) {
        return request.get('/categories/' + id)
    }

    postCat(data: { [key: string]: string | number }) {
        return request
            .post('/categories')
            .send(data)
    }


    putCatById(id: string, data: { [key: string]: string }) {
        return request
            .put('/categories/' + id)
            .send(data)
    }


    deleteCatById(id: string) {
        return request.delete('/categories/' + id)
    }

}


export default new CategoriesController()