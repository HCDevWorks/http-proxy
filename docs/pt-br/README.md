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

- 🔐 Autenticação básica via `.env`
- 🌐 Controle de acesso por host
- 📄 Registro de logs com Winston
- ⚙️ Configuração via variáveis de ambiente
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

3. Configure o arquivo `.env`:

   ```env
   PORT=8888
   ENABLE_LOGS=true
   ENABLE_ERROR_LOGS=false
   PROXY_USERNAME=seu_usuario
   PROXY_PASSWORD=sua_senha
   ALLOWED_HOSTS='google.com','youtube.com'
   ```
   
## 🛠️ Uso

Inicie o servidor proxy com:

```bash
pnpm build # compila o servidor

e então

pnpm start # inicia o servidor
```

O servidor irá escutar na porta definida em `PORT` (padrão: 8888).

## 🖥️ Rodando como serviço no Linux

Veja como criar um serviço systemd para rodar o proxy automaticamente no Linux em [`LINUX-SERVICE.md`](./LINUX-SERVICE.md).
## 📁 Estrutura do Projeto

```
http-proxy/
├── src/
│   ├── config/
│   │   └── config.ts       # Carrega variáveis de ambiente
│   ├── logger/
│   │   └── logger.ts       # Configuração do logger Winston
│   └── server/
│       └── server.ts       # Lógica principal do servidor proxy
├── tests/                  # Testes do proxy e de benchmark
│   ├── testProxy.ts
│   └── testProxyBenchmark.ts
├── .env                    # Variáveis de ambiente
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── docs/
  └── pt-br/
    └── README.md       # Documentação em português brasileiro
```

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso [Código de Conduta](../../CODE_OF_CONDUCT.md) e [Guia de Contribuição](../../CONTRIBUTING.md) antes de abrir issues ou pull requests.

Também disponibilizamos templates para ajudar você:
- [Template de Issue](../../.github/ISSUE_TEMPLATE.md)
- [Template de Pull Request](../../.github/PULL_REQUEST_TEMPLATE.MD)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.