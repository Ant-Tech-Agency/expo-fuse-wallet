import { web3Store } from '@/stores/web3.store'
import { walletStore } from '@/stores/wallet.store'

// export const createAsset = async (totalSupBNHex, assetName) => {
//   try {
//     const BN = web3Store.web3.utils.BN as any
//     const privateKey = await walletStore.getPrivateKey()
//     const publicKey = walletStore.wallet.address
//     const account: any = web3Store.web3.eth.accounts.privateKeyToAccount(
//       '0x' + privateKey
//     )
//     const gasPrice = web3Store.web3.utils.toWei(new BN(100), 'gwei' as any)
//     const data = {
//       from: publicKey,
//       name: assetName,
//       symbol: 'VTV3',
//       decimals: 18,
//       total: totalSupBNHex,
//       description: '{}',
//       canChange: false,
//     }
//     const tx = await web3Store.fusion.fsntx.buildGenAssetTx(data)
//     tx.form = publicKey
//     tx.chainId = 46688
//     tx.gasPrice = gasPrice.toString()
//     const result = await web3Store.fusion.fsn.signAndTransmit(
//       tx,
//       account.signTransaction
//     )
//     console.log(result)
//     alert(result)
//   } catch (e) {
//     console.log(e)
//   }
// }

export const sendAsset = async (amount, toAddress, pickedAsset) => {
  try {
    const privateKey = await walletStore.getPrivateKey()
    const account: any = web3Store.web3.eth.accounts.privateKeyToAccount(
      '0x' + privateKey
    )
    const data = {
      from: walletStore.wallet.address,
      to: toAddress,
      value: amount.toString(),
      asset: pickedAsset.AssetID,
    }
    const tx = await web3Store.fusion.fsntx.buildSendAssetTx(data)
    tx.from = walletStore.wallet.address
    tx.chainId = 46688
    const result = await web3Store.fusion.fsn.signAndTransmit(
      tx,
      account.signTransaction
    )
    alert(result)
  } catch (e) {
    console.log(e)
  }
}
