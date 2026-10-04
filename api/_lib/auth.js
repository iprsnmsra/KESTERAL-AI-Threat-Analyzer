import crypto from "node:crypto";

const COOKIE_NAME = "kestrel_session";
const SESSION_TTL = 60 * 60 * 24 * 30;

function secret() {
  return process.env.AUTH_SESSION_SECRET;
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function parseCookies(req) {
  return Object.fromEntries((req.headers.cookie || "").split(";").filter(Boolean).map((part) => {
    const index = part.indexOf("=");
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }));
}

export function appUrl(req) {
  return process.env.APP_URL || `https://${req.headers.host || process.env.VERCEL_URL}`;
}

export function setSession(res, user, req) {
  if (!secret()) throw new Error("Server configuration error: AUTH_SESSION_SECRET is missing");
  const payload = base64url(JSON.stringify({ ...user, exp: Math.floor(Date.now() / 1000) + SESSION_TTL }));
  const signature = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  const secure = req ? (req.headers["x-forwarded-proto"] || "http") === "https" : process.env.NODE_ENV === "production";
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=${payload}.${signature}; Path=/; HttpOnly;${secure ? " Secure;" : ""} SameSite=Lax; Max-Age=${SESSION_TTL}`);
}

export function clearSession(res) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}

export function getSession(req) {
  const value = parseCookies(req)[COOKIE_NAME];
  if (!value || !secret()) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.exp > Math.floor(Date.now() / 1000) ? session : null;
  } catch {
    return null;
  }
}

export function requireSession(req, res) {
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: "Authentication required" });
    return null;
  }
  return session;
}
