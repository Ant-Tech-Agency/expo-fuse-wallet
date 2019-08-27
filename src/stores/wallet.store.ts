import {MyEtherWallet} from '@/libs/myetherwallet'
import * as SecureStore from 'expo-secure-store'

export class WalletStore {
  public wallet: MyEtherWallet
  private PRIVATE_KEY = 'PRIVATE_KEY'
  
  constructor() {}
  
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
