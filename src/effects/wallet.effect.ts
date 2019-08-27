import {walletStore} from '@/stores/wallet.store'
import {web3Store} from '@/stores/web3.store'

export class WalletEffect {
  readonly FSN_TOKEN_ADDRESS = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  
  async getBalance() {
    try {
      const rawBalance = await web3Store.fusion.fsn
        .getBalance(
          this.FSN_TOKEN_ADDRESS,
          walletStore.wallet.address
        )
      
      return rawBalance / WalletEffect.normalizeBalance(18)
    } catch (e) {
    
    }
  }
  
  async getAllBalances() {
    try {
      return await web3Store.fusion.fsn
        .getAllBalances(walletStore.wallet.address)
    } catch (e) {
    
    }
  }
  
  async createAsset() {
    const data = {
      canChange: false,
      decimals: 18,
      description: JSON.stringify({
        nice: '10',
        good: '5'
      }),
      from: "0x02b0a51473e9076ae2667b536f9b11077a50b791",
      name: 'linh-human-token',
      symbol: 'LHT',
      total: "0x472698b413b43200000"
    }
    const tx = await web3Store.fusion.fsntx.buildGenAssetTx(data)
    
    tx.chainId = 46688
    const gasPrice = web3Store.web3.utils.toWei(new web3Store.web3.utils.BN(100), 'gwei' as any)
    tx.gasPrice = gasPrice.toString()
    
//    await web3Store.fusion.fsn.signAndTransmit(tx, )
  }
  
  static normalizeBalance(decimal: number) {
    let returnDecimals = '1'
    for (let i = 0; i < decimal; i++) {
      returnDecimals += '0'
    }
    
    return parseInt(returnDecimals)
  }
}

export const walletEffect = new WalletEffect()
