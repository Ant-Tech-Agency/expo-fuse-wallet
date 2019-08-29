import { walletStore } from '@/stores/wallet.store'
import { web3Store } from '@/stores/web3.store'
type Data = {
  from: string
  name: string
  symbol: string
  decimals: number
  total: string
  description: object
  canChange: boolean
  chainId: number
  gasPrice: string
}

export class WalletEffect {
  readonly FSN_TOKEN_ADDRESS =
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  readonly CHAIN_ID: number = 46688
  private privateKey: string = walletStore.wallet.address
  private publicKey: string = walletStore.wallet.address
  private account: any = web3Store.web3.eth.accounts.privateKeyToAccount(
    '0x' + this.privateKey
  )

  private gasPrice: string = web3Store.web3.utils
    .toWei(new BN(100), 'gwei' as any)
    .toString()

  private dataAsset: Data = null

  async getBalance() {
    try {
      const rawBalance = await web3Store.fusion.fsn.getBalance(
        this.FSN_TOKEN_ADDRESS,
        walletStore.wallet.address
      )

      return rawBalance / WalletEffect.normalizeBalance(18)
    } catch (e) {
      return e
    }
  }

  async getAllBalances() {
    try {
      return await web3Store.fusion.fsn.getAllBalances(
        walletStore.wallet.address
      )
    } catch (e) {
      return e
    }
  }

  async createAsset(data: Data) {
    try {
      const BN = web3Store.web3.utils.BN as any
      const publicKey = walletStore.wallet.address
      const gasPrice = web3Store.web3.utils.toWei(new BN(100), 'gwei' as any)

      const tx = await web3Store.fusion.fsntx.buildGenAssetTx({
        from: this.publicKey,
        ...data,
      })

      tx.form = publicKey
      tx.chainId = 46688
      tx.gasPrice = gasPrice.toString()

      const result = await web3Store.fusion.fsn.signAndTransmit(
        tx,
        this.account.signTransaction
      )

      return result
    } catch (e) {
      return e
    }
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
