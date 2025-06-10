// Algorand Verified Badge Icon (SVG)
export default function VerifiedBadge({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="246" stroke="url(#paint0_linear_1_2)" strokeWidth="20" fill="none"/>
      <path d="M142 262l62 62 120-120" stroke="url(#paint1_linear_1_2)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop stopColor="#92A3FD"/>
          <stop offset="1" stopColor="#9DCEFF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_1_2" x1="142" y1="204" x2="324" y2="324" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C5A3FF"/>
          <stop offset="1" stopColor="#92A3FD"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
