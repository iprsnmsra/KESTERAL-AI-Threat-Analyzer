import { appUrl } from "../_lib/auth.js";
import crypto from "node:crypto";

export default function handler(req, res) {
  if (!process.env.GITHUB_CLIENT_ID) return res.status(503).json({ error: "GitHub authentication is not configured" });
  const state = `github:${crypto.randomBytes(24).toString("hex")}`;
  res.setHeader("Set-Cookie", `kestrel_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  const params = new URLSearchParams({ client_id: process.env.GITHUB_CLIENT_ID, redirect_uri: `${appUrl(req)}/api/auth/callback`, scope: "read:user user:email", state });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
