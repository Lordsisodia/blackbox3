import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { Sparkles } from "lucide-react";

export function WhatsNewScreen() {
  return (
    <SettingsDetailLayout
      title="What’s New"
      description="Release notes and feature previews."
      icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
    >
      <p>Roadmap and release notes will show up here.</p>
    </SettingsDetailLayout>
  );
}
