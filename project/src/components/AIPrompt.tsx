import React, { useState } from "react";
import { ArrowRight, Bot, Check, ChevronDown, Paperclip, Mic } from "lucide-react";
// If you have a local Textarea component, import it here. Otherwise, use a native textarea.
// import { Textarea } from "./ui/textarea";
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => (
  <textarea ref={ref} {...props} />
));
// If you have a local cn utility, import it here. Otherwise, use a basic fallback:
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
import { useAutoResizeTextarea } from "../hooks/useAutoResizeTextarea";
// If you have a local Button component, import it here. Otherwise, use a native button.
const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />;
// If you have a DropdownMenu component, import it here. Otherwise, use a simple fallback.
const DropdownMenu = ({ open, setOpen, children }: { open: boolean, setOpen: (open: boolean) => void, children: React.ReactNode }) => {
  // Find the trigger and content children
  let trigger: React.ReactElement | null = null;
  let content: React.ReactElement | null = null;
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type && (child.type as any).displayName === 'DropdownMenuTrigger') {
      trigger = child;
    } else if (React.isValidElement(child) && child.type && (child.type as any).displayName === 'DropdownMenuContent') {
      content = child;
    }
  });
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  return (
    <>
      {trigger && React.cloneElement(trigger, { open, setOpen, ref: triggerRef })}
      {content && React.cloneElement(content, { open, triggerRef })}
    </>
  );
};
import ReactDOM from "react-dom";
const DropdownMenuTrigger = React.forwardRef<HTMLSpanElement, any>(function DropdownMenuTrigger({ asChild, children, open, setOpen }, ref) {
  return (
    <span ref={ref} onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
      {children}
    </span>
  );
});
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
const DropdownMenuContent = ({ children, className, open, triggerRef }: any) => {
  const [position, setPosition] = React.useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  React.useEffect(() => {
    if (open && triggerRef && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4, // 4px offset
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open, triggerRef]);
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className={className}
      style={{
        position: "fixed",
        zIndex: 1000,
        top: position.top,
        left: position.left,
        minWidth: position.width,
        maxHeight: 192, // max-h-48
        overflowY: "auto",
        background: "#222",
        color: "#fff",
        borderRadius: 8,
        padding: 8,
      }}
    >
      {children}
    </div>,
    document.body
  );
};
DropdownMenuContent.displayName = 'DropdownMenuContent';
const DropdownMenuItem = ({ children, onSelect, className }: any) => <div className={className} onClick={onSelect} style={{ padding: 8, cursor: 'pointer' }}>{children}</div>;
import { motion, AnimatePresence } from "framer-motion";

const OPENAI_SVG = (
  <div>
    {/* SVGs omitted for brevity, use your provided SVGs here */}
  </div>
);

