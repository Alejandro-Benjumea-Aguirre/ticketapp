# TicketApp API

REST API backend para la gestión de tickets de soporte técnico. Permite a los usuarios autenticarse y gestionar tickets, clientes, sedes, roles, permisos, encuestas, preformas y comentarios según su rol dentro del sistema.

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| **Node.js** | >= 18 | Runtime |
| **Express** | 4.18 | Framework HTTP |
| **PostgreSQL** | >= 14 | Base de datos relacional (Sequelize ORM) |
| **MongoDB** | >= 6 | Base de datos no relacional (Mongoose) |
| **JWT** | — | Autenticación mediante cookies HTTP-only |
| **bcrypt** | — | Hash de contraseñas |
| **Helmet** | — | Headers de seguridad HTTP |
| **express-mongo-sanitize** | — | Prevención de inyección NoSQL |
| **hpp** | — | Prevención de HTTP Parameter Pollution |
| **Multer** | — | Carga de archivos |
| **Nodemailer** | — | Envío de correos electrónicos |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- [PostgreSQL](https://www.postgresql.org/) >= 14 en ejecución
- [MongoDB](https://www.mongodb.com/) >= 6 en ejecución (local o Atlas)
- npm >= 9

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Alejandro-Benjumea-Aguirre/ticketapp.git
cd ticketapp

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales (ver sección Variables de entorno)

# 4. Crear la base de datos en PostgreSQL
# Asegúrate de que PostgreSQL esté corriendo y crea la base de datos manualmente:
# CREATE DATABASE ticketapp;

# 5. Ejecutar las migraciones (crea todas las tablas)
npx sequelize-cli db:migrate

# 6. Ejecutar los seeders (carga datos iniciales: estados, roles y usuario admin)
npx sequelize-cli db:seed:all

# 7. Iniciar el servidor en modo desarrollo
npm run dev
```

El servidor arranca por defecto en `http://localhost:8000`.

> **Credenciales iniciales del administrador:**
> - Usuario: `admin`
> - Contraseña: `Admin123!`
> - Email: `admin@ticketapp.com`

---

## Variables de entorno

Crea el archivo `.env` en la raíz del proyecto con los siguientes valores:

```env
# Puerto del servidor (por defecto 8000)
PORT=8000

# URL base (opcional, para documentación)
PORT_URL=http://localhost:8000

# Base de datos PostgreSQL
HOST=localhost
DB_NAME=ticketapp
DB_USER=postgres
DB_PASSWORD=tu_password

# Base de datos MongoDB
MONGO_URI=mongodb://localhost:27017/ticketapp

# Entorno de ejecución: development | production
NODE_ENV=development

# Origenes permitidos para CORS (separados por coma)
CORS_ORIGIN=http://localhost:5173

# Clave secreta para firmar los JWT (mínimo 64 caracteres aleatorios)
SECRETORPRIVATEDKEY=una_clave_secreta_muy_larga_y_segura

# Configuración del servidor de correo SMTP
SMTP_HOST=smtp.tuservidor.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=correo@tudominio.com
SMTP_PASS=tu_password_de_correo
```

> **Nota:** Si tu base de datos PostgreSQL está en la nube y requiere SSL, descomenta las opciones `dialectOptions` en `config/postgresql.js`.

---

## Estructura del proyecto

```
ticketapp/
├── app.js                          # Entry point
├── config/
│   ├── postgresql.js               # Conexión Sequelize (PostgreSQL)
│   └── mongodb.js                  # Conexión Mongoose (MongoDB)
├── app/
│   ├── models/
│   │   └── server.js               # Clase Server (Express + middlewares + rutas)
│   ├── routes/
│   │   ├── index.js                # Cargador dinámico de rutas
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── tickets.js
│   │   ├── customers.js
│   │   ├── campus.js
│   │   ├── roles.js
│   │   ├── permissions.js
│   │   ├── contacts.js
│   │   ├── typeUser.js
│   │   ├── bitacora.js
│   │   ├── preforms.js
│   │   ├── survey.js
│   │   └── ticketComment.js
│   ├── components/                 # Lógica por entidad (controller / service / repositorie / model)
│   │   ├── auth/
│   │   ├── users/
│   │   ├── tickets/
│   │   ├── customers/
│   │   ├── campus/
│   │   ├── roles/
│   │   ├── permissions/
│   │   ├── contacts/
│   │   ├── typeUser/
│   │   ├── bitacora/
│   │   ├── preforms/
│   │   ├── survey/
│   │   ├── ticketComment/
│   │   └── uploads/
│   ├── middleware/
│   │   ├── validateJWT.js          # Verificación de token JWT desde cookie
│   │   ├── validateCampos.js       # Validación de campos con express-validator
│   │   └── sanitize.js             # Sanitización XSS en body, query y params
│   └── helpers/
│       ├── response.js             # Formato estándar de respuestas
│       ├── generateJWT.js          # Generación de tokens JWT
│       ├── sendEmail.js            # Envío de correos via SMTP
│       ├── uploadFile.js           # Configuración de Multer
│       ├── validatorsDB.js         # Validaciones personalizadas contra la BD
│       └── helpers.js              # Utilidades generales
├── public/                         # Archivos estáticos
├── .env.example
├── package.json
└── README.md
```

---

## Autenticación

El sistema usa **JWT almacenado en una cookie HTTP-only**. Al hacer login, el servidor establece automáticamente la cookie `access_token` en el navegador/cliente.

- **Expiración del token:** 4 horas
- **Cookie:** `access_token` (httpOnly, SameSite: Strict, Secure en producción)
- **Rate limit:** 100 solicitudes por IP cada 15 minutos

No es necesario enviar un header `Authorization`. La cookie se envía automáticamente con cada solicitud si el cliente la soporta (navegadores, curl con `-c`/`-b`, Postman con cookies habilitadas).

Para cerrar sesión usa `POST /api/auth/logout`. El servidor invalida la cookie en el cliente inmediatamente.

---

## Formato de respuesta

Todas las respuestas siguen esta estructura:

```json
{
  "error": false,
  "status": 200,
  "body": { }
}
```

En caso de error:

```json
{
  "error": true,
  "status": 400,
  "body": "Mensaje de error"
}
```

---

## Endpoints

> **✅ JWT** = requiere cookie `access_token` válida
> **❌** = ruta pública

---

### Autenticación — `/api/auth`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/api/auth/login` | Iniciar sesión. Establece la cookie `access_token` | ❌ |
| `POST` | `/api/auth/logout` | Cerrar sesión. Elimina la cookie `access_token` | ✅ JWT |
| `POST` | `/api/auth/renew` | Renovar el token JWT | ✅ JWT |
| `POST` | `/api/auth/sendtoken` | Enviar token de recuperación de contraseña al correo | ❌ |
| `POST` | `/api/auth/comparetoken` | Validar token de recuperación de contraseña | ❌ |

**Body login:**
```json
{
  "username": "admin",
  "password": "123456"
}
```

**Body sendtoken:**
```json
{
  "username": "admin"
}
```

**Body comparetoken:**
```json
{
  "token": "ABC123",
  "username": "admin"
}
```

---

### Usuarios — `/api/users`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/users` | Listar todos los usuarios | ✅ JWT |
| `GET` | `/api/users/:id` | Obtener usuario por ID | ❌ |
| `GET` | `/api/users/username/:username` | Obtener usuario por nombre de usuario | ❌ |
| `POST` | `/api/users` | Crear nuevo usuario (soporta subida de foto) | ✅ JWT |
| `PATCH` | `/api/users/:id` | Actualizar usuario | ✅ JWT |
| `PATCH` | `/api/users/status/:id` | Cambiar estado del usuario | ✅ JWT |
| `DELETE` | `/api/users/:id` | Inactivar usuario (state_id = 2) | ✅ JWT |
| `POST` | `/api/users/changepass/:id` | Cambiar contraseña de usuario | ✅ JWT |

**Body POST /api/users** (`multipart/form-data`):
```
username    string  requerido
name        string  requerido
email       string  requerido
password    string  requerido
rol_id      number  requerido
state_id    number  requerido
department_id number requerido
campus_id   number  requerido
file        file    opcional (imagen de perfil)
```

**Body PATCH /api/users/status/:id:**
```json
{
  "status": 1
}
```

**Body POST /api/users/changepass/:id:**
```json
{
  "username": "admin",
  "newpass": "nuevaContrasena123"
}
```

---

### Tickets — `/api/tickets`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/tickets` | Listar todos los tickets | ✅ JWT |
| `GET` | `/api/tickets/abiertos` | Listar tickets abiertos (sin fecha de cierre) | ✅ JWT |
| `GET` | `/api/tickets/cerrados` | Listar tickets cerrados (con fecha de cierre) | ✅ JWT |
| `GET` | `/api/tickets/enespera` | Listar tickets en espera (`on_hold = true`) | ✅ JWT |
| `GET` | `/api/tickets/user/:id_user` | Listar tickets de un usuario específico | ✅ JWT |
| `GET` | `/api/tickets/:id` | Obtener ticket por ID | ✅ JWT |
| `POST` | `/api/tickets` | Crear nuevo ticket (hasta 6 archivos adjuntos) | ✅ JWT |
| `PATCH` | `/api/tickets/:id` | Actualizar ticket por ID | ✅ JWT |
| `POST` | `/api/tickets/close/:id` | Cerrar ticket con razón y responsable | ✅ JWT |

**Body POST /api/tickets** (`multipart/form-data`):
```
user_id        number  requerido
priority_id    number  requerido
application_id number  requerido
browser_id     number  requerido
sisope_id      number  requerido
subject        string  requerido
description    string  requerido
email          string  requerido
file           file    opcional (hasta 6 archivos: jpeg, png, pdf, xls, xlsx, csv, doc, txt)
```

**Body POST /api/tickets/close/:id:**
```json
{
  "reason_id": 1,
  "user_id_resp": 5
}
```

---

### Comentarios de tickets — `/api/ticketComment`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/ticketComment/:ticket_id` | Listar todos los comentarios de un ticket | ✅ JWT |
| `GET` | `/api/ticketComment/:id` | Obtener comentario por ID | ✅ JWT |
| `POST` | `/api/ticketComment` | Crear comentario (hasta 6 archivos adjuntos) | ✅ JWT |
| `PATCH` | `/api/ticketComment/:id` | Actualizar comentario | ✅ JWT |
| `DELETE` | `/api/ticketComment/:id` | Eliminar comentario | ✅ JWT |

**Body POST /api/ticketComment** (`multipart/form-data`):
```
ticket_id   number  requerido
user_id     number  requerido
coment      string  requerido
public      boolean requerido (true = visible al cliente)
file        file    opcional (hasta 6 archivos)
```

---

### Clientes — `/api/customers`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/customers` | Listar todos los clientes | ✅ JWT |
| `GET` | `/api/customers/:id` | Obtener cliente por ID | ✅ JWT |
| `GET` | `/api/customers/name/:name` | Obtener cliente por nombre | ✅ JWT |
| `POST` | `/api/customers` | Crear nuevo cliente | ✅ JWT |
| `PATCH` | `/api/customers/:id` | Actualizar cliente | ✅ JWT |
| `DELETE` | `/api/customers/:id` | Inactivar cliente | ✅ JWT |

**Body POST /api/customers:**
```json
{
  "name": "Nombre del cliente"
}
```

---

### Sedes — `/api/campus`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/campus` | Listar todas las sedes | ✅ JWT |
| `GET` | `/api/campus/:id` | Obtener sede por ID | ✅ JWT |
| `GET` | `/api/campus/name/:name` | Obtener sede por nombre | ✅ JWT |
| `GET` | `/api/campus/client/:client_id` | Listar sedes de un cliente | ✅ JWT |
| `POST` | `/api/campus` | Crear nueva sede | ✅ JWT |
| `PATCH` | `/api/campus/:id` | Actualizar sede | ✅ JWT |
| `DELETE` | `/api/campus/:id` | Inactivar sede | ✅ JWT |

**Body POST /api/campus:**
```json
{
  "name": "Sede Norte",
  "client_id": 1
}
```

---

### Roles — `/api/roles`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/roles` | Listar todos los roles | ✅ JWT |
| `GET` | `/api/roles/:id` | Obtener rol por ID | ✅ JWT |
| `GET` | `/api/roles/permission/:id` | Listar permisos asignados a un rol | ✅ JWT |
| `POST` | `/api/roles` | Crear nuevo rol | ✅ JWT |
| `PATCH` | `/api/roles/:id` | Actualizar rol | ✅ JWT |
| `DELETE` | `/api/roles/:id` | Inactivar rol | ✅ JWT |

**Body POST /api/roles:**
```json
{
  "name": "Soporte"
}
```

---

### Permisos — `/api/permissions`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/permissions` | Listar todos los permisos | ✅ JWT |
| `GET` | `/api/permissions/:id` | Obtener permiso por ID | ✅ JWT |
| `POST` | `/api/permissions` | Crear nuevo permiso | ✅ JWT |
| `PATCH` | `/api/permissions/:id` | Actualizar permiso | ✅ JWT |
| `DELETE` | `/api/permissions/:id` | Inactivar permiso | ✅ JWT |

**Body POST /api/permissions:**
```json
{
  "name": "Gestionar tickets",
  "description": "Permite crear, editar y cerrar tickets"
}
```

---

### Contactos — `/api/contacts`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/contacts` | Listar todos los contactos | ✅ JWT |
| `GET` | `/api/contacts/:id` | Obtener contacto por ID | ✅ JWT |
| `POST` | `/api/contacts` | Crear nuevo contacto | ✅ JWT |
| `PATCH` | `/api/contacts/:id` | Actualizar contacto | ✅ JWT |
| `DELETE` | `/api/contacts/:id` | Inactivar contacto | ✅ JWT |

**Body POST /api/contacts:**
```json
{
  "name": "Juan Pérez",
  "phone": "3001234567",
  "email": "juan@empresa.com",
  "clientId": 1,
  "campusId": 2,
  "typeUserId": 1
}
```

---

### Tipos de usuario — `/api/typeUser`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/typeUser` | Listar todos los tipos de usuario | ✅ JWT |
| `GET` | `/api/typeUser/:id` | Obtener tipo de usuario por ID | ✅ JWT |
| `POST` | `/api/typeUser` | Crear tipo de usuario | ✅ JWT |
| `PATCH` | `/api/typeUser/:id` | Actualizar tipo de usuario | ✅ JWT |
| `DELETE` | `/api/typeUser/:id` | Inactivar tipo de usuario | ✅ JWT |

**Body POST /api/typeUser:**
```json
{
  "name": "Técnico"
}
```

---

### Preformas — `/api/preforms`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/preforms` | Listar todas las preformas | ✅ JWT |
| `GET` | `/api/preforms/suceso/:suceso` | Listar preformas por suceso | ✅ JWT |
| `GET` | `/api/preforms/:id` | Obtener preforma por ID | ✅ JWT |
| `POST` | `/api/preforms` | Crear nueva preforma | ✅ JWT |
| `PATCH` | `/api/preforms/:id` | Actualizar preforma | ✅ JWT |
| `DELETE` | `/api/preforms/:id` | Inactivar preforma | ✅ JWT |

**Body POST /api/preforms:**
```json
{
  "title": "Título de la preforma",
  "description": "Descripción detallada",
  "suceso_id": 1
}
```

---

### Encuestas — `/api/survey`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/survey` | Listar todas las encuestas | ✅ JWT |
| `GET` | `/api/survey/:id` | Obtener encuesta por ID | ✅ JWT |
| `GET` | `/api/survey/client/:client_id` | Listar encuestas de un cliente | ✅ JWT |
| `POST` | `/api/survey` | Crear nueva encuesta | ✅ JWT |
| `PATCH` | `/api/survey/:id` | Actualizar encuesta | ✅ JWT |
| `DELETE` | `/api/survey/:id` | Inactivar encuesta | ✅ JWT |

**Body POST /api/survey:**
```json
{
  "ticket_id": 1,
  "user_id": 3
}
```

---

### Bitácora — `/api/bitacora`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/bitacora/:id` | Obtener registro de auditoría por ID | ✅ JWT |
| `POST` | `/api/bitacora` | Crear registro de auditoría | ✅ JWT |

> Los registros de bitácora se crean automáticamente en operaciones de creación, actualización e inactivación de entidades. Normalmente no necesitas llamar este endpoint directamente.

**Body POST /api/bitacora:**
```json
{
  "eventId": "1",
  "tableAffect": "customers",
  "fieldAffect": "name",
  "dataPrev": "Nombre anterior",
  "dataNew": "Nombre nuevo",
  "username": "admin"
}
```

---

## Ejemplos de uso

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username": "admin", "password": "123456"}'
```

**Respuesta exitosa:**
```json
{
  "error": false,
  "status": 200,
  "body": {
    "name": "Administrador",
    "username": "admin",
    "email": "admin@empresa.com"
  }
}
```

### Listar tickets (con cookie guardada)

```bash
curl http://localhost:8000/api/tickets \
  -b cookies.txt
```

### Crear ticket con archivo adjunto

```bash
curl -X POST http://localhost:8000/api/tickets \
  -b cookies.txt \
  -F "user_id=1" \
  -F "priority_id=2" \
  -F "application_id=1" \
  -F "browser_id=1" \
  -F "sisope_id=1" \
  -F "subject=Error en módulo de pagos" \
  -F "description=Al intentar procesar el pago aparece un error 500" \
  -F "email=usuario@empresa.com" \
  -F "file=@captura.png"
```

### Cerrar sesión

```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -b cookies.txt
```

**Respuesta:**
```json
{
  "error": false,
  "status": 200,
  "body": { "message": "Sesión cerrada correctamente." }
}
```

### Cerrar un ticket

```bash
curl -X POST http://localhost:8000/api/tickets/close/42 \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"reason_id": 1, "user_id_resp": 3}'
```

---

## Migraciones y Seeders

El proyecto usa **Sequelize CLI** para gestionar el esquema de la base de datos PostgreSQL.

### Comandos de migraciones

| Comando | Descripción |
|---------|-------------|
| `npx sequelize-cli db:migrate` | Aplica todas las migraciones pendientes (crea las tablas) |
| `npx sequelize-cli db:migrate:undo` | Revierte la última migración |
| `npx sequelize-cli db:migrate:undo:all` | Revierte todas las migraciones |

### Comandos de seeders

| Comando | Descripción |
|---------|-------------|
| `npx sequelize-cli db:seed:all` | Inserta los datos iniciales (estados, roles, usuario admin) |
| `npx sequelize-cli db:seed:undo:all` | Elimina todos los datos insertados por seeders |

### Tablas creadas por las migraciones

| Migración | Tabla | Descripción |
|-----------|-------|-------------|
| `20260322000001` | `states` | Estados del sistema (Activo / Inactivo) |
| `20260322000002` | `customers` | Clientes / empresas |
| `20260322000003` | `roles` | Roles de usuario |
| `20260322000004` | `permissions` | Permisos del sistema |
| `20260322000005` | `type_users` | Tipos de usuario |
| `20260322000006` | `headquarters` | Sedes / campus |
| `20260322000007` | `events` | Eventos (catálogo para tickets) |
| `20260322000008` | `sucesos` | Sucesos (catálogo para preformas) |
| `20260322000009` | `users` | Usuarios del sistema |
| `20260322000010` | `bitacora` | Registros de auditoría |
| `20260322000011` | `preforms` | Preformas / plantillas |
| `20260322000012` | `contacts` | Contactos de clientes |
| `20260322000013` | `tickets` | Tickets de soporte |
| `20260322000014` | `survey` | Encuestas |
| `20260322000015` | `ticket_comments` | Comentarios en tickets |
| `20260322000016` | `uploads` | Archivos adjuntos |

### Datos insertados por el seeder inicial

- **Estados:** `Activo` (id: 1), `Inactivo` (id: 2)
- **Roles:** `Administrador` (id: 1), `Agente` (id: 2), `Cliente` (id: 3)
- **Usuario administrador:**
  - Username: `admin`
  - Contraseña: `Admin123!`
  - Email: `admin@ticketapp.com`

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor con nodemon (recarga automática) |
| `npm run lint:fix` | Corrige errores de ESLint en vistas de correo |
| `npm run db:migrate` | Aplica todas las migraciones pendientes |
| `npm run db:migrate:undo` | Revierte todas las migraciones |
| `npm run db:seed` | Inserta los datos iniciales (seeders) |
| `npm run db:seed:undo` | Elimina todos los datos de los seeders |
| `npm run db:reset` | Revierte, re-migra y re-siembra la base de datos |

---

## Seguridad

La API aplica las siguientes capas de protección en cada solicitud (en orden de ejecución):

| Capa | Herramienta | Qué protege |
|------|-------------|-------------|
| Headers HTTP | `helmet` | Activa ~15 headers de seguridad: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `Content-Security-Policy`, etc. |
| CORS | `cors` | Solo acepta peticiones de los orígenes definidos en `CORS_ORIGIN` |
| Rate limiting | `express-rate-limit` | Máximo 100 solicitudes por IP cada 15 minutos |
| Tamaño del body | `express.json` | Rechaza bodies mayores a 10 KB |
| Inyección NoSQL | `express-mongo-sanitize` | Elimina claves con `$` y `.` del body/query/params |
| XSS | `sanitize.js` | Elimina etiquetas HTML y `javascript:` de todos los strings de entrada |
| HTTP Parameter Pollution | `hpp` | Previene duplicación de parámetros en la query string |

---

## Límites y restricciones

| Parámetro | Valor |
|-----------|-------|
| Rate limit | 100 solicitudes por IP cada 15 minutos |
| Tamaño máximo del body JSON | 10 KB |
| Tamaño máximo de archivo | 250 KB por archivo |
| Archivos por ticket/comentario | Hasta 6 archivos |
| Tipos de archivo permitidos | `jpeg`, `jpg`, `png`, `pdf`, `xls`, `xlsx`, `csv`, `doc`, `txt` |
| Expiración del JWT | 4 horas |

---

## Autor

**Alejandro Benjumea Aguirre**
- GitHub: [@Alejandro-Benjumea-Aguirre](https://github.com/Alejandro-Benjumea-Aguirre)
- Portfolio: [alejodev.cloud](https://www.alejodev.cloud)
- Email: alejo120792120792@hotmail.com

---

## Licencia

MIT License — libre para usar y modificar.
