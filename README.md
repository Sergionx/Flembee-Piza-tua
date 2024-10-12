# Proyecto Fullstack con Next.js y Express

Este proyecto es una aplicación fullstack que utiliza Next.js para el frontend y Express para el backend. A continuación, se detallan las instrucciones para configurar y ejecutar el proyecto localmente.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (o cualquier otra base de datos compatible con Prisma)

## Configuración del Backend

1. Clona el repositorio y navega al directorio `backend`:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en el directorio `backend` y añade las siguientes variables de entorno:

   ```env
   DATABASE_URL="postgresql://<usuario>:<contraseña>@<host>:<puerto>/<nombre_base_de_datos>?schema=public"
   JWT_SECRET="tu_secreto_jwt"
   ```

4. Ejecuta las migraciones de Prisma para configurar la base de datos:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

   El servidor backend estará disponible en [http://localhost:3001](http://localhost:3001).

## Configuración del Frontend

1. Navega al directorio 

frontend

:

   ```bash
   cd ../frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en el directorio 

frontend

 y añade las siguientes variables de entorno:

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

   La aplicación frontend estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de directorios:

```
backend/
	.env
	.gitignore
	environment.d.ts
	package.json
	prisma/
		migrations/
		schema.prisma
	src/
		api/
		index.ts
		lib/
	tsconfig.json
	tsconfig.tsbuildinfo
frontend/
	.env
	.eslintrc.json
	.gitignore
	.next/
		app-build-manifest.json
		build-manifest.json
		cache/
		package.json
		react-loadable-manifest.json
		server/
		static/
		...
	components.json
	next-env.d.ts
	next.config.mjs
	package.json
	postcss.config.mjs
	README.md
	src/
		...
	tailwind.config.ts
	tsconfig.json
recetas.xlsx
```

En cuanto a las rutas del frontend se encuentran:
- /users
- /ingredients
- /stats
- /login
- /register

## Scripts Disponibles

### Backend

- `npm run dev` / `yarn dev`: Inicia el servidor de desarrollo.
- `npm run build` / `yarn build`: Compila el proyecto TypeScript.
- `npm start` / `yarn start`: Inicia el servidor en modo producción.

### Frontend

- `npm run dev` / `yarn dev`: Inicia el servidor de desarrollo.
- `npm run build` / `yarn build`: Compila la aplicación para producción.
- `npm start` / `yarn start`: Inicia el servidor en modo producción.

## Recursos Adicionales

Para aprender más sobre las tecnologías utilizadas en este proyecto, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría realizar.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

Este archivo `README.md` proporciona instrucciones claras sobre cómo configurar y ejecutar el proyecto localmente, así como una descripción de la estructura del proyecto y los scripts disponibles.Este archivo `README.md` proporciona instrucciones claras sobre cómo configurar y ejecutar el proyecto localmente, así como una descripción de la estructura del proyecto y los scripts disponibles.
