import HidraService from '../services/hidra'
import fs from 'fs'
import path from 'path'

class FileUploaderController {
  async upload(request, response) {
    const file = { ...request.file, url: `http://localhost:3333/files/${request.file.filename}` }

    var bytes = new Uint8Array(1024);

    const stream = fs.createReadStream(path.resolve(__dirname, '..', '..', 'uploads', file.filename))
    const serviceCall = HidraService.avatarUpload((err, resolve) => console.log(err ? err : resolve ))
    
    console.log(serviceCall)

    serviceCall.write({
      metadata: {
        filename: file.filename,
        mimetype: file.mimetype
      }
    })

    stream.on('data', (chunck) => {
      file: Uint8Array.from(chunck)
    })

    stream.on('end', () => {
      fs.rm(path.resolve(__dirname, '..', '..', 'uploads', file.filename))
      return response.json(file)
    })
  }
}

export const fileUploaderController = new FileUploaderController()