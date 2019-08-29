import { getFsnPrice, getAssets } from '@/services/fusion.service'
import { AsyncStorage } from 'react-native'
import { AssetData } from 'web3-fusion-extend'

export type CachedAsset = { [key: string]: AssetData }

const defaultCachedAssets: CachedAsset = {
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff': {
    AssetID:
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    CanChange: false,
    Decimals: 18,
    Description: '',
    ID: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    Name: 'FUSION',
    Symbol: 'FSN',
    Total: 81920000000000000000000000,
  },
  '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe': {
    AssetID:
      '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
    CanChange: false,
    Decimals: 0,
    Description: '',
    ID: '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
    Name: 'USAN',
    Symbol: '',
    Total: 0,
  },
}

export class AssetEffect {
  private _cachedAssets: CachedAsset = {}
  public static CACHED_ASSETS = 'CACHED_ASSETS'
  
  constructor() {
    this.getCachedAssets()
      .then(data => {
        this._cachedAssets = data
      })
      .catch(err => {
        console.log(err)
      })
  }

  get cachedAssets(): CachedAsset {
    return this._cachedAssets
  }

  set cachedAssets(value: CachedAsset) {
    AsyncStorage.setItem(AssetEffect.CACHED_ASSETS, JSON.stringify(value))
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })

    this._cachedAssets = Object.assign({}, defaultCachedAssets, value)
  }
  
  async getCachedAssets() {
    try {
      const data = await AsyncStorage.getItem(AssetEffect.CACHED_ASSETS)
  
      if (data) {
        this.cachedAssets = JSON.parse(data)
      } else {
        this.cachedAssets = {}
      }
  
      return this.cachedAssets
    } catch (e) {
      return e
    }
  }

  async getAssets() {
    try {
      const cachedAssets: CachedAsset = {}
      const resFsn = await getFsnPrice()
      const totalAssets = resFsn.data.totalAssets
      const promises = []

      for (let i = 0; i < Math.ceil(totalAssets / 100); i++) {
        promises.push(getAssets(i))
      }

      const resAssets = await Promise.all(promises)

      for (let i = 0; i < resAssets.length; i++) {
        const assets = resAssets[i].data
        assets.forEach(asset => {
          const data = JSON.parse(asset.data)
          data.ID = data.AssetID
          data.Owner = data.fromAddress

          cachedAssets[data.AssetID] = data
        })
      }
      
      this.cachedAssets = cachedAssets

      return this.cachedAssets
    } catch (e) {
      console.log(e)
    }
  }
  
}

export const assetEffect = new AssetEffect()
