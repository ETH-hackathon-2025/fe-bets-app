"use client"
// Extends WindowEventMap interface, including a custom event eip6963:announceProvider.
declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

// Array that stores detected wallet providers and their details.
let providers: EIP6963ProviderDetail[] = []

// Object containing two methods. The store holds the state of detected Ethereum wallet providers.
// It's implemented as an external store, making it available for subscription and synchronization
// across the dapp.
export const store = {
  // Returns the current state of providers.
  value: () => providers,
  // Subscribes to provider announcements and updates the store accordingly.
  // Takes a callback function to be invoked on each store update, returning a function to
  // unsubscribe from the event.
  subscribe: (callback: () => void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      const provider = event.detail

      // Пропускаем Phantom
      if (provider.info.name === 'Phantom') return

      if (providers.map((p) => p.info.uuid).includes(provider.info.uuid)) return

      providers = [...providers, provider]
      callback()
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement)
    window.dispatchEvent(new Event("eip6963:requestProvider"))

    return () =>
      window.removeEventListener("eip6963:announceProvider", onAnnouncement)
  }
}
