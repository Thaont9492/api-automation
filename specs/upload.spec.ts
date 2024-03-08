import controller from '../controller/upload.controller'

//POST - UPLOAD FILE
describe('Upload file', () => {
    it('POST /upload/single', async() => {
        const res = await controller.postUploadSingle('data/5M.jpg')
        console.log(res.body)

        expect(res.statusCode).toEqual(200)
        expect(res.body.filename).toEqual('5M.jpg')
    })

    it('POST /upload/multiple', async() => {
        const files = [
            'data/5M.jpg',
            'data/11M.jpg'
        ]
        
        const res = await controller.postUploadMultiple(files)
        console.log(res.body)

        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toBe(2)
        expect(res.body[0].filename).toEqual('5M.jpg')
        expect(res.body[1].filename).toEqual('11M.jpg')
    })
})



