import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Site Rápido VorinWeb — site profissional a partir de R$ 499,90";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0A1128",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, color: "#ffffff" }}>
          <span>Vorin</span>
          <span style={{ color: "#5B7CFF" }}>Web</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 60,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Seu site profissional a partir de
        </div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 84, fontWeight: 800, color: "#5B7CFF" }}>
          R$ 499,90
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#94a3b8" }}>
          Escolha um modelo, personalize sua marca e publique em poucos dias
        </div>
      </div>
    ),
    { ...size },
  );
}
