declare module 'web3-fusion-extend' {
  import Web3 from 'web3'

  export type FsnBlockInfo = {
    hash: string
    size: 773
    miner: string
    nonce: string
    number: 329276
    uncles: []
    gasUsed: 21952
    mixHash: string
    gasLimit: 8000000
    extraData: string
    logsBloom: string
    stateRoot: string
    timestamp: 1567053305
    difficulty: string
    parentHash: string
    sha3Uncles: string
    receiptsRoot: string
    transactions: string[]
    totalDifficulty: string
    transactionsRoot: string
  }

  export type FsnTickInfo = {
    retreat: string[]
    selected: string
    ticketNumber: number
  }

  export type FsnBlock = {
    hash: string
    height: number
    recCreated: string
    recEdited: string
    timeStamp: number
    miner: string
    numberOfTransactions: number
    ticketSelected: string
    block: FsnBlockInfo | string
    tickInfo: FsnTickInfo | string
  }

  export type FsnPriceInfo = {
    _id: string
    recCreated: string
    recEdited: string
    price: number
    market_cap: number
    circulating_supply: number
    percentChange1H: number
    percentChange24H: number
    last_updated?: string
    total_supply: number
  }

  export type FsnPrice = {
    priceInfo: FsnPriceInfo
    totalTransactions: number
    totalAssets: number
    lastTwoBlocks: FsnBlock[]
    maxBlock: number
    totalAddresses: number
  }

  export type ReceiptLog = {
    data: string
    topics: string[]
    address: string
    removed: boolean
    logIndex: string
    blockHash: string
    blockNumber: string
    transactionHash: string
    transactionIndex: string
  }

  export type Receipt = {
    to: string
    from: string
    logs: ReceiptLog[]
    status: string
    gasUsed: string
    blockHash: string
    logsBloom: string
    blockNumber: string
    contractAddress?: string
    transactionHash: string
    transactionIndex: string
    cumulativeGasUsed: string
  }

  export type Transaction = {
    r: string
    s: string
    v: string
    to: string
    gas: string
    from: string
    hash: string
    input: string
    nonce: string
    value: string
    topics: string[]
    gasPrice: string
    blockHash: string
    blockNumber: string
    transactionIndex: string
  }

  export type AssetData = {
    ID?: string
    AssetID: string
    CanChange: false
    Decimals: number
    Description: { [key: string]: string } | string
    Name: string
    Symbol: string
    Total: number
  }

  export type Asset = {
    hash: string
    height: number
    timeStamp: number
    recCreated: string
    recEdited: string
    fromAddress: string
    toAddress: string
    fusionCommand: string
    commandExtra: string
    commandExtra2: string
    commandExtra3: string
    swapDeleted: number
    data: AssetData | string
    transaction: Transaction | string
    receipt: Receipt | string
  }

  export interface Web3Fusion {
    version: string
    fsn: {
      getAllBalances(walletAddress: string): Promise<any>
      getBalance(type: string, walletAddress: string): Promise<any>
      signAndTransmit(tx: any, signTx: any): Promise<any>
      genAsset(data: any, pwd: string): Promise<any>
    }
    fsntx: {
      buildGenAssetTx(data: any): Promise<any>
      buildSendAssetTx(data: any): Promise<any>
    }
  }

  export function extend(web3: Web3): Web3Fusion
}
