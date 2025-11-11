"use client";

export function GeneralSettingsScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">General Settings</h1>
        <p className="text-muted-foreground">
          Quick access to theme, notifications, language
        </p>
      </div>

      {/* TODO: Add quick settings cards that link to detailed pages */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded">Appearance</div>
        <div className="p-4 border rounded">Language</div>
        <div className="p-4 border rounded">Notifications</div>
        <div className="p-4 border rounded">Integrations</div>
      </div>
    </div>
  );
}
