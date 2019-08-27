import {walletStore} from '../stores/wallet.store'
import {web3Store} from '../stores/web3.store'

export class WalletEffect {
  async balance() {
    try {
      return await web3Store.fusion.fsn
        .getBalance(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          walletStore.wallet.address
        )
    } catch (e) {
    
    }
  }
}

export const walletEffect = new WalletEffect()
