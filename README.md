
# Time-To-Party

## Introdução

O Time-To-Party é um projeto de software desenvolvido para auxiliar na organização e gestão de eventos festivos. Este repositório contém tanto o backend quanto o frontend da aplicação, proporcionando uma solução completa para gerenciar funcionalidades relacionadas a festas.

## Sumário

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Executando com Docker](#executandocomdocker)
- [Funcionalidades](#funcionalidades)
- [Dependências](#dependências)
- [Documentação](#documentação)
- [Exemplos](#exemplos)
- [Contribuidores](#contribuidores)
- [Licença](#licença)

## Instalação

Para executar este projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jomatheux/Time-To-Party.git
   ```

2. **Acesse o diretório do projeto:**

   ```bash
   cd Time-To-Party
   ```

3. **Instale as dependências do backend:**

   ```bash
   cd backend
   npm install
   ```

4. **Instale as dependências do frontend:**

   ```bash
   cd ../frontend
   npm install
   ```
## Configuração

As configurações da aplicação podem ser ajustadas nas variáveis de ambiente do backend. Crie um arquivo `.env` no diretório `backend` com os seguintes parâmetros:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Certifique-se de que o MongoDB esteja em execução e acessível pela URI fornecida.

## Uso

Após a instalação, você pode iniciar a aplicação com os seguintes comandos:

1. Inicie o servidor backend:

   ```bash
   cd backend
   npm start
   ```

2. Inicie o servidor frontend:

   ```bash
   cd ../frontend
   npm start
   ```

A aplicação estará disponível no endereço padrão:

```
http://localhost:3000
```
## Executando com Docker

Para executar a aplicação usando Docker, siga os passos abaixo:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jomatheux/Time-To-Party.git
   cd Time-To-Party
   ```
2. Inicie o servidor backend:

   ```bash
   cd backend
   docker-compose up --build
   ```

2. Inicie o servidor frontend:

   ```bash
   cd ../frontend
   docker-compose up --build
   ```

## Funcionalidades

O Time-To-Party inclui as seguintes funcionalidades:

- **Gerenciamento de Eventos:** Adicione, edite e remova festas.
- **Cadastro de usuários:** Crie seu usuário e gerencie suas festas.
- **Adicionar serviços nas festas:** Adicione seus serviços em suas festas.
## Dependências

O projeto utiliza as seguintes dependências principais:

- **Backend:**
  - Node.js
  - Express
  - Mongoose
  - Jsonwebtoken
  - Nodemon
  - Bcrypt
  - Dotenv
  - Outras dependências listadas no `package.json`

- **Frontend:**
  - React
  - Axios
  - React-router-dom
  - React-toastify
  - Outras dependências listadas no `package.json`

## Exemplos

Abaixo está um exemplo de como testar a aplicação:

1. Abra o navegador e vá para `http://localhost:3000`.
2. Utilize ferramentas como o [Postman](https://www.postman.com/) para testar os endpoints da API.

## Contribuidores

Este projeto foi desenvolvido por:

- [João Matheus Magalhães](https://www.linkedin.com/in/joão-matheus-magalhães-692074297)

Sinta-se à vontade para contribuir ou abrir issues no repositório.

