import {useEffect, useState} from 'react'
import {walletStore} from '@/stores/wallet.store'

export function usePrivateKey() {
  const [privateKey, setPrivateKey] = useState('')
  
  useEffect(() => {
    walletStore.getPrivateKey()
      .then(key => {
        setPrivateKey(key)
      })
  }, [])
  
  return privateKey
}
