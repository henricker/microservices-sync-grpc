import load from '../pb/loader'

const HidraClient = load({
  serviceName: 'UserService',
  address: 'localhost:3334',
  fileName: 'hidra'
})

export default HidraClient