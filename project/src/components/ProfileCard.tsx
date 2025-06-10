import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface EducationItem {
  degree: string;
  school: string;
  duration: string;
  honors: string;
}

interface ProfileCardProps {
  type: 'candidate' | 'employer';
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
  className?: string;
  enableTilt?: boolean;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  onBackClick?: () => void;
  resume?: {
    experience: ExperienceItem[];
    education: EducationItem;
  };
  experience?: ExperienceItem[];
  education?: EducationItem;
  skills?: string[];
}

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
} as const;

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3): number =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  type,
  avatarUrl = "<Placeholder for avatar URL>",
  iconUrl = "<Placeholder for icon URL>",
  grainUrl = "<Placeholder for grain URL>",
  behindGradient = DEFAULT_BEHIND_GRADIENT,
  innerGradient = DEFAULT_INNER_GRADIENT,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
  onBackClick,
  resume,
  skills,
}) => {

  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;

    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        "--icon": iconUrl ? `url(${iconUrl})` : "none",
        "--grain": grainUrl ? `url(${grainUrl})` : "none",
        "--behind-gradient": showBehindGradient
          ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
          : "none",
        "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      }) as React.CSSProperties,
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          {/* Faded profile background image */}
          {avatarUrl && (
            <div
              className="pc-profile-bg"
              style={{
                backgroundImage: `url(${avatarUrl})`,
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                opacity: 0.18,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(0.5px) grayscale(10%)',
                pointerEvents: 'none',
                borderRadius: 'inherit',
              }}
            />
          )}
          {type !== 'employer' && (
            <button
              className="pc-back-btn"
              style={{
                position: 'absolute',
                top: '1.2em',
                left: '1.2em',
                zIndex: 10,
                background: 'rgba(30,32,65,0.32)',
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                padding: '0.55em 1.4em',
                fontWeight: 600,
                fontSize: '1em',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                transition: 'background 0.2s',
                outline: 'none',
              }}
              onClick={() => (typeof onBackClick === 'function' ? onBackClick() : window.history.back())}
            >
              &#8592; Back
            </button>
          )}
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>

              {/* Resume or summary depending on card type */}
              {type === 'employer' ? (
                <div className="text-left mt-10 mb-6" style={{ minHeight: '180px', marginTop: '2.5rem' }}>
                  <h4 className="text-lg font-extrabold mb-3 text-white">About Hirly</h4>
                  <p className="text-white/90 text-base leading-relaxed" style={{ maxWidth: 420 }}>
                    Hirly is revolutionizing hiring with AI-powered recruitment. Our platform connects top talent with leading companies, streamlines workflows, and helps teams build their dream workforce faster and smarter.
                  </p>
                </div>
              ) : resume ? (
                <div className="text-left mt-4">
                  <h4 className="text-base font-bold mb-1 text-white">Experience</h4>
                  <ul className="mb-2">
                    {resume.experience.map((exp, idx) => (
                      <li key={idx} className="mb-1">
                        <div className="font-semibold text-white">{exp.title} at {exp.company}</div>
                        <div className="text-xs text-white/80 mb-1">{exp.duration}</div>
                        <div className="text-sm text-white/70">{exp.description}</div>
                      </li>
                    ))}
                  </ul>
                  <h4 className="text-base font-bold mb-1 text-white">Education</h4>
                  <div className="mb-2">
                    <div className="font-semibold text-white">{resume.education.degree}</div>
                    <div className="text-xs text-white/80">{resume.education.school} &middot; {resume.education.duration}</div>
                    <div className="text-sm text-white/70">{resume.education.honors}</div>
                  </div>
                </div>
              ) : (
                <div className="text-left mt-4">
                  <h4 className="text-base font-bold mb-1 text-white">Experience</h4>
                  <ul className="mb-2">
                    <li className="mb-1">
                      <div className="font-semibold text-white">Senior Developer at ExampleCorp</div>
                      <div className="text-xs text-white/80 mb-1">2020 - Present</div>
                      <div className="text-sm text-white/70">Led a team of engineers building modern web apps.</div>
                    </li>
                  </ul>
                  <h4 className="text-base font-bold mb-1 text-white">Education</h4>
                  <div className="mb-2">
                    <div className="font-semibold text-white">B.S. Computer Science</div>
                    <div className="text-xs text-white/80">Sample University &middot; 2014 - 2018</div>
                    <div className="text-sm text-white/70">Graduated with honors, focus on software engineering.</div>
                  </div>
                </div>
              )}
              {/* Skills always render */}
              {skills && skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-white/10 border border-white/20 px-2 py-1 rounded text-xs text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
