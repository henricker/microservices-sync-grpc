import load from '../pb/loader'

const NixClient = load({
  serviceName: 'PurchaseService',
  address: 'localhost:3335',
  fileName: 'nix'
})

export default NixClient