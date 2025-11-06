export function SettingsPanel() {
  return (
    <section className='flex flex-1 flex-col gap-4 px-4 py-6 text-sm text-siso-text-secondary'>
      <header className='space-y-1'>
        <h2 className='text-lg font-semibold text-siso-text-primary'>Settings</h2>
        <p className='text-xs text-siso-text-muted'>Notifications · Connected Devices · Provide Feedback · Logout</p>
      </header>
      <article className='rounded-3xl border border-siso-border bg-siso-bg-secondary p-4'>
        <p>Use this panel to configure alerts, session management, and feature previews.</p>
      </article>
    </section>
  );
}
