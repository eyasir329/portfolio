import { ImageResponse } from "next/og";

export const alt = "Eyasir Ahamed — Junior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f5f1e8",
        color: "#15130f",
        padding: "72px 80px",
        fontFamily: "serif",
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: 6, color: "#5f594f", textTransform: "uppercase" }}>
        Portfolio · MMXXVI
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 120, lineHeight: 1 }}>
          <span>Eyasir Ahamed</span>
          <span style={{ color: "#8b2a1c" }}>.</span>
        </div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#2b2822" }}>
          Junior Software Engineer · Full-stack · Competitive programmer
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 48,
          fontSize: 28,
          color: "#5f594f",
          borderTop: "2px solid #d8d1c3",
          paddingTop: 28,
        }}
      >
        <span>ICPC Dhaka ’25 · 112th</span>
        <span>1000+ problems solved</span>
        <span>Next.js · TypeScript · PostgreSQL</span>
      </div>
    </div>,
    size,
  );
}
