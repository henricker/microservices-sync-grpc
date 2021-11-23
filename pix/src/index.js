import path from 'path'
import grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import implementations from './implementations'

import './database'

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'pb', 'messages.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const proto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

server.addService(proto.PurchaseService.service, implementations)
server.bind('0.0.0.0:3335', grpc.ServerCredentials.createInsecure())
server.start()
