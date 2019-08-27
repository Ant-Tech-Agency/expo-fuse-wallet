declare module 'web3-fusion-extend' {
  import Web3 from 'web3'
  
  export interface Web3Fusion {
    version: string
    fsn: {
      getBalance(type: string, walletAddress: string): Promise<any>
    }
  }
  
  export function extend(web3: Web3): Web3Fusion
}
