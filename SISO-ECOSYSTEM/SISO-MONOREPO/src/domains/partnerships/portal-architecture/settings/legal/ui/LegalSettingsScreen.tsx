"use client";

import Link from "next/link";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";

const legalDocuments = [
  {
    id: "terms",
    title: "Terms of Service",
    description: "Review our terms and conditions for using the platform",
    href: "#",
    status: "Last updated: Jan 2024"
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "Learn how we collect, use, and protect your data",
    href: "#",
    status: "Last updated: Jan 2024"
  },
  {
    id: "agreement",
    title: "Partner Agreement",
    description: "Understand your rights and responsibilities as a partner",
    href: "#",
    status: "Required for all partners"
  }
];

export function LegalSettingsScreen() {
  return (
    <>
      <style jsx global>{``}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
        compactHeader
        hideHeader
        srTitle="Legal Settings"
      >
        <div className="legal-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Legal Header Card */}
          <div className="relative min-h-[128px]">
            <Link
              href="/partners/settings"
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <HighlightCard
              color="orange"
              className="w-full pl-12 legal-card"
              title="Legal"
              description="Terms, Privacy Policy, and Partner Agreement"
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
              icon={<FileText className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
            />
          </div>

          {/* Legal Documents */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Legal Documents</p>
              <p className="text-xs text-siso-text-muted">Review our terms and policies</p>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <ScrimList className="m-3" ariaLabel="Legal documents list">
                {legalDocuments.map(({ id, title, description, status }) => (
                  <ScrimList.Row key={id}>
                    <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-siso-text-primary">{title}</p>
                      <p className="text-xs text-siso-text-muted">{description}</p>
                      <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{status}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-siso-text-muted" aria-hidden="true" />
                  </ScrimList.Row>
                ))}
              </ScrimList>
            </div>
          </section>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
