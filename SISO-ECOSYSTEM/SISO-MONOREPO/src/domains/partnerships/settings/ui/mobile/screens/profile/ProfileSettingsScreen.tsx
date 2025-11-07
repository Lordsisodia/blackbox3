"use client";

import { useMemo, useState } from "react";
import { Camera, Image as ImageIcon, PenSquare, Sparkles, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";

const personalInfoFields = [
  "Employment status",
  "Traditional education status",
  "Business focus",
  "Gym membership",
  "Exercise frequency",
];

export function ProfileSettingsScreen() {
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");

  const bioCharactersLeft = useMemo(() => 200 - bio.length, [bio]);

  return (
    <SettingsDetailLayout
      title="Profile"
      description="Shape the story partners see when they tap your card."
      icon={<UserRound className="h-5 w-5 text-siso-orange" />}
      wrapContent={false}
    >
      <div className="space-y-6">
        <ProfileIdentityCard status={status} onStatusChange={setStatus} bio={bio} onBioChange={setBio} bioCharactersLeft={bioCharactersLeft} />
        <PersonalInfoCard />
        <ProfilePreviewCard status={status} bio={bio} />
      </div>
    </SettingsDetailLayout>
  );
}

type ProfileIdentityCardProps = {
  status: string;
  onStatusChange: (value: string) => void;
  bio: string;
  onBioChange: (value: string) => void;
  bioCharactersLeft: number;
};

function ProfileIdentityCard({ status, onStatusChange, bio, onBioChange, bioCharactersLeft }: ProfileIdentityCardProps) {
  return (
    <section className="rounded-3xl border border-siso-border/60 bg-siso-bg-secondary/60 p-4 text-siso-text-secondary">
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-siso-text-primary">Custom Status</label>
          <Input value={status} onChange={(event) => onStatusChange(event.target.value)} placeholder="Let partners know what you're focused on" className="h-12 rounded-2xl border-siso-border/70 bg-transparent text-base text-siso-text-primary placeholder:text-siso-text-muted" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-siso-text-primary">Avatar</span>
            <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-siso-orange">
              <button type="button" className="flex items-center gap-1">
                <Camera className="h-4 w-4" /> Change
              </button>
              <button type="button" className="text-siso-text-muted">Remove</button>
            </div>
          </div>
          <Avatar className="h-24 w-24 border-2 border-siso-orange/70">
            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=SISOagency" alt="Profile avatar" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-siso-text-primary">Custom Background</label>
          <div className="rounded-2xl border border-dashed border-siso-border/70 bg-siso-bg-primary/30 p-6 text-center text-xs text-siso-text-muted">
            <ImageIcon className="mx-auto mb-2 h-6 w-6 text-siso-text-muted" />
            Drop an image here or tap to upload a new scene.
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-[0.25em] text-siso-text-primary">Bio (200 characters)</label>
          <Textarea
            value={bio}
            onChange={(event) => onBioChange(event.target.value.slice(0, 200))}
            rows={4}
            placeholder="Write something about yourself..."
            className="rounded-2xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">
            <span>Save to update your public profile</span>
            <span>{bioCharactersLeft} left</span>
          </div>
        </div>

        <Button className="w-full rounded-2xl bg-siso-orange text-sm font-semibold uppercase tracking-[0.25em] text-black" size="lg">
          Save profile
        </Button>
      </div>
    </section>
  );
}

function PersonalInfoCard() {
  return (
    <section className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/60 p-4">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-siso-text-primary">Personal information</p>
          <p className="text-[11px] text-siso-text-muted">Give partners a snapshot of your focus.</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 rounded-xl border border-siso-border/60 bg-siso-bg-primary/40 text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-primary">
          <PenSquare className="h-3.5 w-3.5" /> Create
        </Button>
      </header>
      <ul className="space-y-3">
        {personalInfoFields.map((label) => (
          <li key={label} className="flex items-center justify-between text-sm text-siso-text-muted">
            <span>{label}</span>
            <span className="text-siso-text-primary/60">Not answered</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

type ProfilePreviewCardProps = {
  status: string;
  bio: string;
};

function ProfilePreviewCard({ status, bio }: ProfilePreviewCardProps) {
  return (
    <section className="rounded-[32px] border border-siso-border/60 bg-siso-bg-secondary/60 p-0 text-siso-text-primary">
      <div className="rounded-t-[32px] bg-gradient-to-r from-siso-bg-primary to-siso-bg-secondary px-5 py-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/30">
            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=SISOagency" alt="Preview avatar" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-lg font-semibold uppercase tracking-[0.25em]">SISOagency</p>
            <p className="text-xs text-siso-text-muted">{status || "Dialed in"}</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-semibold text-siso-orange">342</p>
            <p className="text-siso-text-muted">credits</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-siso-text-muted">
          <Sparkles className="h-4 w-4 text-siso-orange" /> Next milestone in 12 days
        </div>
      </div>

      <div className="space-y-4 px-5 py-6 text-sm text-siso-text-secondary">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl border border-siso-border/60 bg-transparent p-1 text-xs uppercase tracking-[0.2em]">
            <TabsTrigger value="info" className="rounded-xl data-[state=active]:bg-siso-bg-secondary data-[state=active]:text-siso-text-primary">
              Information
            </TabsTrigger>
            <TabsTrigger value="journey" className="rounded-xl data-[state=active]:bg-siso-bg-secondary data-[state=active]:text-siso-text-primary">
              Hero's Journey
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-xl data-[state=active]:bg-siso-bg-secondary data-[state=active]:text-siso-text-primary">
              Statistics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="space-y-3 pt-4">
            <p className="text-sm text-siso-text-muted">{bio || "Write a bio so partners know where you shine."}</p>
            <div className="flex items-center justify-between text-xs text-siso-text-muted">
              <span>Power Level</span>
              <span className="text-siso-orange">25</span>
            </div>
            <div className="flex items-center justify-between text-xs text-siso-text-muted">
              <span>Login streak</span>
              <span>3 / 14 days</span>
            </div>
          </TabsContent>
          <TabsContent value="journey" className="pt-4 text-xs text-siso-text-muted">
            Map milestones to keep the hero narrative tight.
          </TabsContent>
          <TabsContent value="stats" className="pt-4 text-xs text-siso-text-muted">
            Performance metrics will plug in here later.
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap items-center gap-3 text-xs text-siso-text-muted">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              className="rounded-full border border-siso-border/50 px-3 py-1 uppercase tracking-[0.25em] text-[10px]"
            >
              Campus
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
