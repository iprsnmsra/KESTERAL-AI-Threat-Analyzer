import { appUrl, setSession } from "../_lib/auth.js";

function cookieValue(req, name) {
  const cookie = (req.headers.cookie || "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return cookie?.slice(name.length + 1);
}

async function exchange(provider, code, req) {
  const redirect_uri = `${appUrl(req)}/api/auth/callback`;
  if (provider === "github") {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code, redirect_uri }) });
    const token = await tokenResponse.json();
    const profile = await fetch("https://api.github.com/user", { headers: { Authorization: `Bearer ${token.access_token}`, Accept: "application/vnd.github+json", "User-Agent": "Kestrel-AI" } }).then((response) => response.json());
    return { id: `github:${profile.id}`, name: profile.name || profile.login, email: profile.email || "" };
  }
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, code, redirect_uri, grant_type: "authorization_code" }) });
  const token = await tokenResponse.json();
  const profile = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${token.access_token}` } }).then((response) => response.json());
  return { id: `google:${profile.sub}`, name: profile.name || profile.email, email: profile.email || "" };
}

export default async function handler(req, res) {
  const { code, state } = req.query || {};
  const provider = String(state || "").split(":")[0];
  if (!code || !state || !["google", "github"].includes(provider) || state !== cookieValue(req, "kestrel_oauth_state")) return res.status(400).send("Invalid authentication request.");
  try { setSession(res, await exchange(provider, code, req), req); res.redirect(appUrl(req)); } catch (error) { console.error("OAuth callback failed:", error); res.status(502).send("Authentication could not be completed. Please try again."); }
}
