import { clearSession, getSession } from "../_lib/auth.js";

export default function handler(req, res) {
  if (req.method === "DELETE") { clearSession(res); return res.status(204).end(); }
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });
  const session = getSession(req);
  return session ? res.status(200).json({ name: session.name, email: session.email }) : res.status(401).json({ error: "Not signed in" });
}
