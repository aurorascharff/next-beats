'use client';

import * as Ariakit from '@ariakit/react';
import { Eye, EyeOff, Timer, TimerOff, Wifi, WifiOff, Zap, ZapOff } from 'lucide-react';
import { Boundary } from '@/components/demo/boundary';
import { cn } from '@/lib/utils';

type Props = {
  store: Ariakit.DialogStore;
  prefetch: boolean;
  delays: boolean;
  offline: boolean;
  client: boolean;
};

export function DemoGuideDialog({ store, prefetch, delays, offline, client }: Props) {
  const toggles = [
    {
      name: 'Client',
      on: client,
      Icon: client ? Eye : EyeOff,
      text: 'Outlines the Client Components. Everything else is server-rendered and ships no JS.',
    },
    {
      name: 'Prefetch',
      on: prefetch,
      Icon: prefetch ? Zap : ZapOff,
      text: 'Prefetches the route’s cached content (never dynamic data) so it’s ready on arrival. Off, only the App Shell is prefetched, so the click is still instant but content streams in.',
    },
    {
      name: 'Delays',
      on: delays,
      Icon: delays ? Timer : TimerOff,
      text: 'Adds artificial latency to the real database queries, to prove navigation stays instant on a slow backend.',
    },
    {
      name: 'Online',
      on: !offline,
      Icon: offline ? WifiOff : Wifi,
      text: 'Go offline and pages still open to their App Shell, with prefetched data ready. Recovers when you reconnect.',
    },
  ];

  return (
    <Boundary label="DemoGuide">
      <Ariakit.Dialog
        store={store}
        backdrop={<div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" style={{ viewTransitionName: 'none' }} />}
        className="border-divider dark:border-divider-dark fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border bg-white p-6 shadow-2xl outline-none dark:bg-black"
        style={{ viewTransitionName: 'none' }}
        unmountOnHide
      >
        <Ariakit.DialogHeading className="text-xl font-bold text-black dark:text-white">
          How this demo works
        </Ariakit.DialogHeading>
        <Ariakit.DialogDescription className="text-muted mt-2 text-sm leading-relaxed">
          A Next.js 16.3 music player showing instant navigations. The App Shell is prefetched, so navigating never blocks. These
          toggles simulate different backends, networks, and costs.
        </Ariakit.DialogDescription>

        <div className="mt-6 flex flex-col gap-4">
          {toggles.map(t => (
            <div key={t.name} className="flex items-start gap-3">
              <t.Icon className={cn('mt-0.5 size-4.5 shrink-0', t.on ? 'text-accent' : 'text-gray')} />
              <div>
                <p className="text-sm font-semibold text-black dark:text-white">{t.name}</p>
                <p className="text-muted mt-1 text-sm leading-relaxed">{t.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-divider dark:border-divider-dark mt-6 flex items-center justify-between border-t pt-4">
          <a
            className="text-accent text-sm font-medium hover:underline"
            href="https://preview.nextjs.org/docs/app/guides/instant-navigation"
            target="_blank"
            rel="noreferrer"
          >
            Read the guide
          </a>
          <Ariakit.DialogDismiss className="border-divider hover:bg-card dark:border-divider-dark dark:hover:bg-card-dark inline-flex items-center justify-center rounded-full border bg-white px-5 py-2 text-sm font-semibold text-black transition-colors dark:bg-black dark:text-white">
            Close
          </Ariakit.DialogDismiss>
        </div>
      </Ariakit.Dialog>
    </Boundary>
  );
}
