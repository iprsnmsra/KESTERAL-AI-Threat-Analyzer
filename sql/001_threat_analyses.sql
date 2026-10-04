CREATE TABLE IF NOT EXISTS threat_analyses (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  input TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('url', 'msg')),
  verdict TEXT NOT NULL,
  risk_score INTEGER NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS threat_analyses_user_created_idx
  ON threat_analyses (user_id, created_at DESC);
