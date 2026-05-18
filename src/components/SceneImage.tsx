"use client";

import { useState } from "react";

type Props = {
  href: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * SVG <image> wrapper that renders a soft skeleton rect until the bitmap
 * decodes. Prevents the "photo pops in" first-paint feeling on /real.
 */
export function SceneImage({ href, x, y, width, height }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={6}
          fill="#E5E3DA"
          opacity={0.6}
        >
          <animate
            attributeName="opacity"
            values="0.45;0.75;0.45"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </rect>
      )}
      <image
        href={href}
        x={x}
        y={y}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        onLoad={() => setLoaded(true)}
        style={{
          mixBlendMode: "multiply",
          pointerEvents: "auto",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.32s ease-out",
        }}
      />
    </>
  );
}
