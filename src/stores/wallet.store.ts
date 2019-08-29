import {MyEtherWallet} from '@/libs/myetherwallet'
import * as SecureStore from 'expo-secure-store'
import {Account} from 'web3/eth/accounts'
import {web3Store} from '@/stores/web3.store'

export class WalletStore {
  public wallet?: MyEtherWallet
  public account?: Account
  private static PRIVATE_KEY = 'PRIVATE_KEY'
  
  async init(privateKey: string) {
    this.wallet = new MyEtherWallet(privateKey)
    this.account = web3Store.web3.eth.accounts.privateKeyToAccount(this.wallet.privateKeyHex)
    await this.persistPrivateKey(privateKey)
  }
  
  async persistPrivateKey(privateKey: string) {
    try {
      await SecureStore.setItemAsync(WalletStore.PRIVATE_KEY, privateKey)
    } catch (e) {
      return e
    }
  }
  
  async getPrivateKey() {
    try {
      return await SecureStore.getItemAsync(WalletStore.PRIVATE_KEY)
    } catch (e) {
      return e
    }
  }
  
  async deletePrivateKey() {
    try {
      return await SecureStore.deleteItemAsync(WalletStore.PRIVATE_KEY)
    } catch (e) {
      return e
    }
  }
}

export const walletStore = new WalletStore()
