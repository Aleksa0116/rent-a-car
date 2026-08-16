import { ImageResponse } from "next/og";

/* ─── Apple Touch Icon (iOS home screen) ──────────────────────────────────── */
/* iOS renders this at 180×180 and clips it to a rounded rect automatically.  */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {/* "AR" monogram */}
        <span
          style={{
            color: "white",
            fontSize: 76,
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          AR
        </span>
        {/* "RENT" sub-label */}
        <span
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            fontWeight: 500,
            fontFamily: "sans-serif",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          RENT
        </span>
      </div>
    ),
    { ...size },
  );
}
