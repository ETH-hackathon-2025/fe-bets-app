"use client"
import { useState } from "react"
import { ConnectWallet } from "../ConnectWallet"
import { Logo } from "../Logo"

export const Header = () => {
  const [userAccount, setUserAccount] = useState<string>("")
  return (
    <div className="h-[113px] w-[100%] flex justify-center items-center bg-[black]  ">
      <div className="w-[90%] flex justify-between">
        <Logo />
        <ConnectWallet userAccount={userAccount} setUserAccount={setUserAccount} />
      </div>

    </div>
  )
}
