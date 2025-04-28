<h1 align="center"> 🧭 HTTP Proxy Server </h1>

<p align="center">
  <img src="./docs/static/demo.gif">
</p>

<p align="center">
   English
   | 
  <a href="./docs/pt-br/README.md">Português</a>
</p>

A robust and configurable HTTP proxy server developed in TypeScript, featuring authentication, host access control, and logging. Ideal for scenarios such as Discord bots, data scraping, and traffic control.

## 🚀 Features

- 🔐 Basic authentication via `.env`
- 🌐 Host access control
- 📄 Logging with Winston
- ⚙️ Configuration via environment variables
- 🧪 Modular and extensible structure

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HCDevWorks/http-proxy.git
   cd http-proxy
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Configure the `.env` file:

   ```env
   PORT=8888
   ENABLE_LOGS=true
   ENABLE_ERROR_LOGS=false
   PROXY_USERNAME=your_username
   PROXY_PASSWORD=your_password
   ALLOWED_HOSTS='google.com','youtube.com'
   ```
## 🛠️ Usage

Start the proxy server with:

```bash
pnpm build # build the server

and

pnpm start # start the server
```

The server will listen on the port defined in `PORT` (default: 8888).

## 🖥️ Running as a Linux Service

See how to create a systemd service to run the proxy automatically on Linux in [`docs/linux-service.md`](./docs/LINUX-SERVICE.md).

## 📁 Project Structure

```
http-proxy/
├── src/
│   ├── config/
│   │   └── config.ts       # Loads environment variables
│   ├── logger/
│   │   └── logger.ts       # Winston logger configuration
│   └── server/
│       └── server.ts       # Main proxy server logic
├── tests/                  # Proxy and benchmark tests
│   ├── testProxy.ts
│   └── testProxyBenchmark.ts
├── .env                    # Environment variables
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── docs/
    └── pt-br/
        └── README.md       # Documentation in Brazilian Portuguese
```

## 🤝 Contributing

Contributions are welcome! Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) and [Contributing Guidelines](./CONTRIBUTING.md) before opening issues or pull requests.

We also provide templates to help you:
- [Issue Template](./.github/ISSUE_TEMPLATE.md)
- [Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.MD)

## 📄 License

This project is licensed under the MIT License.
