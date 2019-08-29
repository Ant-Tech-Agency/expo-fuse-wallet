import * as ethUtil from 'ethereumjs-util'

export class MyEtherWallet {
  readonly privateKey: string
  private readonly privateKeyRaw: Buffer
  private readonly publicKeyRaw: Buffer
  private readonly prefix = '0x'
  
  constructor(
    privateKey: string,
    publicKey?: string
  ) {
    this.privateKeyRaw = new Buffer(privateKey, 'hex')
    this.privateKey = privateKey
    
    if (publicKey) {
      this.publicKeyRaw = new Buffer(publicKey, 'hex')
    }
  }
  
  get addressRaw() {
    if (this.privateKeyRaw) {
      return ethUtil.privateToAddress(this.privateKeyRaw)
    }
    
    if (this.publicKeyRaw) {
      return ethUtil.publicToAddress(this.publicKeyRaw, true)
    }
    
    return ''
  }
  
  get address() {
    return this.prefix + this.addressRaw.toString('hex')
  }
  
  get privateKeyHex() {
    return '0x' + this.privateKey
  }
  
  get checksumAddress() {
    return ethUtil.toChecksumAddress(this.address)
  }
}
