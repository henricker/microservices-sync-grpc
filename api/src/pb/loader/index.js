import path from 'path'
import grpc from 'grpc'
import * as protoloader from '@grpc/proto-loader'
import { promisify } from 'util'
import protoConfig from '../../config/proto'

export default function load({
  serviceName,
  fileName,
  address,
  credentials = grpc.credentials.createInsecure()
}) {
  const protoDef = protoloader.loadSync(
    path.resolve(__dirname, '..', `${fileName}.proto`),
    protoConfig
  )

  const proto = grpc.loadPackageDefinition(protoDef)
  const client = new proto[serviceName](address, credentials)


  Object.entries(client.__proto__).map(([prop, value]) => {
    if(value.originalName !== undefined)
      client[prop] = promisify(value)
  })

  return client
}