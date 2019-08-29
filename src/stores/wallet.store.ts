import {MyEtherWallet} from '@/libs/myetherwallet'
import * as SecureStore from 'expo-secure-store'
import {Account} from 'web3/eth/accounts'
import {web3Store} from '@/stores/web3.store'

export class WalletStore {
  public wallet?: MyEtherWallet
  public account?: Account
  private PRIVATE_KEY = 'PRIVATE_KEY'
  
  async init(privateKey: string) {
    this.wallet = new MyEtherWallet(privateKey)
    this.account = web3Store.web3.eth.accounts.privateKeyToAccount(this.wallet.privateKeyHex)
    await this.persistPrivateKey(privateKey)
  }
  
  async persistPrivateKey(privateKey: string) {
    try {
      await SecureStore.setItemAsync(this.PRIVATE_KEY, privateKey)
    } catch (e) {
    
    }
  }
  
  async getPrivateKey() {
    try {
      return await SecureStore.getItemAsync(this.PRIVATE_KEY)
    } catch (e) {
    
    }
  }
  
  async deletePrivateKey() {
    try {
      return await SecureStore.deleteItemAsync(this.PRIVATE_KEY)
    } catch (e) {
    
    }
  }
}

export const walletStore = new WalletStore()
