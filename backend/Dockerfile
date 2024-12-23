FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /backend

# Copie apenas os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instala as dependências diretamente no ambiente do container
RUN npm install

# Copia o restante do código para o container
COPY . .

# Expor a porta 5000
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

