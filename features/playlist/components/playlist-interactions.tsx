'use client';

import * as Ariakit from '@ariakit/react';
import { Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition, useOptimistic } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ToggleMenu } from '@/components/ui/toggle-menu';
import { deletePlaylist, removeFromPlaylist, addToPlaylist } from '@/features/playlist/playlist-actions';

export function DeletePlaylistButton({ playlistId, size = 'sm' }: { playlistId: string; size?: 'sm' | 'lg' }) {
  const dialog = Ariakit.useDialogStore();
  const router = useRouter();

  async function handleConfirm(): Promise<boolean> {
    const result = await deletePlaylist(playlistId);
    if (result?.error) {
      toast.error(result.error);
      return false;
    }
    toast.success('Playlist deleted');
    router.push('/playlist');
    return true;
  }

  return (
    <>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          dialog.show();
        }}
        aria-label="Delete playlist"
        data-client="DeletePlaylistButton"
        className={`text-gray hover:text-danger rounded-full transition-colors ${size === 'lg' ? 'p-1.5' : 'p-1.5'}`}
      >
        <Trash2 className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      </button>
      <ConfirmDialog
        store={dialog}
        title="Delete playlist?"
        description="This playlist and all its track associations will be removed. This can't be undone."
        confirmLabel="Delete"
        confirmAction={handleConfirm}
      />
    </>
  );
}

export function RemoveFromPlaylistButton({ playlistId, trackId }: { playlistId: string; trackId: string }) {
  const [isPending, setIsPending] = useOptimistic(false);

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    startTransition(async () => {
      setIsPending(true);
      const result = await removeFromPlaylist(playlistId, trackId);
      if (result?.error) toast.error(result.error);
    });
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={isPending}
      data-pending={isPending || undefined}
      data-client="RemoveButton"
      aria-label="Remove from playlist"
      className="text-gray hover:text-danger rounded-full p-1.5 transition-colors"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

export function AddToPlaylistButtons({
  trackId,
  items,
}: {
  trackId: string;
  items: { label: string; value: string; active: boolean }[];
}) {
  async function handleToggle(playlistId: string, currentlyActive: boolean) {
    if (currentlyActive) {
      const result = await removeFromPlaylist(playlistId, trackId);
      if (result?.error) toast.error(result.error);
    } else {
      const result = await addToPlaylist(playlistId, trackId);
      if (result?.error) toast.error(result.error);
    }
  }

  return <ToggleMenu items={items} toggleAction={handleToggle} />;
}
