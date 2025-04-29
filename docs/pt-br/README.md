<h1 align="center"> 🧭 HTTP Proxy Server </h1>

<p align="center">
  <img src="../static/demo.gif">
</p>

<p align="center">
  <a href="../../README.md">English</a>
  | 
  Português
</p>

Um servidor proxy HTTP robusto e configurável, desenvolvido em TypeScript, com autenticação, controle de acesso por host e registro de logs. Ideal para cenários como bots do Discord, raspagem de dados e controle de tráfego.

## 🚀 Recursos

- 🔐 Autenticação básica via `config.toml`
- 🌐 Controle de acesso por host
- 📄 Registro de logs com Winston
- ⚙️ Configuração via `config.toml`
- 🧪 Estrutura modular e extensível

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/HCDevWorks/http-proxy.git
   cd http-proxy
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Configure o arquivo `config.toml` (veja o exemplo em `config.example.toml`):

   ```toml
   [server]
   port = 8888

   [logging]
   enableLogs = true
   enableErrorLogs = false

   [auth]
   username = "seu_usuario"
   password = "sua_senha"

   [allowed_hosts]
   hosts = ["google.com", "youtube.com"]
   ```

## 🛠️ Uso

Inicie o servidor proxy com:

```bash
pnpm build # compila o servidor

pnpm start # inicia o servidor
```

O servidor irá escutar na porta definida em `config.toml` (padrão: 8888).

## 🖥️ Rodando como serviço no Linux

Veja como criar um serviço systemd para rodar o proxy automaticamente no Linux em [`LINUX-SERVICE.md`](./LINUX-SERVICE.md).

## 📁 Estrutura do Projeto

```
http-proxy/
├── src/
│   ├── config/
│   │   ├── config.ts         # Carrega configuração do config.toml
│   │   └── loadConfig.ts     # Carrega e valida o config.toml
│   ├── core/
│   │   ├── logger.ts         # Configuração do logger Winston
│   │   └── server.ts         # Lógica principal do servidor proxy
│   └── types/
│       └── config.d.ts       # Tipos para configuração
├── tests/                    # Testes do proxy e benchmark
│   ├── testProxy.ts
│   └── testProxyBenchmark.ts
├── config.toml               # Arquivo principal de configuração
├── config.example.toml       # Exemplo de configuração
├── logs/                     # Arquivos de log
│   └── proxy.log
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── docs/
    └── pt-br/
        └── README.md         # Documentação em português brasileiro
```

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso [Código de Conduta](../../CODE_OF_CONDUCT.md) e [Guia de Contribuição](../../CONTRIBUTING.md) antes de abrir issues ou pull requests.

Também disponibilizamos templates para ajudar você:
- [Template de Issue](../../.github/ISSUE_TEMPLATE.md)
- [Template de Pull Request](../../.github/PULL_REQUEST_TEMPLATE.MD)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.