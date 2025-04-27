# 🖥️ Running the Proxy as a Service on Linux (systemd)

This guide shows how to configure the HTTP Proxy to run automatically as a service on Linux using `systemd`.

---

## 1. Create the service file

Create a file named `proxy.service` in `/etc/systemd/system/`:

```ini
[Unit]
Description=HTTP Proxy Server (Node.js)
After=network.target

[Service]
User=exampleuser
WorkingDirectory=/path/to/http-proxy
EnvironmentFile=/path/to/file/.env
ExecStart=path/to/bin/node /path/to/http-proxy/dist/index.js
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

> **Note:**  
> - Adjust the paths according to your environment (user, project directory, Node.js version).
> - The `EnvironmentFile` line ensures that variables from `.env` are loaded.

---

## 2. Enable and start the service

```bash
sudo systemctl daemon-reload
sudo systemctl enable proxy.service
sudo systemctl start proxy.service
```

---

## 3. Real-time logs

With the `StandardOutput=journal` and `StandardError=journal` options, view real-time logs with:

```bash
sudo journalctl -u proxy.service -f
```

---

## 4. Automatic restart via cron

To ensure the service restarts every 2 hours, add this line to the root user's crontab:

```cron
0 */2 * * * /bin/systemctl restart proxy.service
```

Edit the root crontab with:

```bash
sudo crontab -e
```

---

## 5. Tips

- To check the service status:
  ```bash
  sudo systemctl status proxy.service
  ```
- To restart manually:
  ```bash
  sudo systemctl restart proxy.service
  ```

---

Done! Your proxy will now run automatically as a service on Linux.