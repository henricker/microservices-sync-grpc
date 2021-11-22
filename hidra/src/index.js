import path from 'path'
import grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import implementations from './implementations'

require('./database')

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'pb', 'messages.proto'),
  {
    keepCase: true,
    longs: String,
    oneofs: true,
    enums: String,
    defaults: true
  }
)

const proto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

server.addService(proto.UserService.service, implementations)
server.bind('0.0.0.0:3334', grpc.ServerCredentials.createInsecure())
server.start()