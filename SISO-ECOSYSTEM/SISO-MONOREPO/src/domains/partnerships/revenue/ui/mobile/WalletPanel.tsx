import { mockWalletEntries } from './wallet-fixtures';

export function WalletPanel() {
  return (
    <section className='flex flex-1 flex-col gap-4 px-4 py-6'>
      <header className='space-y-1'>
        <h2 className='text-2xl font-semibold text-siso-text-primary'>Wallet</h2>
        <p className='text-sm text-siso-text-muted'>Track payouts and balances powered by Revenue stage data.</p>
      </header>
      <div className='space-y-3'>
        {mockWalletEntries.map((entry) => (
          <article key={entry.id} className='rounded-3xl border border-siso-border bg-siso-bg-secondary p-4'>
            <header className='mb-2 flex items-center justify-between text-xs text-siso-text-muted'>
              <span>{entry.label}</span>
              <span>{entry.status}</span>
            </header>
            <p className='text-lg font-semibold text-siso-text-primary'>{entry.amount}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
