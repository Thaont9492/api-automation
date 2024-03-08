import * as supertest from 'supertest'

const request = supertest('https://jsonplaceholder.typicode.com/')

describe('Execises1', () => {
    let newPost

    describe('Get users', () => {
        it('GET /users', async () => {
            const res = await request.get('/posts')
            expect(res.statusCode).toEqual(200)
            expect(res.body.length).toBeGreaterThan(1)
            //expect(Object.keys(res.body[0])).toEqual(['id', 'name'])
            
        })
    })

    describe('Posts', () => {
        
        it('POST /posts', async () => {
            const data = {
                userId: Math.floor(Math.random() * 11),
                title: 'ThanhThao',
                
            }
            const res = await request
                .post('/posts')
                .send(data)
            expect(res.body.title).toBe(data.title)
            newPost = res.body
            console.log(newPost);
            
        })

        it('GET /posts/{id}', async () => {
            const res = await request.get('/posts/' + newPost.id)
            expect(res.statusCode).toEqual(200)
            expect(res.body.title).toEqual(newPost.title)

        })
    })

    describe('PUT', () => {
        it('PUT /posts/1', async () => {
            const data = {
                title: newPost.title + ' updated',
                }
            
            const res = await request
                .put('/posts/' + newPost.id)
                .send(data)
            
            expect(res.body.title).toBe(data.title)
        })
    })

    describe('DELETE', () => {
        it('ĐELETE /posts/:id', async () => {
            const res = await request.delete('/posts/' + newPost.id)
            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual({})
        })
    })
})
