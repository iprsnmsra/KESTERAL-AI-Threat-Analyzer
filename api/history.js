import { neon } from "@neondatabase/serverless";
import { requireSession } from "./_lib/auth.js";

function database() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  return url ? neon(url) : null;
}

export default async function handler(req, res) {
  const session = requireSession(req, res);
  if (!session) return;
  try {
    const sql = database();
    if (!sql) return res.status(503).json({ error: "History storage is not configured." });
    if (req.method === "GET") {
      const { rows } = await sql`SELECT id, input, type, verdict, risk_score, result, created_at FROM threat_analyses WHERE user_id = ${session.id} ORDER BY created_at DESC LIMIT 25`;
      return res.status(200).json(rows);
    }
    if (req.method === "POST") {
      const { input, type, result } = req.body || {};
      if (typeof input !== "string" || !input.trim() || !result || !["url", "msg"].includes(type)) return res.status(400).json({ error: "A valid analysis is required." });
      const { rows } = await sql`INSERT INTO threat_analyses (user_id, input, type, verdict, risk_score, result) VALUES (${session.id}, ${input.trim().slice(0, 10000)}, ${type}, ${result.verdict || "ERROR"}, ${Number(result.risk_score) || 0}, ${JSON.stringify(result)}::jsonb) RETURNING id, created_at`;
      return res.status(201).json(rows[0]);
    }
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) { console.error("History request failed:", error); return res.status(503).json({ error: "History storage is unavailable. Try again shortly." }); }
}
