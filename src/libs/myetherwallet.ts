import * as ethUtil from 'ethereumjs-util'

export class MyEtherWallet {
  private readonly privateKey: Buffer
  private readonly publicKey: Buffer
  private readonly prefix = '0x'
  
  constructor(
    privateKey: string,
    publicKey?: string
  ) {
    this.privateKey = new Buffer(privateKey, 'hex')
    
    if (publicKey) {
      this.publicKey = new Buffer(publicKey, 'hex')
    }
  }
  
  static fixPrivateKey(key: string) {
    if (key.indexOf("0x") === 0) {
      return key.slice(2);
    }
    
    return key
  }
  
  get addressRaw() {
    if (!this.publicKey) {
      return ethUtil.privateToAddress(this.privateKey as Buffer)
    }
    
    return ethUtil.publicToAddress(this.publicKey, true)
  }
  
  get address() {
    return this.prefix + this.addressRaw.toString('hex')
  }
  
  get checksumAddress() {
    return ethUtil.toChecksumAddress(this.address)
  }
  
  
}
