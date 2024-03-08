import controller from '../controller/reqres.controller'
import config from '../config/base.config'

//Get All User in page 1 and user id
describe('Get User', () => {
    it('GET List User in page 1', async () => {
        const res = await controller.getUsers()
        expect(res.statusCode).toEqual(200)
        expect(res.body.data.length).toBeGreaterThan(1)
        expect(Object.keys(res.body.data[0])).toEqual(['id', 'email', 'first_name', 'last_name', 'avatar'])
    })

    it('GET user/:id', async () => {
        const res = await controller.getUserById('2')
        console.log(res.body);

        expect(res.statusCode).toEqual(200)
    })

    it('GET SINGLE USER NOT FOUND', async () => {
        const res = await controller.getUserById('13')
        console.log(res.body)
        expect(res.statusCode).toEqual(404)
    })
})

//POST - Create User
describe('POST - Create User', () => {
    let newUser
    const data = {
        name: 'Thao' + config.name,
        job: config.job
    }
    beforeAll(async() => {
        newUser = await controller.postUsers(data)
    })

    it('POST /user', async () => {
        
        expect(newUser.statusCode).toEqual(201)

        expect(newUser.body.name).toBe(data.name)
        expect(Object.keys(newUser.body)).toEqual(['name', 'job', 'id', 'createdAt'])

    })

})

//PUT - Patch
describe('PUT /users/2', () => {
    let newUser
    const data = {
        name: config.name + 'updated',
        job: config.job
    }
    beforeAll(async () => {
        newUser = await controller.putUserById('2', data)
    })

    it('PUT - update user 2', async () => {
        expect(newUser.statusCode).toEqual(200)
        expect(newUser.body.name).toBe(data.name)
    })
})

//POST - REGISTER
describe('POST Register', () => {
    let postUser
    beforeAll(async () => {
        const data = {
            email: config.email, 
            password: config.password        
        }

        postUser = await controller.postRegister(data)

    })
    it('POST - Register successful', async () => {

        expect(postUser.statusCode).toEqual(200)
        expect(Object.keys(postUser.body)).toEqual(['id', 'token'])
    })

    it('POST - Register unsuccessful', async () => {
        const data = {
            email: config.email
        }

        const res = await controller.postRegister(data)

        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual('Missing password')
    })
})

//DELETE USER
describe('DELETE User 2', () => {
    it('DELETE /users/:id', async () => {
        const res = await controller.deleteUserById('2')
        expect(res.statusCode).toEqual(204)
        expect(res.body).toEqual({})
    })
})


