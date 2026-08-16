import { ImageResponse } from "next/og";

/* ─── Favicon (browser tab) ─────────────────────────────────────────────────── */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: "-1px",
          }}
        >
          AR
        </span>
      </div>
    ),
    { ...size },
  );
}
