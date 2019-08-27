import Web3 from 'web3'
import Web3FusionExtend, {Web3Fusion} from 'web3-fusion-extend'

export class Web3Store {
  public web3: Web3
  public fusion: Web3Fusion
  
  constructor() {}
  
  init() {
    const provider = new Web3.providers.WebsocketProvider(
      'wss://testnetpublicgateway1.fusionnetwork.io:10001'
    )
  
    provider.on('data', () => {
      console.log('connected')
    })
  
    provider.on('error', () => {
      console.log('error')
    })
  
    this.web3 = new Web3(provider)
    this.fusion = Web3FusionExtend.extend(this.web3)
  }
}

export const web3Store = new Web3Store()
