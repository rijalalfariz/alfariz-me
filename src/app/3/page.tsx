
import jwt from "jsonwebtoken";
import React from "react";

function getMetabaseIframeUrl(id: number): string {
  // you will need to install via 'npm install jsonwebtoken' or in your package.json
  const METABASE_SITE_URL = "http://103.183.92.158";
  const METABASE_SECRET_KEY = "32236fe0e832379c340418d9776f845516b8f7ab4bc1558b5acf48605779baa0";

  const payload = {
    resource: { question: id },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl = METABASE_SITE_URL + "/embed/question/" + token +
    "#bordered=true&titled=true";
  return iframeUrl
}

export default function Page() {
  const iframeUrl = getMetabaseIframeUrl(38);

  return (
    <div className="relative w-fit m-auto" style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
      {/* <button className="absolute right-0 bg-[#aaaaff] cursor-pointer font-bold rounded-full p-3 m-2">Detail</button> */}
      <iframe
        src={iframeUrl}
        // src={"https://103.183.92.158:8443/public/dashboard/0749b566-bbee-480b-ae93-1d0e96aaf1a5"}
        style={{ width: "calc(80vw - 24px)", border: "none" }}
        height="800"
        title="Metabase Chart"
      />
    </div>
  );
}