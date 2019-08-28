declare module 'web3-fusion-extend' {
  import Web3 from 'web3'
  
  export interface Web3Fusion {
    version: string,
    fsn: {
      getAllBalances(walletAddress: string): Promise<any>,
      getBalance(type: string, walletAddress: string): Promise<any>,
      signAndTransmit(tx: any, signTx: any): Promise<any>
      genAsset(data: any, pwd: string): Promise<any>
    },
    fsntx: {
      buildGenAssetTx(data: any): Promise<any>
      buildSendAssetTx(data: any): Promise<any>
    }
  }
  
  export function extend(web3: Web3): Web3Fusion
}
