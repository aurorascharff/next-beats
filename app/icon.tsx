import { ImageResponse } from 'next/og';

export const size = { height: 32, width: 32 };

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: 'transparent',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="9" width="3" height="6" rx="1.5" fill="#4f6ef7" />
        <rect x="8" y="4" width="3" height="16" rx="1.5" fill="#4f6ef7" />
        <rect x="13" y="7" width="3" height="10" rx="1.5" fill="#4f6ef7" />
        <rect x="18" y="10" width="3" height="4" rx="1.5" fill="#4f6ef7" />
      </svg>
    </div>,
    size,
  );
}
