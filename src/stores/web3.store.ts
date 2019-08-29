import Web3 from 'web3'
import Web3FusionExtend, {Web3Fusion} from 'web3-fusion-extend'
import WebsocketProvider from '@/libs/ether-socket-provider'

export class Web3Store {
  public web3: Web3
  public fusion: Web3Fusion
  public BN: any
  
  constructor() {}
  
  init() {
    const provider = new WebsocketProvider(
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
    this.BN = web3Store.web3.utils.BN
  }
  
  makeBigNumber(amount: string, decimals: number) {
    try {
      let _tmp = 0
      if (amount.substr(0, 1) == '.') {
        amount = '0' + amount
      }
      const pieces = amount.split('.')
      if (pieces.length === 1) {
        _tmp = parseInt(amount)
        if (isNaN(_tmp) || _tmp < 0) {
          return
        }
        amount = new this.BN(amount + '0'.repeat(decimals))
      } else if (pieces.length > 2) {
        console.log('error')
        return
      } else if (pieces[1].length >= decimals) {
        console.log('error')
        return // error
      } else {
        const dec = parseInt(pieces[1])
        let reg = new RegExp('^\\d+$') // numbers only
        if (isNaN(dec) || dec < 0 || !reg.test(pieces[1])) {
          console.log('error')
          return
        }
        const decimalsLength = decimals - pieces[1].length
        _tmp = parseInt(pieces[0])
        if (isNaN(_tmp) || _tmp < 0) {
          console.log('error')
          return
        }
        amount = new this.BN(amount + dec + '0'.repeat(decimalsLength))
      }
      
      return amount
    } catch (err) {
      return err
    }
  }
  
  transformToHex(value: number) {
    return '0x' + value.toString(16)
  }
  
  get gasPrice() {
    return this.web3.utils.toWei(new this.BN(100), 'gwei' as any).toString()
  }
}

export const web3Store = new Web3Store()
