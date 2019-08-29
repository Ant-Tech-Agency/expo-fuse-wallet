import { walletStore } from '@/stores/wallet.store'
import { web3Store } from '@/stores/web3.store'
import { assetEffect } from "@/effects/asset.effect"

export class WalletEffect {
  static readonly FSN_TOKEN_ADDRESS =
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  
  readonly CHAIN_ID = 46688
  
  async getBalance() {
    try {
      const rawBalance = await web3Store.fusion.fsn.getBalance(
        WalletEffect.FSN_TOKEN_ADDRESS,
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

  static normalizeBalance(decimal: number) {
    let returnDecimals = '1'
    for (let i = 0; i < decimal; i++) {
      returnDecimals += '0'
    }

    return parseInt(returnDecimals)
  }
  
  
  async createAsset({
    supply,
    decimals,
    name,
    symbol,
    canChange = false
  }: {
    supply: string
    name: string
    decimals: number
    symbol: string
    canChange: boolean
  }) {
    try {
      const publicKey = walletStore.wallet.address
  
      const totalSupplyBN = web3Store.makeBigNumber(supply, decimals)
      const totalSupplyBNHex = web3Store.transformToHex(totalSupplyBN)
      console.log(totalSupplyBNHex)
  
      const tx = await web3Store.fusion.fsntx
        .buildGenAssetTx({
          from: publicKey,
          name,
          symbol,
          decimals,
          canChange,
          total: totalSupplyBNHex,
          description: '{}',
        })
  
      tx.chainId = 46688
      tx.from = publicKey
      tx.gasPrice = web3Store.gasPrice
      
      console.log(tx.gasPrice)
  
      const txHash = await web3Store.fusion.fsn
        .signAndTransmit(tx, walletStore.account.signTransaction)
  
      alert(txHash)
    } catch (e) {
      alert(e && e.message)
    }
  }
  
  async sendAsset({
    to,
    asset,
    amount
  }: {
    to: string,
    asset: string,
    amount: string
  }) {
    try {
      const publicKey = walletStore.wallet.address
      const assetData = assetEffect.cachedAssets[asset]
      
      if (!assetData) {
        alert('Asset invalid')
        return
      }
      
      const decimals = assetData.Decimals
      const amountBN = web3Store.makeBigNumber(amount, decimals)
      
      const tx = await web3Store.fusion.fsntx.buildSendAssetTx({
        from: walletStore.wallet.address,
        to,
        value: amountBN.toString(),
        asset,
      })
  
      tx.chainId = 46688
      tx.from = publicKey
      tx.gasPrice = web3Store.gasPrice
      
      const txHash = await web3Store.fusion.fsn.signAndTransmit(tx, walletStore.account.signTransaction)
  
      alert(txHash)
    } catch (e) {
      alert(e && e.message)
    }
  }
}

export const walletEffect = new WalletEffect()
