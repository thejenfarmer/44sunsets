# Deploy 44 Sunsets

Front-end-only demo. No backend, no env vars.

## Put it on GitHub (repo: thejenfarmer/44sunsets), preserving the old app

`main` becomes this demo; the previous ADHD OS app is saved on an `adhd-os` branch.

```bash
git clone 44sunsets-app.bundle 44sunsets
cd 44sunsets
git remote set-url origin https://github.com/thejenfarmer/44sunsets.git

# save the current main (ADHD OS) onto an adhd-os branch
git fetch origin main
git branch adhd-os origin/main
git push origin adhd-os

# replace main with this demo
git push --force origin main
```

Auth: username `thejenfarmer`, password = a GitHub Personal Access Token
(github.com/settings/tokens → Generate new token (classic) → tick `repo`).

## Deploy on Vercel (free, public link)

1. vercel.com → Add New → Project → import `thejenfarmer/44sunsets`.
2. Framework preset auto-detects **Vite**. No settings, no env vars.
3. Deploy → share the `*.vercel.app` URL.

Vercel builds `main` by default (the demo). The `adhd-os` branch stays preserved.

## Local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build
```
