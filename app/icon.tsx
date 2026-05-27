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
        <path d="M9 18V5l12-2v13" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" fill="#4f6ef7" />
        <circle cx="18" cy="16" r="3" fill="#4f6ef7" />
      </svg>
    </div>,
    size,
  );
}
