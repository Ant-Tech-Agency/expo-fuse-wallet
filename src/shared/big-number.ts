import BN from "bn.js"

export class BigNumber {
  private readonly _data?: BN
  
  constructor(amount: string, decimals: number) {
    this._data = BigNumber.makeBigNumber(amount, decimals)
  }
  
  static generateDecimal(decimal: number) {
    let returnDecimals = '1'
    for (let i = 0; i < decimal; i++) {
      returnDecimals += '0'
    }
    
    return parseInt(returnDecimals)
  }
  
  static isNegativeNumber(value: string) {
    const _tmp = parseInt(value)
    
    return isNaN(_tmp) || _tmp < 0
  }
  
  static makeBigNumber(amount: string, decimals: number): BN {
    try {
      if (amount.substr(0, 1) == '.') {
        amount = '0' + amount
      }
      const pieces = amount.split('.')
      if (pieces.length === 1) {
        if (BigNumber.isNegativeNumber(amount)) {
          return
        }
        return new BN(amount + '0'.repeat(decimals))
      }
      
      if (pieces.length > 2) {
        return
      }
      
      if (pieces[1].length >= decimals) {
        return // error
      }
      
      const dec = parseInt(pieces[1])
      const regex = new RegExp('^\\d+$') // numbers only
      if (isNaN(dec) || dec < 0 || !regex.test(pieces[1])) {
        return
      }
      
      const decimalsLength = decimals - pieces[1].length
      
      if (BigNumber.isNegativeNumber(pieces[0])) {
        return
      }
      
      return new BN(amount + dec + '0'.repeat(decimalsLength))
    } catch (err) {
      return err
    }
  }
  
  toHex() {
    return '0x' + this._data.toString(16)
  }
  
  toString() {
    return this._data.toString()
  }
}
