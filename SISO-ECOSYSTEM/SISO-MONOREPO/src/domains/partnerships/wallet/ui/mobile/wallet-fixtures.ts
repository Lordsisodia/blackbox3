export interface WalletEntry {
  id: string;
  label: string;
  amount: string;
  status: "Scheduled" | "Sent" | "Failed";
}

export const mockWalletEntries: WalletEntry[] = [
  { id: "payout-1", label: "MTD Commission", amount: "$3,250", status: "Scheduled" },
  { id: "payout-2", label: "October Payout", amount: "$8,420", status: "Sent" },
  { id: "payout-3", label: "Dispute Hold", amount: "$620", status: "Failed" },
];
