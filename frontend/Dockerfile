# Etapa 1: Construção
FROM node:18 AS build

# Definir o diretório de trabalho
WORKDIR /usr/src

# Copiar os arquivos necessários
COPY package*.json ./
COPY vite.config.js ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código para dentro do container
COPY . .

# Construir o projeto
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM nginx:stable-alpine

# Copiar os arquivos construídos para o diretório padrão do nginx
COPY --from=build /usr/src/dist /usr/share/nginx/html

# Expor a porta usada pelo nginx
EXPOSE 80

# Iniciar o servidor nginx
CMD ["nginx", "-g", "daemon off;"]
