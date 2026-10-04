<div align="center">

  <br />

  
  <h1 align="center">🦅 KESTERAL AI Threat Analyzer</h1>

  <p align="center">
    <strong>Next-Gen AI Powered Threat Analysis & Deception Platform</strong>
    <br />
    <br />
    <a href="https://kestrel-ai-threat-analyzer.vercel.app"><strong>🔴 View Live Demo</strong></a>
    ·
    <a href="https://github.com/iprsnmsra/KESTERAL-AI-Threat-Analyzer/issues">Report Bug</a>
    ·
    <a href="https://github.com/iprsnmsra/KESTERAL-AI-Threat-Analyzer/pulls">Request Feature</a>
  </p>
</div>

<div align="center">
  
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![License](https://img.shields.io/github/license/iprsnmsra/KESTERAL-AI-Threat-Analyzer?style=for-the-badge&color=blue)
![Repo Size](https://img.shields.io/github/repo-size/iprsnmsra/KESTERAL-AI-Threat-Analyzer?style=for-the-badge&color=green)

</div>

<br />

<details>
  <summary><strong>🔍 Table of Contents</strong></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## 🛡️ About The Project

**KESTERAL AI** is a cutting-edge web platform designed to assist security researchers and SOC analysts in identifying potential threats through advanced visualization and AI-driven heuristics. 

Unlike traditional static analyzers, KESTERAL integrates a **Deception Platform** methodology, allowing you to study threat behavior in a controlled, interactive environment. Whether you are analyzing network logs or simulating attack vectors, KESTERAL provides the clarity needed to make informed defense decisions.

### ⚡ Why KESTERAL?
* **Instant Analysis:** Rapidly process threat data directly from the web interface.
* **Deception Tech:** Utilize bait mechanisms to study attacker interaction.
* **Zero-Setup:** Fully deployed on Vercel for immediate access, or self-hostable via Node.js.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| 🤖 **AI-Assisted Analysis** | Uses heuristic algorithms to flag anomalies in provided datasets. |
| 🕸️ **Deception Modules** | Simulates vulnerable endpoints to trap and analyze malicious intent. |
| 📊 **Visual Dashboard** | Interactive charts and graphs for network traffic and threat levels. |
| ⚡ **Real-time API** | Built-in API endpoints for fetching latest threat intelligence. |
| ☁️ **Cloud Native** | Optimized for serverless deployment on Vercel. |

---

## 💻 Tech Stack

This project is built using modern web technologies to ensure speed, scalability, and ease of use.

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Runtime:** Node.js
* **Deployment:** [Vercel](https://vercel.com/)
* **Package Manager:** NPM / Yarn

```mermaid
graph TD
    %% Define Nodes
    Client[💻 React.js Frontend Dashboard]
    API[⚙️ Node.js / Express API Gateway]
    DB[(🍃 MongoDB Threat Database)]
    LLM{🧠 Gemini 2.5 Flash API}

    %% Define Connections
    Client -->|1. Submits telemetry/logs| API
    API -->|2. Queries historical threats| DB
    API -->|3. Sends payload for analysis| LLM
    LLM -->|4. Returns Threat Assessment| API
    API -->|5. Stores new threat data| DB
    API -->|6. Sends JSON Response| Client

    %% Styling
    style Client fill:#00d8ff,stroke:#333,stroke-width:2px,color:#000
    style API fill:#68a063,stroke:#333,stroke-width:2px,color:#000
    style DB fill:#4db33d,stroke:#333,stroke-width:2px,color:#000
    style LLM fill:#ff9900,stroke:#333,stroke-width:2px,color:#000
```
    
---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* **Node.js** (v14 or higher recommended)
* **npm**

### Installation

1.  **Clone the Repo**
    ```bash
    git clone [https://github.com/iprsnmsra/KESTERAL-AI-Threat-Analyzer.git](https://github.com/Mr-DaRkAgeNt/KESTERAL-AI-Threat-Analyzer.git)
    cd KESTERAL-AI-Threat-Analyzer
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Local Server**
    ```bash
    npm start
    # OR
    node index.js
    ```

4.  **Access the Dashboard**
    Open your browser and navigate to `http://localhost:3000` (or the port specified in your console).

### Authentication and private history

The dashboard works anonymously, but saving previous analyses requires a signed-in account. Google and GitHub OAuth both return to `/api/auth/callback`; register that exact callback URL in each provider, then set the corresponding client credentials. Sessions are signed with `AUTH_SESSION_SECRET` and stored in an HTTP-only, Secure cookie. No provider tokens are persisted.

Connect a Neon/Vercel Postgres storage integration so the deployment provides `DATABASE_URL` (or `POSTGRES_URL`), then run [`sql/001_threat_analyses.sql`](sql/001_threat_analyses.sql) once against that database. The `threat_analyses` table is keyed by the provider subject (`google:<sub>` or `github:<id>`), so history is isolated per authenticated user.

Copy `.env.example` to your deployment environment and configure:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API key used by `/api/analyze` |
| `AUTH_SESSION_SECRET` | Long random secret for signing sessions |
| `APP_URL` | Public origin, without a trailing slash |
| `DATABASE_URL` / `POSTGRES_URL` | Neon-compatible Postgres connection string |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth web application credentials |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth application credentials |

Never commit real values. For local development, use a Vercel-linked environment (`vercel dev`) or another serverless-compatible runner; opening `index.html` directly keeps the safe local preview mode but cannot exercise OAuth or durable history.

### Vercel deployment checklist

The repository includes `vercel.json`; Vercel will serve `index.html` and discover the serverless functions under `api/`. From the repository root:

```bash
npm install
npx vercel
npx vercel --prod
```

In the Vercel project dashboard, open **Settings → Environment Variables** and add the variables in `.env.example` for the **Production** environment. Use Vercel's encrypted fields or the CLI prompts below—never place secrets in `README.md`, `.env.example`, GitHub issues, or chat:

```bash
vercel env add GEMINI_API_KEY production
vercel env add AUTH_SESSION_SECRET production
vercel env add APP_URL production
vercel env add DATABASE_URL production
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add GITHUB_CLIENT_ID production
vercel env add GITHUB_CLIENT_SECRET production
```

After the first production deployment:

1. Set `APP_URL` to the exact HTTPS deployment or custom-domain origin, without a trailing slash.
2. Register `${APP_URL}/api/auth/callback` as the OAuth callback URL in both Google Cloud Console and the GitHub OAuth App.
3. Connect Neon/Postgres and run `sql/001_threat_analyses.sql` once using that database's SQL console.
4. Redeploy after changing environment variables: `npx vercel --prod`.

Only `GEMINI_API_KEY` is needed for anonymous analysis. OAuth and saved history remain intentionally unavailable until their provider and database variables are configured.

---

## 🛣️ Roadmap

- [x] **Phase 1:** Core UI & Basic Deception Modules (Released)
- [x] **Phase 2:** Integration with VirusTotal API
- [ ] **Phase 3:** Dark Mode & Mobile Responsiveness
- [ ] **Phase 4:** Docker Container Support
- [ ] **Phase 5:** Multi-Language Localization

See the [open issues](https://github.com/iprsnmsra/KESTERAL-AI-Threat-Analyzer/issues) for a full list of proposed features.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Mr-DaRkAgeNt/KESTERAL-AI-Threat-Analyzer&type=Date)](https://star-history.com/#Mr-DaRkAgeNt/KESTERAL-AI-Threat-Analyzer&Date)

---
<!-- YOLO -->.

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 📞 Contact

**iprsnmsra** - [GitHub Profile](https://github.com/iprsnmsra)

Project Link: [https://github.com/iprsnmsra/KESTERAL-AI-Threat-Analyzer](https://github.com/iprsnmsra/KESTERAL-AI-Threat-Analyzer)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00f2ea,100:000000&height=120&section=footer" width="100%"/>
</p> 

 
