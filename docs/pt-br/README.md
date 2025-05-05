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
- ⚙️ **Toda a configuração é carregada exclusivamente do `config.toml`**
- 🧪 Estrutura modular e extensível

> **Atenção:**  
> Toda a configuração é centralizada no arquivo [`config.toml`](../../config.toml) e carregada pelo módulo [`src/config/`](../../src/config/index.ts). Não são usados variáveis de ambiente ou outros arquivos de configuração.

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
   # Ou para permitir todos os hosts:
   # hosts = "*"
   ```

> **Atenção:**  
> Para permitir conexões de qualquer host, defina `hosts = "*"` em `[allowed_hosts]`.  
> Para restringir, use uma lista de domínios, como `hosts = ["google.com", "youtube.com"]`.

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
│   │   ├── index.ts      # Carrega e exporta o objeto de configuração validado
│   │   ├── loader.ts     # Carrega e faz o parse do config.toml, valida com Zod
│   │   └── schema.ts     # Schema Zod e tipos para configuração
│   ├── core/
│   │   ├── logger.ts     # Configuração do logger Winston
│   │   └── server.ts     # Lógica principal do servidor proxy
│   └── index.ts          # Ponto de entrada
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

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso [Código de Conduta](../../CODE_OF_CONDUCT.md) e [Guia de Contribuição](../../CONTRIBUTING.md) antes de abrir issues ou pull requests.

Também disponibilizamos templates para ajudar você:
- [Template de Issue](../../.github/ISSUE_TEMPLATE.md)
- [Template de Pull Request](../../.github/PULL_REQUEST_TEMPLATE.MD)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.