'use client';

import { Check, Plus } from 'lucide-react';
import { startTransition, useOptimistic } from 'react';
import { cn } from '@/lib/utils';

type Item = { label: string; value: string; active: boolean };

type Props = {
  items: Item[];
  toggleAction: (value: string, active: boolean) => void | Promise<void>;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
};

export function ToggleMenu({ items, toggleAction, activeIcon, inactiveIcon }: Props) {
  return (
    <div className="flex flex-col gap-0.5" data-client="ToggleMenu" style={{ viewTransitionName: 'none' }}>
      {items.map(item => (
        <ToggleMenuItem
          key={item.value}
          item={item}
          toggleAction={toggleAction}
          activeIcon={activeIcon}
          inactiveIcon={inactiveIcon}
        />
      ))}
    </div>
  );
}

function ToggleMenuItem({
  item,
  toggleAction,
  activeIcon,
  inactiveIcon,
}: {
  item: Item;
  toggleAction: (value: string, active: boolean) => void | Promise<void>;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
}) {
  const [optimisticActive, setOptimisticActive] = useOptimistic(item.active);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    startTransition(async () => {
      setOptimisticActive(!optimisticActive);
      await toggleAction(item.value, optimisticActive);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'hover:bg-card dark:hover:bg-card-dark flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
        optimisticActive ? 'text-accent' : 'text-black dark:text-white',
      )}
    >
      {optimisticActive
        ? (activeIcon ?? <Check className="h-4 w-4 shrink-0" />)
        : (inactiveIcon ?? <Plus className="h-4 w-4 shrink-0" />)}
      <span className="truncate">{item.label}</span>
    </button>
  );
}
