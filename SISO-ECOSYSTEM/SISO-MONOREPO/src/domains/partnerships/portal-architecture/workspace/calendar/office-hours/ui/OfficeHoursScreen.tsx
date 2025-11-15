'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HighlightCard } from '@/components/ui/card-5-static';
import { cn } from '@/domains/shared/utils/cn';
import { Calendar, CalendarClock, ClipboardList, Notebook, PenSquare, Sparkles, Users, Video } from 'lucide-react';
import {
  availableSlots,
  expertProfiles,
  officeHoursTopics,
  upcomingSessions,
  pastSessions,
  type OfficeHoursSlot,
  type OfficeHoursTopic,
} from '../data';
import { SettingsGroupCallout } from '@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout';

export function OfficeHoursScreen() {
  const [selectedTopic, setSelectedTopic] = useState<OfficeHoursTopic>('deal_strategy');
  const [notes, setNotes] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState(() => availableSlots[0]?.id ?? '');
  const [holdConfirmed, setHoldConfirmed] = useState(false);

  const slotsByDay = useMemo(() => groupSlotsByDay(availableSlots), []);
  const selectedSlot = availableSlots.find((slot) => slot.id === selectedSlotId) ?? availableSlots[0];
  const selectedExpert = expertProfiles.find((expert) => expert.id === selectedSlot?.expertId);

  return (
    <section className="min-h-screen bg-[#040413] pb-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-12">
        <HighlightCard
          title="Office hours hub"
          description="Book one-on-one or group time with SISO mentors, follow along with recordings, and unlock Performer+ perks."
          metricValue="14"
          metricLabel="slots live this week"
          buttonText="View calendar"
          onButtonClick={() => window.scrollTo({ top: 200, behavior: 'smooth' })}
          icon={<Calendar className="h-5 w-5" />}
          color="orange"
          hideDivider
          hideFooter
          className="w-full rounded-3xl border border-white/20 bg-gradient-to-br from-orange-600 to-rose-500 pr-16"
          showCornerIcon={false}
        >
          <div />
        </HighlightCard>

        <div className="grid gap-6 lg:grid-cols-[420px_auto]">
          <div className="space-y-6">
            <TierAccessCard />
            <ExpertSpotlight expert={selectedExpert} />
            <SessionHistory />
          </div>

          <div className="space-y-6">
            <AvailabilityPanel slotsByDay={slotsByDay} selectedSlotId={selectedSlotId} onSelectSlot={setSelectedSlotId} />
            <BookingComposer
              selectedSlot={selectedSlot}
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
              notes={notes}
              onNotesChange={setNotes}
              holdConfirmed={holdConfirmed}
              onHold={() => setHoldConfirmed(true)}
            />
            <UpcomingSessionsList />
          </div>
        </div>
      </div>
    </section>
  );
}

