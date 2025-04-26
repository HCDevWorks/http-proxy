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
   ```

## 🛡️ Hosts Permitidos

O servidor proxy restringe conexões de saída a uma lista específica de hosts permitidos para segurança e controle.  
Você pode configurar quais domínios são permitidos editando o array `allowedHosts` em [`src/core/server.ts`](src/core/server.ts):

```typescript
const allowedHosts = [
  'discord.com',
  'youtube.com',
  'googlevideo.com',
];
```

Somente requisições para hosts que incluam uma dessas strings serão permitidas pelo proxy.  
Para permitir mais domínios, basta adicioná-los ao array.  
Se um cliente tentar acessar um host não listado, a conexão será bloqueada e registrada no log.

## 🛠️ Uso

Inicie o servidor proxy com:

```bash
pnpm build # compila o servidor

e então

pnpm start # inicia o servidor
```

O servidor irá escutar na porta definida em `PORT` (padrão: 8888).

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

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.