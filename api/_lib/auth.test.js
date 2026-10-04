import test from "node:test";
import assert from "node:assert/strict";
import { clearSession, getSession, setSession } from "./auth.js";

test("signed sessions round-trip and expire when invalidated", () => {
  process.env.AUTH_SESSION_SECRET = "test-secret";
  const headers = {};
  const response = { setHeader(name, value) { headers[name] = value; } };
  setSession(response, { id: "github:42", name: "Analyst", email: "analyst@example.com" });
  const cookie = headers["Set-Cookie"].split(";")[0];
  const request = { headers: { cookie } };
  assert.deepEqual(getSession(request).id, "github:42");
  const tampered = `${cookie.slice(0, -1)}${cookie.endsWith("a") ? "b" : "a"}`;
  assert.equal(getSession({ headers: { cookie: tampered } }), null);
  clearSession(response);
  assert.match(headers["Set-Cookie"], /Max-Age=0/);
});

test("missing session is anonymous", () => {
  assert.equal(getSession({ headers: {} }), null);
});
