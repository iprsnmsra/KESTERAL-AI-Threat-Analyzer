import { appUrl } from "../_lib/auth.js";
import crypto from "node:crypto";

export default function handler(req, res) {
  if (!process.env.GOOGLE_CLIENT_ID) return res.status(503).json({ error: "Google authentication is not configured" });
  const state = `google:${crypto.randomBytes(24).toString("hex")}`;
  res.setHeader("Set-Cookie", `kestrel_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  const params = new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID, redirect_uri: `${appUrl(req)}/api/auth/callback`, response_type: "code", scope: "openid email profile", state });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
