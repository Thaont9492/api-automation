import controller from '../controller/categories.controller'
import { login } from '../utils/helper.ts'
import config from '../config/base.config'

//Get All Categories and by ID
describe('Get Categories', () => {
    it('GET List Categories', async () => {
        const res = await controller.getCat()
        expect(res.statusCode).toEqual(200)
        expect(res.body.data.length).toBeGreaterThan(1)
        expect(Object.keys(res.body.data[0])).toEqual(['_id', 'name'])
    })

    it('GET categories/:id', async () => {
        const res = await controller.getCatById('2')
        console.log(res.body);

        expect(res.statusCode).toEqual(200)
    })

    it('GET Categories not in list', async () => {
        const res = await controller.getCatById('13')
        console.log(res.body)
        expect(res.statusCode).toEqual(404)
    })
})

//POST - Create Categories
describe('POST - Create Categories', () => {
    let token 
    
    beforeAll(async() => {
        // const data = {
        //     email: config.login_email,
        //     password: config.login_pass
        // }

        // const res = await login.postLogin(data)
        // token = res.body.token

        token = await login(config.email, config.password)
            
    })

    it('POST /categories', async () => {
        const body = {
            name: 'Thao' + config.name,
        }
        const res = await controller
            .postCat(body)
            .set('Authorization', 'Bearer ' + token)
        expect(res.statusCode).toEqual(200)

        expect(res.body.name).toBe(body.name)
        expect(Object.keys(res.body)).toEqual(['name','_id', '__v'])

    })

})

//PUT - Patch
describe('PUT /categories/:id', () => {
    let token, postRes 
    
    beforeAll(async() => {
        token = await login(config.email, config.password)
            
        const data1 = {
            name: 'Thao' + config.name,
        }
        postRes = await controller
            .postCat(data1)
            .set('Authorization', 'Bearer ' + token)
    })

   
    it('PUT - update categories', async () => {
        const data = {
            name: config.name + 'updated',
        }
        const res = await controller
            .putCatById(postRes.body._id, data)
            .set('Authorization', 'Bearer ' + token)

        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toBe(data.name)
    })
})


//DELETE USER
describe('DELETE Categories by ID', () => {
    let token, postRes 
    
    beforeAll(async() => {
        token = await login(config.email, config.password)
            
        const data2 = {
            name: 'Thao' + config.name,
        }
        postRes = await controller
            .postCat(data2)
            .set('Authorization', 'Bearer ' + token)
    })
    it('DELETE /categories/:id', async () => {
        const res = await controller
            .deleteCatById(postRes.body._id)
            .set('Authorization', 'Bearer ' + token)
        expect(res.statusCode).toEqual(200)
    })
})


