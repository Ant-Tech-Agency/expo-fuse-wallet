import Web3 from 'web3'
import Web3FusionExtend, { Web3Fusion } from 'web3-fusion-extend'
import WebsocketProvider from '@/libs/ether-socket-provider'

export class Web3Store {
  public web3: Web3
  public fusion: Web3Fusion

  constructor() {}

  refreshProvider(providerUrl: string) {
    let retries = 0

    const retry = (event?: any) => {
      if (event) {
        console.log('Web3 provider disconnected or errored.')
        retries += 1

        if (retries > 5) {
          console.log(`Max retries of 5 exceeding: ${retries} times tried`)
          return setTimeout(this.refreshProvider, 5000)
        }
      } else {
        console.log(`Reconnecting web3 provider`)
        this.refreshProvider(providerUrl)
      }

      return null
    }

    const provider = new WebsocketProvider(providerUrl)

    provider.on('end', () => retry())
    provider.on('error', () => retry())

    console.log('New Web3 provider initiated')

    this.web3 = new Web3(provider)
    this.fusion = Web3FusionExtend.extend(this.web3)

    return provider
  }

  init() {
    this.refreshProvider('wss://testnetpublicgateway1.fusionnetwork.io:10001')
  }

  get gasPrice() {
    const BN = this.web3.utils.BN as any
    return this.web3.utils.toWei(new BN('100'), 'gwei')
  }
}

export const web3Store = new Web3Store()
