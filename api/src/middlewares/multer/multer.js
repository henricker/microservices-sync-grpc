import Multer from 'multer'

const storage = Multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'uploads')  
  },
  filename: (request, file, callback) => {
    callback(null, `${Date.now().toString()}-${file.originalname}`)
  }
})

export const multerMiddleware = new Multer({ storage })