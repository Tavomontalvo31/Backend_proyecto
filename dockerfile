#1. Imagen base
From node:18-alpine

#2. carpeta de trabajo
WORKDIR /app

#3. Instalacion de dependencias
COPY package*.json ./
RUN npm install

#4. copiar el resto del codigo
COPY . .

#5. Exponer puerto interno de la app
EXPOSE 3000

#6. comando de arranque
CMD ['node', "index.js"]