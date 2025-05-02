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

- 🔐 Basic authentication via `config.toml`
- 🌐 Host access control
- 📄 Logging with Winston
- ⚙️ **All configuration is loaded exclusively from `config.toml`**
- 🧪 Modular and extensible structure

> **Note:**  
> All configuration is centralized in the [`config.toml`](config.toml) file and loaded through the [`src/config/`](src/config/index.ts) module. No environment variables or other config files are used.

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

3. Configure the `config.toml` file (see `config.example.toml` for an example):

   ```toml
   [server]
   port = 8888

   [logging]
   enableLogs = true
   enableErrorLogs = false

   [auth]
   username = "your_username"
   password = "your_password"

   [allowed_hosts]
   hosts = ["google.com", "youtube.com"]
   ```

## 🛠️ Usage

Start the proxy server with:

```bash
pnpm build # build the server

pnpm start # start the server
```

The server will listen on the port defined in `config.toml` (default: 8888).

## 🖥️ Running as a Linux Service

See how to create a systemd service to run the proxy automatically on Linux in [`docs/LINUX-SERVICE.md`](docs/LINUX-SERVICE.md).

## 📁 Project Structure

```
http-proxy/
├── src/
│   ├── config/
│   │   ├── index.ts      # Loads and exports the validated config object
│   │   ├── loader.ts     # Loads and parses config.toml, validates with Zod
│   │   └── schema.ts     # Zod schema and types for config
│   ├── core/
│   │   ├── logger.ts     # Winston logger configuration
│   │   └── server.ts     # Main proxy server logic
│   └── index.ts          # Entry point
├── tests/
│   ├── testProxy.ts
│   └── testProxyBenchmark.ts
├── config.toml
├── config.example.toml
├── logs/
│   └── proxy.log
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── docs/
    ├── LINUX-SERVICE.md
    └── pt-br/
        ├── LINUX-SERVICE.md
        └── README.md
```

## 🤝 Contributing

Contributions are welcome! Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) and [Contributing Guidelines](./CONTRIBUTING.md) before opening issues or pull requests.

We also provide templates to help you:
- [Issue Template](./.github/ISSUE_TEMPLATE.md)
- [Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.MD)

## 📄 License

This project is licensed under the MIT License.