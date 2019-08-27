import {MyEtherWallet} from '../libs/myetherwallet'

export class WalletStore {
  public wallet: MyEtherWallet
  
  constructor() {}
}

export const walletStore = new WalletStore()
