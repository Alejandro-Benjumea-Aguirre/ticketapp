# 🎟️ TicketApp API

REST API backend para la gestión de tickets de eventos. Permite a los usuarios registrarse, autenticarse y administrar tickets según su rol dentro del sistema.

---

## 🚀 Tecnologías

| Tecnología | Uso |
|---|---|
| **Node.js** | Runtime |
| **Express** | Framework HTTP |
| **PostgreSQL** | Base de datos relacional |
| **JWT** | Autenticación y autorización |
| **bcrypt** | Hash de contraseñas |

---

## ✨ Funcionalidades

- 🔐 **Autenticación JWT** — Registro, login y protección de rutas con tokens
- 🎫 **CRUD de tickets** — Crear, consultar, actualizar y eliminar tickets de eventos
- 👥 **Roles de usuario** — Control de acceso diferenciado (admin / usuario)

---

## 📋 Requisitos previos

- Node.js >= 18
- PostgreSQL >= 14
- npm o yarn

---

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Alejandro-Benjumea-Aguirre/ticketapp.git
cd ticketapp

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 5. Iniciar el servidor
npm run dev
```

---

## 🔑 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ticketapp
DB_USER=postgres
DB_PASSWORD=tu_password
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=3600
```

---

## 📡 Endpoints

### Auth

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/api/auth/register` | Registro de usuario | ❌ |
| `POST` | `/api/auth/login` | Login y obtención de token | ❌ |

### Tickets

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/tickets` | Listar todos los tickets | ✅ |
| `GET` | `/api/tickets/:id` | Obtener ticket por ID | ✅ |
| `POST` | `/api/tickets` | Crear nuevo ticket | ✅ |
| `PUT` | `/api/tickets/:id` | Actualizar ticket | ✅ Admin |
| `DELETE` | `/api/tickets/:id` | Eliminar ticket | ✅ Admin |

### Usuarios

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/users` | Listar usuarios | ✅ Admin |
| `GET` | `/api/users/:id` | Obtener usuario por ID | ✅ Admin |

---

## 🔒 Autenticación

Las rutas protegidas requieren un token JWT en el header:

```http
Authorization: Bearer <token>
```

El token se obtiene al hacer login en `/api/auth/login`.

---

## 👥 Roles

| Rol | Permisos |
|-----|----------|
| `user` | Consultar y crear tickets propios |
| `admin` | Acceso completo a todos los recursos |

---

## 📁 Estructura del proyecto

```
ticketapp/
├── src/
│   ├── config/         # Configuración de BD y variables de entorno
│   ├── controllers/    # Lógica de cada endpoint
│   ├── middlewares/    # Auth JWT, validaciones, roles
│   ├── models/         # Modelos y queries a PostgreSQL
│   ├── routes/         # Definición de rutas
│   └── index.js        # Entry point
├── .env.example
├── package.json
└── README.md
```

---

## 🧪 Ejemplo de uso

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "123456"}'
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Crear ticket:**
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"event": "Concierto Rock", "quantity": 2, "price": 50000}'
```

---

## 👤 Autor

**Alejandro Benjumea Aguirre**
- GitHub: [@Alejandro-Benjumea-Aguirre](https://github.com/Alejandro-Benjumea-Aguirre)
- Portfolio: [alejodev.cloud](https://www.alejodev.cloud)
- Email: alejo120792120792@hotmail.com

---

## 📄 Licencia

MIT License — libre para usar y modificar.
