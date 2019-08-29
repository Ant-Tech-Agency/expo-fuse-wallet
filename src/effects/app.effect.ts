import { walletStore } from "@/stores/wallet.store"

export class AppEffect {
  async logout() {
    await walletStore.deletePrivateKey()
  }
}

export const appEffect = new AppEffect()
