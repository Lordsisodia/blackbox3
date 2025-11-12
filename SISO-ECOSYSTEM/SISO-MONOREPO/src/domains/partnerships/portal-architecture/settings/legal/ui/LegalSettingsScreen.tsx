"use client";

import Link from "next/link";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";

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
      <style jsx global>{`
        div[aria-hidden="true"] {
          display: none !important;
        }
        /* Match top padding to side padding */
        section[class*="flex flex-1 flex-col gap-4 px-4 pt-8"] {
          padding-top: 1rem !important;
        }
        /* Hide HighlightCard divider and bottom section when empty */
        .legal-card [style*="background-image"] > div > div > div.my-4.h-px.w-full.bg-white\/20 {
          display: none !important;
        }
        .legal-card [style*="background-image"] > div > div > div.flex.items-end.justify-between {
          display: none !important;
        }
        .legal-card [style*="background-image"] > div > div > div.flex.h-full.flex-col.justify-between {
          justify-content: flex-start !important;
        }
        /* Alternative targeting */
        .legal-card div[class*="my-4"] {
          display: none !important;
        }
        .legal-card div[class*="items-end"] {
          display: none !important;
        }
      `}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
      >
        <div className="space-y-4 pb-32 text-siso-text-primary">
          {/* Legal Header Card */}
          <div className="relative">
            <Link
              href="/partners/settings"
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <HighlightCard
              color="orange"
              className="w-full pl-12 legal-card"
              title="Legal"
              description="Terms, Privacy Policy, and Partner Agreement"
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

            <div className="divide-y divide-white/5 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              {legalDocuments.map(({ id, title, description, href, status }) => (
                <div key={id} className="flex items-center gap-3 px-4 py-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-siso-text-primary">{title}</p>
                    <p className="text-xs text-siso-text-muted">{description}</p>
                    <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{status}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-siso-text-muted" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
