# 🖥️ Rodando o Proxy como Serviço no Linux (systemd)

Este guia mostra como configurar o HTTP Proxy para rodar automaticamente como um serviço no Linux usando o `systemd`.

---

## 1. Crie o arquivo de serviço

Crie um arquivo chamado `proxy.service` em `/etc/systemd/system/`:

```ini
[Unit]
Description=HTTP Proxy Server (Node.js)
After=network.target

[Service]
User=dino
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

> **Atenção:**  
> - Ajuste os caminhos de acordo com o seu ambiente (usuário, diretório do projeto, versão do Node.js).
> - A linha `EnvironmentFile` garante que as variáveis do `.env` sejam carregadas.

---

## 2. Habilite e inicie o serviço

```bash
sudo systemctl daemon-reload
sudo systemctl enable proxy.service
sudo systemctl start proxy.service
```

---

## 3. Logs em tempo real

Com as opções `StandardOutput=journal` e `StandardError=journal`, visualize os logs em tempo real com:

```bash
sudo journalctl -u proxy.service -f
```

---

## 4. Reinício automático via cron

Para garantir que o serviço seja reiniciado a cada 2 horas, adicione esta linha ao crontab do root:

```cron
0 */2 * * * /bin/systemctl restart proxy.service
```

Edite o crontab do root com:

```bash
sudo crontab -e
```

---

## 5. Dicas

- Para verificar o status do serviço:
  ```bash
  sudo systemctl status proxy.service
  ```
- Para reiniciar manualmente:
  ```bash
  sudo systemctl restart proxy.service
  ```

---

Pronto! Agora seu proxy será executado automaticamente como serviço no Linux.