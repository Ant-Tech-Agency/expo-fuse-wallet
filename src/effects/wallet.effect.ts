import { walletStore } from '@/stores/wallet.store'
import { web3Store } from '@/stores/web3.store'
import { assetEffect } from "@/effects/asset.effect"
import { BigNumber } from "@/shared/big-number"
import { WalletConstant } from "@/constants/wallet.constant"
import { isString, isNumber } from 'lodash/fp'

export type CreateAssetDto = {
  supply: string
  name: string
  decimals: number
  symbol: string
  canChange: boolean
}

export type SendAssetDto = {
  to: string,
  asset: string,
  amount: string
}

export class WalletEffect {
  async getBalance() {
    try {
      const rawBalance = await web3Store.fusion.fsn.getBalance(
        WalletConstant.FsnTokenAddress,
        walletStore.wallet.address
      )

      return rawBalance / BigNumber.generateDecimal(18)
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
  
  validateCreateAsset(data: CreateAssetDto) {
    if (!data.name) {
      throw new Error('Missing asset name')
    }
  
    if (!data.supply) {
      throw new Error('Missing supply')
    }
  
    if (isNaN(parseInt(data.supply))) {
      throw new Error('Supply is not a number')
    }
  
    if (!data.symbol) {
      throw new Error('Missing symbol')
    }
    
    if (!data.decimals) {
      throw new Error('Missing decimals')
    }
    
    if (isNaN(data.decimals)) {
      throw new Error('Decimals is not a number')
    }
  }
  
  async createAsset({
    supply,
    decimals,
    name,
    symbol,
    canChange = false
  }: CreateAssetDto) {
    try {
      const publicKey = walletStore.wallet.address
  
      const total = new BigNumber(supply, decimals)
  
      const tx = await web3Store.fusion.fsntx
        .buildGenAssetTx({
          from: publicKey,
          name,
          symbol,
          decimals,
          canChange,
          total: total.toHex(),
          description: '{}',
        })

      tx.chainId = WalletConstant.ChainID
      tx.from = publicKey
      tx.gasPrice = web3Store.gasPrice

      return await web3Store.fusion.fsn
        .signAndTransmit(tx, walletStore.account.signTransaction)
    } catch (e) {
      return e
    }
  }
  
  validateSendAsset(data: SendAssetDto) {
    if (!data.to) {
      throw new Error('Missing address')
    }
    
    if (!data.asset) {
      throw new Error('Missing asset')
    }
    
    if (!data.amount) {
      throw new Error('Missing quality')
    }
    
    if (isNaN(parseInt(data.amount))) {
      throw new Error('Quality is not a number')
    }
  }
  
  async sendAsset({
    to,
    asset,
    amount
  }: SendAssetDto) {
    try {
      const publicKey = walletStore.wallet.address
      const assetData = assetEffect.cachedAssets[asset]
      
      if (!assetData) {
        return new Error('Asset was invalid')
      }
      
      const decimals = assetData.Decimals
      const amountBN = new BigNumber(amount, decimals)
      
      const tx = await web3Store.fusion.fsntx.buildSendAssetTx({
        from: walletStore.wallet.address,
        to,
        value: amountBN.toString(),
        asset,
      })
  
      tx.chainId = WalletConstant.ChainID
      tx.from = publicKey
      tx.gasPrice = web3Store.gasPrice
  
      return await web3Store.fusion.fsn.signAndTransmit(tx, walletStore.account.signTransaction)
    } catch (e) {
      return e
    }
  }
}

export const walletEffect = new WalletEffect()
