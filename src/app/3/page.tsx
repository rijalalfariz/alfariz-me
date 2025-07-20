
import jwt from "jsonwebtoken";
import React from "react";

const METABASE_SITE_URL = "http://localhost:3000";
const METABASE_SECRET_KEY = "332fcc8e5015c649a3c76fec9027d6a6871f95a93c8a49c4416cf1c0f5979e6a";

function getMetabaseIframeUrl(id: number): string {
  const payload = {
    resource: { dashboard: 33 },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);
  return `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
}

export default function Page() {
  const iframeUrl = getMetabaseIframeUrl(33);
  const iframeUrl2 = getMetabaseIframeUrl(39);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
      <iframe
        src={iframeUrl}
        style={{ width: "calc(80vw - 24px)", border: "none" }}
        height="600"
        title="Metabase Chart"
      />
    </div>
  );
}