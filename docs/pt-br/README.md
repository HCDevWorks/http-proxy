<h1 align="center"> 🧭 HTTP Proxy Server </h1>

Um servidor proxy HTTP robusto e configurável, desenvolvido em TypeScript, com suporte a autenticação, controle de acesso por host e registro de logs. Ideal para cenários como bots do Discord, raspagem de dados e controle de tráfego.

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
pnpm build # compila o servidor

and

pnpm start # inicia o servidor
```

3. Configure o arquivo `.env`:

   ```env
   PORT=8888
   ENABLE_LOGS=true
   ENABLE_ERROR_LOGS=false
   PROXY_USERNAME=seu_usuario
   PROXY_PASSWORD=sua_senha
   ```

## 🛠️ Uso

Inicie o servidor proxy com:

```bash
pnpm start
```

O servidor estará escutando na porta definida em `PORT` (padrão: 8888).

## 📁 Estrutura do Projeto

```
http-proxy/
├── src/
│   ├── config/
│   │   └── config.ts       # Carrega as variáveis de ambiente
│   ├── logger/
│   │   └── logger.ts       # Configuração do Winston
│   └── server/
│       └── server.ts       # Lógica principal do servidor proxy
├── .env                    # Variáveis de ambiente
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── docs/
    └── pt-br/
        └── README.md       # Documentação em português brasileiro
```

## 📚 Documentação em Português

A documentação completa em português brasileiro está disponível em [`/docs/pt-br/README.md`](docs/pt-br/README.md).

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.