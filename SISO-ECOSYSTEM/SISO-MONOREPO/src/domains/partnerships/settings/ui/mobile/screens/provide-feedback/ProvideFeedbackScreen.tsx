import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { MessageSquare } from "lucide-react";

export function ProvideFeedbackScreen() {
  return (
    <SettingsDetailLayout
      title="Provide Feedback"
      description="Send product ideas, issues, or kudos to the SISO team."
      icon={<MessageSquare className="h-5 w-5 text-siso-orange" />}
    >
      <p>Feedback form will be added here.</p>
    </SettingsDetailLayout>
  );
}
