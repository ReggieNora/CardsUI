import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef, useMemo } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Add a subtle offset based on the mouse position
  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
}

export default function Iridescence({
  color = [0.4, 0.2, 0.8],
  speed = 0.2,
  amplitude = 0.05,
  mouseReact = true,
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const animateIdRef = useRef<number>();

  // Memoize the uniforms to prevent unnecessary updates
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new Color(...color) },
    uResolution: { value: new Color(1, 1, 1) },
    uMouse: { value: new Float32Array([0.5, 0.5]) },
    uAmplitude: { value: amplitude },
    uSpeed: { value: speed },
  }), [color, amplitude, speed]);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;

    // Create renderer only if it doesn't exist
    if (!rendererRef.current) {
      const renderer = new Renderer();
      const gl = renderer.gl;
      gl.clearColor(1, 1, 1, 1);
      rendererRef.current = renderer;
    }

    const renderer = rendererRef.current;
    const gl = renderer.gl;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (programRef.current) {
        programRef.current.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }

    window.addEventListener("resize", resize, false);
    resize();

    // Create geometry and program only if they don't exist
    if (!meshRef.current) {
      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms,
      });
      programRef.current = program;
      meshRef.current = new Mesh(gl, { geometry, program });
    }

    // Update uniforms if they changed
    if (programRef.current) {
      programRef.current.uniforms.uColor.value = new Color(...color);
      programRef.current.uniforms.uAmplitude.value = amplitude;
      programRef.current.uniforms.uSpeed.value = speed;
    }

    function update(t: number) {
      if (programRef.current && meshRef.current) {
        programRef.current.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: meshRef.current });
      }
      animateIdRef.current = requestAnimationFrame(update);
    }

    animateIdRef.current = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      if (programRef.current) {
        programRef.current.uniforms.uMouse.value[0] = x;
        programRef.current.uniforms.uMouse.value[1] = y;
      }
    }

    if (mouseReact) {
      ctn.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (animateIdRef.current) {
        cancelAnimationFrame(animateIdRef.current);
      }
      window.removeEventListener("resize", resize);
      if (mouseReact) {
        ctn.removeEventListener("mousemove", handleMouseMove);
      }
      if (ctn.contains(gl.canvas)) {
        ctn.removeChild(gl.canvas);
      }
    };
  }, [color, speed, amplitude, mouseReact, uniforms]);

  return (
    <div
      ref={ctnDom}
      className="fixed inset-0 -z-10"
      {...rest}
    />
  );
} 