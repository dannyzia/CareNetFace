# Deployment Guide - CareNet2-Marketing (Live Hosting)

## Overview

This document provides a complete, step-by-step deployment workflow for CareNet2-Marketing to a production server using SSH and file transfer. The target server and deployment path are explicitly defined.

- SSH hostname: `ssh.gb.stackcp.com`
- Username: `digital-papyrus.xyz`
- Deployment destination path: `/home/sites/34b/8/800abb2537/public_html/carenet`
- Public key format: OpenSSH `authorized_keys`

## 1. Prerequisites

1. Workstation setup
   - Git installed (`git --version`).
   - Node.js and npm installed (`node --version`, `npm --version`).
   - Optional: a code editor (VS Code recommended).

2. Build assets available
   - Ensure your app can build with Vite.
   - `npm install` and `npm run build` should complete without errors.
   - Build outputs should be present in `dist/` (for default Vite setup) or the configured output directory.

3. SSH tool on local machine
   - Linux/macOS: built-in `ssh`, `scp`, `rsync`.
   - Windows: OpenSSH client in PowerShell/Command Prompt, or use Git Bash, WSL, or PuTTY.

4. Public key pair
   - Generate key pair if not already present:
     ```bash
     ssh-keygen -t ed25519 -C "carenet@local" -f ~/.ssh/carenet_deploy
     # or RSA
     ssh-keygen -t rsa -b 4096 -C "carenet@local" -f ~/.ssh/carenet_deploy
     ```
   - Private key file: `~/.ssh/carenet_deploy`
   - Public key file: `~/.ssh/carenet_deploy.pub`

## 2. SSH Configuration

1. Ensure remote account has key-based access enabled.
   - If this is a managed hosting panel, login to control panel and add the public key under SSH access section.

2. Prepare authorized_keys entry
   - Open the public key file:
     ```bash
     cat ~/.ssh/carenet_deploy.pub
     ```
   - Copy the full line (starts with `ssh-ed25519` or `ssh-rsa`).

3. Add to remote `authorized_keys` (if manual login allowed)
   - Connect via existing credentials (if available):
     ```bash
     ssh existing-user@ssh.gb.stackcp.com
     ```
   - Create `.ssh` directory for `digital-papyrus.xyz` user if not present:
     ```bash
     mkdir -p ~/.ssh
     chmod 700 ~/.ssh
     ```
   - Append public key:
     ```bash
     echo "<your-public-key-line>" >> ~/.ssh/authorized_keys
     chmod 600 ~/.ssh/authorized_keys
     ```

4. Local SSH config (convenience)
   - Edit `~/.ssh/config` and add:
     ```text
     Host carenet-live
       HostName ssh.gb.stackcp.com
       User digital-papyrus.xyz
       IdentityFile ~/.ssh/carenet_deploy
       IdentitiesOnly yes
       StrictHostKeyChecking accept-new
     ```
   - Verify permissions:
     ```bash
     chmod 600 ~/.ssh/config
     ```

## 3. Connection Verification

1. Basic SSH test
   ```bash
   ssh carenet-live
   ```
   or
   ```bash
   ssh -i ~/.ssh/carenet_deploy digital-papyrus.xyz@ssh.gb.stackcp.com
   ```

2. Expected result
   - Prompt should connect without password prompt (unless passphrase protected).
   - You should land in a shell at `/home/sites/34b/8/800abb2537` or similar.

3. Check ownership and destination path
   ```bash
   pwd
   ls -la /home/sites/34b/8/800abb2537/public_html/carenet
   ```

4. Troubleshooting
   - Connection refused:
     - Verify host name and network.
     - Ping server: `ping ssh.gb.stackcp.com`.
   - Permission denied:
     - Confirm key is in `authorized_keys` in OpenSSH format.
     - Check remote `~/.ssh` and `authorized_keys` permissions (700/600).
   - Host key mismatch:
     - Remove old entry: `ssh-keygen -R ssh.gb.stackcp.com`.

## 4. File Transfer Process

1. Build app locally
   ```bash
   npm install
   npm run build
   ```

2. Confirm build artifacts
   - Source directory and output path, typically:
     - `dist/index.html`
     - `dist/assets/`

3. Sync files using rsync (recommended)
   ```bash
   rsync -avz --delete --progress dist/ carenet-live:/home/sites/34b/8/800abb2537/public_html/carenet/
   ```
   - `--delete` removes old files from destination that are no longer present locally.
   - If `rsync` unavailable on Windows, use WSL or Git Bash.

4. Alternative using scp
   ```bash
   scp -i ~/.ssh/carenet_deploy -r dist/* digital-papyrus.xyz@ssh.gb.stackcp.com:/home/sites/34b/8/800abb2537/public_html/carenet/
   ```

5. Alternative using SFTP
   ```bash
   sftp -i ~/.ssh/carenet_deploy digital-papyrus.xyz@ssh.gb.stackcp.com
   cd /home/sites/34b/8/800abb2537/public_html/carenet
   put -r dist/*
   bye
   ```

6. Verify files on server
   ```bash
   ssh carenet-live "ls -la /home/sites/34b/8/800abb2537/public_html/carenet"
   ```
   - Confirm `index.html`, `assets/`, and any static resources are there.

7. Set file permissions (if needed)
   ```bash
   ssh carenet-live "chmod -R 755 /home/sites/34b/8/800abb2537/public_html/carenet"
   ```

8. Apache/nginx rewrite support (if using SPA)
   - Ensure `.htaccess` is deployed to this folder and contains SPA rewrite rules:
     ```apacheconf
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule ^ index.html [L,QSA]
     </IfModule>
     ```

9. Post-deploy verification
   - Open browser:
     `https://your-domain.com/` (actual domain mapped to server).
   - Check main pages and SPA routes.
   - Clear cache or hard reload if assets appear stale.

## 5. Troubleshooting Tips

- Deploy mismatch for SPA routes: validate `.htaccess` and app `base` path (in `vite.config.ts`).
- Intermittent upload issue: retry `rsync` or use archive upload: `tar -czf release.tar.gz dist && scp release.tar.gz ... && ssh carenet-live "cd target && tar -xzf release.tar.gz"`.
- Permission LDAP-auth errors: verify the user `digital-papyrus.xyz` has write access to the target path.
- Public key authentication fallback: keep a secondary admin credential or panel login for recovery.

## 6. Rollback Strategy

- Keep the previous release snapshot or `dist` artifacts.
- On remote host:
  ```bash
  cp -r /home/sites/34b/8/800abb2537/public_html/carenet /home/sites/34b/8/800abb2537/public_html/carenet-backup-$(date +%Y%m%d%H%M)
  ```
- Rollback by syncing previous build back to `public_html/carenet`.

## 7. Optional: Automation

- For CI/CD, configure pipeline to run build and deploy via SSH key with rsync.
- Validate deploy with `curl -I https://your-domain.com` and smoke-check expected status 200.
