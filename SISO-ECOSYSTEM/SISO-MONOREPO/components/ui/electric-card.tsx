"use client";

import { ReactNode, useId } from "react";

import { cn } from "@/lib/utils";

export type ElectricCardVariant = "swirl" | "hue";

export type ElectricCardProps = {
  variant?: ElectricCardVariant;
  color?: string;
  badge?: string;
  title?: string;
  description?: string;
  width?: string;
  aspectRatio?: string;
  className?: string;
  children?: ReactNode;
  contentClassName?: string;
  frameOnly?: boolean;
};

export function ElectricCard({
  variant = "swirl",
  color = "#dd8448",
  badge = "Dramatic",
  title = "Original",
  description = "In case you'd like to emphasize something very dramatically.",
  width = "22rem",
  aspectRatio = "7 / 10",
  className = "",
  children,
  contentClassName,
  frameOnly = false,
}: ElectricCardProps) {
  const reactId = useId().replace(/:/g, "");
  const ids = { swirl: `swirl-${reactId}`, hue: `hue-${reactId}` };

  if (frameOnly) {
    return (
      <div className={cn("ec-frame", className)} style={{ ["--electric-border-color" as any]: color }}>
        <div className={cn("ec-frame__inner", contentClassName)}>
          {children ?? (
            <>
              <div className="frame-header">
                <span className="frame-badge">{badge}</span>
                <p className="frame-title">{title}</p>
              </div>
              <p className="frame-description">{description}</p>
            </>
          )}
        </div>
      </div>
    );
  }

  const filterURL = variant === "hue" ? `url(#${ids.hue})` : `url(#${ids.swirl})`;

  return (
    <div className={cn("ec-wrap", className)}>
      <svg className="svg-container" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter id={ids.swirl} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="2" />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="2" />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          <filter id={ids.hue} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
            <feColorMatrix type="hueRotate" result="pt1">
              <animate attributeName="values" values="0;360;" dur="0.6s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feComposite />
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="5" />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate attributeName="values" values="0; 333; 199; 286; 64; 168; 256; 157; 360;" dur="5s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <div
        className="card-container"
        style={{
          ["--electric-border-color" as any]: color,
          ["--f" as any]: filterURL,
          ["--card-width" as any]: width,
          ["--card-aspect" as any]: aspectRatio,
        }}
      >
        <div className="inner-container">
          <div className="border-outer">
            <div className="main-card" />
          </div>
          <div className="glow-layer-1" />
          <div className="glow-layer-2" />
        </div>

        <div className="overlay-1" />
        <div className="overlay-2" />
        <div className="background-glow" />

        <div className={cn("content-container", children && "content-container--custom")}>
          {children ? (
            <div className={cn("custom-content", contentClassName)}>{children}</div>
          ) : (
            <>
              <div className="content-top">
                <div className="scrollbar-glass">{badge}</div>
                <p className="title">{title}</p>
              </div>
              <hr className="divider" />
              <div className="content-bottom">
                <p className="description">{description}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .ec-wrap { position: relative; display: inline-block; }
        .svg-container { position: absolute; width: 0; height: 0; overflow: hidden; }
        .card-container {
          padding: 2px;
          border-radius: 1.5em;
          position: relative;
          --electric-light-color: oklch(from var(--electric-border-color) l c h);
          --gradient-color: oklch(from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4);
          background: linear-gradient(-30deg, var(--gradient-color), transparent, var(--gradient-color)),
            linear-gradient(to bottom, oklch(0.185 0 0), oklch(0.185 0 0));
          color: oklch(0.985 0 0);
        }
        .inner-container { position: relative; }
        .border-outer { border: 2px solid oklch(from var(--electric-border-color) l c h / 0.5); border-radius: 1.5em; padding-right: 0.15em; padding-bottom: 0.15em; }
        .main-card {
          width: var(--card-width, 22rem);
          aspect-ratio: var(--card-aspect, 7 / 10);
          border-radius: 1.5em;
          border: 2px solid var(--electric-border-color);
          margin-top: -4px;
          margin-left: -4px;
          filter: var(--f);
          background: oklch(0.145 0 0);
        }
        .glow-layer-1, .glow-layer-2, .overlay-1, .overlay-2, .background-glow {
          border-radius: 24px;
          position: absolute;
          inset: 0;
        }
        .glow-layer-1 { border: 2px solid oklch(from var(--electric-border-color) l c h / 0.6); filter: blur(1px); }
        .glow-layer-2 { border: 2px solid var(--electric-light-color); filter: blur(4px); }
        .overlay-1, .overlay-2 {
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(16px);
          background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
        }
        .overlay-1 { opacity: 1; }
        .overlay-2 { opacity: 0.5; }
        .background-glow { filter: blur(32px); transform: scale(1.1); opacity: 0.3; z-index: -1; background: linear-gradient(-30deg, var(--electric-light-color), transparent, var(--electric-border-color)); }
        .content-container { position: absolute; inset: 0; width: 100%; height: 100%; display: flex; flex-direction: column; }
        .content-container--custom { position: relative; inset: auto; height: auto; }
        .custom-content { display: flex; flex-direction: column; gap: 1rem; padding: 2.5rem; color: inherit; }
        .content-top { display: flex; flex-direction: column; padding: 48px 48px 16px; height: 100%; }
        .content-bottom { display: flex; flex-direction: column; padding: 16px 48px 48px; }
        .scrollbar-glass {
          background: radial-gradient(47.2% 50% at 50.39% 88.37%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.04);
          border-radius: 14px;
          width: fit-content;
          padding: 0.5em 1em;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.85em;
          color: rgba(255,255,255,0.8);
          position: relative;
        }
        .scrollbar-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          background: linear-gradient(150deg, rgba(255,255,255,0.48) 16.73%, rgba(255,255,255,0.08) 30.2%, rgba(255,255,255,0.08) 68.2%, rgba(255,255,255,0.6) 81.89%);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          pointer-events: none;
        }
        .title { font-size: 2.25em; font-weight: 500; margin-top: auto; }
        .description { opacity: 0.5; }
        .divider { margin-top: auto; border: none; height: 1px; background-color: currentColor; opacity: 0.1; mask-image: linear-gradient(to right, transparent, black, transparent); }
        .ec-frame {
          position: relative;
          border-radius: 1.5em;
          padding: 2px;
          background: linear-gradient(115deg, rgba(255, 138, 0, 0.8), transparent 60%),
            radial-gradient(circle at top left, rgba(255, 138, 0, 0.6), transparent 55%),
            rgba(7, 7, 9, 0.85);
        }
        .ec-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(145deg, rgba(255, 138, 0, 0.8), rgba(255, 90, 0, 0.4));
          filter: blur(20px);
          opacity: 0.35;
          z-index: -1;
        }
        .ec-frame__inner {
          border-radius: calc(1.5em - 2px);
          background: rgba(6, 6, 8, 0.9);
          padding: 1.25rem;
        }
        .frame-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
        .frame-badge { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--electric-border-color); }
        .frame-title { font-size: 1.1rem; font-weight: 600; color: white; }
        .frame-description { font-size: 0.875rem; color: rgba(255,255,255,0.8); }
      `}</style>
    </div>
  );
}
