
import jwt from "jsonwebtoken";
import React from "react";

function getMetabaseIframeUrl(id: number): string {
  // you will need to install via 'npm install jsonwebtoken' or in your package.json
  const METABASE_SITE_URL = "http://localhost:3000";
  const METABASE_SECRET_KEY = "332fcc8e5015c649a3c76fec9027d6a6871f95a93c8a49c4416cf1c0f5979e6a";

  const payload = {
    resource: { question: id },
    params: {
      tahun: [],
    },
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl = METABASE_SITE_URL + "/embed/question/" + token +
    "#bordered=true&titled=true";

  return iframeUrl
}

export default function Page() {
  const iframeUrl = getMetabaseIframeUrl(45);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
      <iframe
        src={iframeUrl}
        // src={"http://localhost:3000/public/question/b0f0539d-1bb0-418d-9402-fbb65c2ff90b"}
        style={{ width: "calc(80vw - 24px)", border: "none" }}
        height="600"
        title="Metabase Chart"
      />
    </div>
  );
}