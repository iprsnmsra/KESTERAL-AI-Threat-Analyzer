# Kestrel AI design direction

## Signal room

Kestrel is an **Operate** surface for analysts who need a fast, defensible decision from an uncertain URL or message. The interface uses a light, cool paper surface for long sessions, dark teal for trust and primary actions, and restrained semantic amber/red for findings.

- **Geometry:** a two-column workspace on wide screens; the scan task leads and private history stays secondary. At narrow widths the same order becomes one column.
- **Type:** DM Sans carries all interface copy and Space Mono is reserved for compact system metadata.
- **Materials:** thin cool-gray borders, white work surfaces, soft offset shadows, and one authored result reveal. No decorative glass or neon glow.
- **States:** teal success/primary, amber review, red action-needed, plus explicit loading, error, empty, signed-out, and reduced-motion behavior.
- **Motion:** the initial mark is a brief orientation cue; scan loading communicates work; result reveal uses a bounded blur/translate arrival. `prefers-reduced-motion` disables nonessential movement.

The result contract remains the existing `{ verdict, risk_score, summary, details }` response shape, while authenticated users can opt into durable history.