function TierAccessCard() {
  return (
    <Card className="border-white/15 bg-white/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Users className="h-5 w-5" /> Tier benefits
        </CardTitle>
        <CardDescription className="text-white/70">
          Standard hours are open to all. Active+ receives expedited review, Performer+ guarantees monthly 1:1 time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="rounded-2xl border border-white/10 p-3">
          <p className="font-semibold text-white">Starter / Active</p>
          <p className="text-white/70">Book from shared pool. Queue-based confirmation.</p>
        </div>
        <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-3">
          <p className="font-semibold text-amber-200">Performer+</p>
          <p className="text-amber-100">Priority concierge + monthly coaching stipend + recording storage.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ExpertSpotlight({ expert }: { expert?: (typeof expertProfiles)[number] }) {
  if (!expert) return null;
  return (
    <Card className="border-white/10 bg-gradient-to-b from-white/10 to-white/0">
      <CardHeader>
        <CardTitle className="text-white">Facilitator spotlight</CardTitle>
        <CardDescription className="text-white/70">Match the right coach before reserving.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-lg font-semibold text-white">
            {expert.avatarInitials}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{expert.name}</p>
            <p className="text-sm text-white/70">{expert.title} • {expert.timezone}</p>
          </div>
        </div>
        <p className="text-sm text-white/80">Focus: {expert.specialty}</p>
        <div className="flex flex-wrap gap-2">
          {expert.focusAreas.map((area) => (
            <Badge key={area} className="bg-white/10 text-white">
              {area}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AvailabilityPanel({
  slotsByDay,
  selectedSlotId,
  onSelectSlot,
}: {
  slotsByDay: Record<string, OfficeHoursSlot[]>;
  selectedSlotId: string;
  onSelectSlot: (slotId: string) => void;
}) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Clock3 className="h-5 w-5" /> Availability
        </CardTitle>
        <CardDescription className="text-white/70">Pick a slot first, then finalize the booking.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(slotsByDay).map(([day, slots]) => (
          <div key={day} className="space-y-3 rounded-2xl border border-white/10 p-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{day}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onSelectSlot(slot.id)}
                  className={cn(
                    'rounded-2xl border p-3 text-left transition',
                    selectedSlotId === slot.id
                      ? 'border-white bg-white/10 shadow-lg'
                      : 'border-white/10 bg-black/30 hover:border-white/40',
                  )}
                >
                  <p className="text-sm font-semibold text-white">{formatTimeRange(slot)}</p>
                  <p className="text-xs text-white/70">{slot.isGroup ? 'Group workshop' : '1:1 focus'}</p>
                  <Badge className="mt-2 bg-white/10 text-[11px] uppercase tracking-[0.3em]">
                    {slot.tierAccess === 'all' ? 'Open' : `${slot.tierAccess}+`}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function BookingComposer({
  selectedSlot,
  selectedTopic,
  onTopicChange,
  notes,
  onNotesChange,
  holdConfirmed,
  onHold,
}: {
  selectedSlot?: OfficeHoursSlot;
  selectedTopic: OfficeHoursTopic;
  onTopicChange: (topic: OfficeHoursTopic) => void;
  notes: string;
  onNotesChange: (value: string) => void;
  holdConfirmed: boolean;
  onHold: () => void;
}) {
  return (
    <Card className="border-white/10 bg-white/[0.03]">
      <CardHeader>
        <CardTitle className="text-white">Booking form</CardTitle>
        <CardDescription className="text-white/70">Tell the mentor what to prep.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Topic</p>
          <Tabs value={selectedTopic} onValueChange={(value) => onTopicChange(value as OfficeHoursTopic)}>
            <TabsList className="flex w-full flex-wrap gap-2 bg-white/10">
              {Object.entries(officeHoursTopics).map(([key, topic]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-full border border-white/10 px-4 py-2 text-white data-[state=active]:border-white data-[state=active]:bg-white/20"
                >
                  {topic.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <p className="text-xs text-white/70">{officeHoursTopics[selectedTopic].description}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Agenda / attachments</p>
          <Textarea
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            placeholder="Link docs, outline blockers, and call out tier-specific needs."
            className="mt-2 min-h-[120px] border-white/10 bg-black/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="rounded-2xl border border-dashed border-white/20 p-4 text-sm text-white/70">
          <p className="font-semibold text-white">Selected slot</p>
          {selectedSlot ? (
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" /> {formatTimeRange(selectedSlot)}
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" /> {selectedSlot.isGroup ? 'Group room link sent after confirmation' : 'Direct 1:1 link'}
              </div>
            </div>
          ) : (
            <p>No slot selected yet.</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-white text-black hover:bg-white/90"
            onClick={onHold}
            disabled={holdConfirmed || !selectedSlot}
          >
            {holdConfirmed ? 'Held' : 'Hold slot'}
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" disabled={!holdConfirmed}>
            Confirm booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingSessionsList() {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-white">Upcoming sessions</CardTitle>
        <CardDescription className="text-white/70">Join links unlock 10 minutes before start.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingSessions.map((session) => (
          <div key={session.id} className="rounded-2xl border border-white/10 bg-black/30 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{session.title}</p>
                <p className="text-xs text-white/70">{session.expertName}</p>
              </div>
              <Badge className="bg-white/10 text-white text-xs">
                {session.status === 'confirmed' ? 'Confirmed' : 'Pending' }
              </Badge>
            </div>
            <p className="mt-2 text-xs text-white/60">{new Date(session.scheduledFor).toLocaleString()}</p>
            <p className="text-sm text-white/80">{session.notes}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" disabled={!session.canJoin}>
                Join room
              </Button>
              <Button size="sm" variant="ghost" className="text-white/70">
                Reschedule
              </Button>
            </div>
          </div>
        ))}
        {upcomingSessions.length === 0 ? <p className="text-sm text-white/70">No bookings yet.</p> : null}
      </CardContent>
    </Card>
  );
}

function SessionHistory() {
  return (
    <Card className="border-white/10 bg-black/30">
      <CardHeader>
        <CardTitle className="text-white">Recent recaps</CardTitle>
        <CardDescription className="text-white/70">Recordings + action items</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {pastSessions.map((session) => (
          <div key={session.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm font-semibold text-white">{session.title}</p>
            <p className="text-xs text-white/70">{session.expertName}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
              <Clock3 className="h-4 w-4" /> {new Date(session.scheduledFor).toLocaleDateString()}
            </div>
            <Button size="sm" variant="ghost" className="mt-2 text-white/80" asChild>
              <a href={session.recapLink ?? '#'}>Open recap</a>
            </Button>
          </div>
        ))}
        {pastSessions.length === 0 ? <p className="text-sm text-white/70">No history yet.</p> : null}
      </CardContent>
    </Card>
  );
}

function groupSlotsByDay(slots: OfficeHoursSlot[]) {
  return slots.reduce<Record<string, OfficeHoursSlot[]>>((acc, slot) => {
    const label = new Date(slot.startTime).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    acc[label] = acc[label] ?? [];
    acc[label].push(slot);
    return acc;
  }, {});
}

function formatTimeRange(slot?: OfficeHoursSlot) {
  if (!slot) return '';
  const start = new Date(slot.startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const end = new Date(slot.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  return `${start} – ${end}`;
}
