import * as supertest from 'supertest'
import config from '../config/base.config'
import baseConfig from '../config/base.config'
const request = supertest(config.baseUrlCat)

class UploadController {
    postUploadSingle(filepath: string) {
        return request
            .post('/upload/single')
            .attach('single', filepath)
    }

    postUploadMultiple(files: string[]) {
        const req =  request
            .post('/upload/multiple')

        files.forEach(file => {
            req
                .attach('multiple', file)
        })
        return req
    }

}
export default new UploadController()