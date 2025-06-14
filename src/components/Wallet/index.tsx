import { formatAddress } from "@/utils/formaterToAddress"


export interface WalletProps {
  userAccount: string | undefined
  selectedWallet: any

}

export const Wallet: React.FC<WalletProps> = ({ userAccount, selectedWallet }) => {
  if (!userAccount) return null;

  return (
    <div className="selectedWallet">
      <div className="text-[23px] text-[white]">({formatAddress(userAccount)})</div>
    </div>
  );
};
