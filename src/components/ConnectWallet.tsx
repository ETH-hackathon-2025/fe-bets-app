"use client"
import { useSyncProviders } from "@/hoooks/useSyncProviders"
import { useState } from "react"
import { Wallet } from "./Wallet"

export interface ConnectWalletProps {
  userAccount: string
  setUserAccount: React.Dispatch<React.SetStateAction<string>>
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ userAccount, setUserAccount }) => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const providers = useSyncProviders()

  const [errorMessage, setErrorMessage] = useState("")
  const clearError = () => setErrorMessage("")
  const setError = (error: string) => setErrorMessage(error)
  const isError = !!errorMessage

  // Display a readable user address.

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts"
      }) as string[]

      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    } catch (error) {
      console.error(error)
      const mmError: MMError = error as MMError
      setError(`Code: ${mmError.code} \nError Message: ${mmError.message}`)
    }
  }
  return (
    <div className="App">
      {!userAccount &&
        <div className="providers">
          {
            providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
              <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
                <img src={provider.info.icon} alt={provider.info.name} />
                <div>{provider.info.name}</div>
              </button>
            )) :
              <div>
                No Announced Wallet Providers
              </div>
          }
        </div>
      }
      <Wallet userAccount={userAccount} selectedWallet={selectedWallet} />
      <div className="mmError" style={isError ? { backgroundColor: "brown" } : {}}>
        {isError &&
          <div onClick={clearError}>
            <strong>Error:</strong> {errorMessage}
          </div>
        }
      </div>
    </div>
  )
}
