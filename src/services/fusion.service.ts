import { api } from '@/services/base.service'
import { AxiosResponse } from 'axios'
import { Asset, FsnPrice } from 'web3-fusion-extend'

export const getFsnPrice = (): Promise<AxiosResponse<FsnPrice>> =>
  api.get('/fsnprice')

export const getAssets = async (
  index: number
): Promise<AxiosResponse<Asset[]>> =>
  api.get(`/assets/all?page=${index}&size=100`)