export default function AIPrompt() {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 72,
    maxHeight: 300,
  });
  const [selectedModel, setSelectedModel] = useState("GPT-4-1 Mini");
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  // Typing/backspacing placeholder animation
  const placeholders = [
    "Ready to practice?",
    "You can type to me...",
    "Or you can speak to me...",
    "Let me know when you're ready!"
  ];
  const [placeholderIdx, setPlaceholderIdx] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const [phase, setPhase] = React.useState<'typing' | 'pausing' | 'deleting'>('typing');

  React.useEffect(() => {
    if (value) {
      setTyped("");
      return;
    }
    let timeout: NodeJS.Timeout;
    const current = placeholders[placeholderIdx];
    if (phase === 'typing') {
      if (typed.length < current.length) {
        timeout = setTimeout(() => {
          setTyped(current.slice(0, typed.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1000);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 600);
    } else if (phase === 'deleting') {
      if (typed.length > 0) {
        timeout = setTimeout(() => {
          setTyped(current.slice(0, typed.length - 1));
        }, 30);
      } else {
        setPhase('typing');
        setPlaceholderIdx(idx => (idx + 1) % placeholders.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [typed, phase, placeholderIdx, value]);

  React.useEffect(() => {
    if (!value) {
      setTyped("");
      setPhase('typing');
      setPlaceholderIdx(0);
    }
  }, [value]);

  const AI_MODELS = ["o3-mini", "Gemini 2.5 Flash", "Claude 3.5 Sonnet", "GPT-4-1 Mini", "GPT-4-1"];

  const MODEL_ICONS: Record<string, React.ReactNode> = {
    "o3-mini": OPENAI_SVG,
    "Gemini 2.5 Flash": <svg height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gemini</title><defs><linearGradient id="lobe-icons-gemini-fill" x1="0%" x2="68.73%" y1="100%" y2="30.395%"><stop offset="0%" stopColor="#1C7DFF" /><stop offset="52.021%" stopColor="#1C69FF" /><stop offset="100%" stopColor="#F0DCD6" /></linearGradient></defs><path d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12" fill="url(#lobe-icons-gemini-fill)" fillRule="nonzero" /></svg>,
    "Claude 3.5 Sonnet": <div><svg fill="#000" fillRule="evenodd" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" className="dark:hidden block"><title>Anthropic Icon Light</title><path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" /></svg><svg fill="#ffff" fillRule="evenodd" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block"><title>Anthropic Icon Dark</title><path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" /></svg></div>,
    "GPT-4-1 Mini": OPENAI_SVG,
    "GPT-4-1": OPENAI_SVG,
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setValue("");
      adjustHeight(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[320px] flex flex-col justify-center items-center py-6">
      <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-1.5 w-full">
        <div className="relative">
          <div className="relative flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              <Textarea
                id="ai-input-15"
                value={value}
                placeholder={value ? "" : typed}
                className={cn(
                  "w-full rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus:outline-none focus:ring-0 focus:border-transparent",
                  "min-h-[72px]",
                )}
                ref={textareaRef}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
              />
            </div>
            <div className="h-14 bg-black/5 dark:bg-white/5 rounded-b-xl flex items-center">
              <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between w-[calc(100%-24px)]">
                <div className="flex items-center gap-2">
                   {/* Model Dropdown Menu - controlled open state */}
                  <DropdownMenu open={modelMenuOpen} setOpen={setModelMenuOpen}>
                    <DropdownMenuTrigger asChild open={modelMenuOpen} setOpen={setModelMenuOpen}>
                      <Button
                        type="button"
                        className="flex items-center gap-1 h-8 pl-1 pr-2 text-xs rounded-md dark:text-white hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedModel}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1"
                          >
                            {MODEL_ICONS[selectedModel]}
                            {selectedModel}
                            <ChevronDown className="w-3 h-3 opacity-50" />
                          </motion.div>
                        </AnimatePresence>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={cn(
                        "min-w-[10rem] max-h-48 overflow-y-auto",
                        "border-black/10 dark:border-white/10",
                        "bg-gradient-to-b from-white via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800",
                      )}
                      open={modelMenuOpen}
                    >
                      {AI_MODELS.map((model) => (
                        <DropdownMenuItem
                          key={model}
                          onSelect={() => { setSelectedModel(model); setModelMenuOpen(false); }}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2">
                            {MODEL_ICONS[model] || <Bot className="w-4 h-4 opacity-50" />} {/* Use mapped SVG or fallback */}
                            <span>{model}</span>
                          </div>
                          {selectedModel === model && <Check className="w-4 h-4 text-blue-500" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-0.5" />
                  <label
                    className={cn(
                      "rounded-lg p-2 bg-black/5 dark:bg-white/5 cursor-pointer",
                      "hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500",
                      "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white",
                    )}
                    aria-label="Attach file"
                  >
                    <input type="file" className="hidden" />
                    <Paperclip className="w-4 h-4 transition-colors" />
                  </label>
                  {/* Voice Button */}
                  <label
                    className={cn(
                      "rounded-lg p-2 bg-black/5 dark:bg-white/5 cursor-pointer",
                      "hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500",
                      "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white",
                    )}
                    aria-label="Record voice"
                  >
                    <Mic className="w-4 h-4 transition-colors" />
                  </label>
                </div>
                <button
                  type="button"
                  className={cn(
                    "rounded-lg p-2 bg-black/5 dark:bg-white/5",
                    "hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500",
                  )}
                  aria-label="Send message"
                  disabled={!value.trim()}
                >
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 dark:text-white transition-opacity duration-200",
                      value.trim() ? "opacity-100" : "opacity-30",
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
