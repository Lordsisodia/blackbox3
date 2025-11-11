"use client";

export function LegalSettingsScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Legal</h1>
        <p className="text-muted-foreground">
          Terms, Privacy Policy, Partner Agreement
        </p>
      </div>

      {/* TODO: Add links to legal documents */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Terms of Service</h3>
          <a href="#" className="text-blue-600">View Terms →</a>
        </div>
        <div>
          <h3 className="font-semibold">Privacy Policy</h3>
          <a href="#" className="text-blue-600">View Privacy Policy →</a>
        </div>
        <div>
          <h3 className="font-semibold">Partner Agreement</h3>
          <a href="#" className="text-blue-600">View Agreement →</a>
        </div>
      </div>
    </div>
  );
}
