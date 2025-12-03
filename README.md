# University-landing-page

## Arquitectura de Base de Datos y APIs

Este proyecto usa **MongoDB** con **Mongoose** y una arquitectura en tres capas:

1. **Conexión a la BD** (archivo único): `src/DB/conect.js`
2. **Modelos Mongoose** (esquemas de datos): `src/DB/models/*.js`
3. **Rutas API** (endpoints HTTP): `src/pages/api/**`

La idea clave es que solo hay **un archivo de conexión** y varios modelos reutilizados por distintas APIs.

---

## 1. Conexión a MongoDB (`src/DB/conect.js`)

- Importa `mongoose` y lee la URI desde la variable de entorno `MONGODB_URI`.
- Mantiene una conexión **única y cacheada** a la BD.
- Exporta la función `connectDB()` que siempre debes llamar antes de usar cualquier modelo.

Uso típico en una API:

```js
import connectDB from "../../DB/conect.js";
import Modelo from "../../DB/models/Algo.js";

export async function GET() {
  await connectDB();
  const docs = await Modelo.find();
  return new Response(JSON.stringify(docs));
}
```

> Importante: ninguna otra parte del proyecto debe llamar directamente a `mongoose.connect(...)`. Siempre se usa `connectDB()`.

Para desarrollo debes definir `MONGODB_URI`, por ejemplo en un archivo `.env` (si tu entorno lo soporta):

```bash
MONGODB_URI="mongodb+srv://usuario:password@cluster/?appName=ulp"
```

---

## 2. Modelos Mongoose (`src/DB/models`)

Cada archivo en `src/DB/models` define **un solo tipo de documento** de MongoDB:

- `User.js` → Usuarios (login, perfil).
- `Contact.js` → Mensajes del formulario de contacto (`ContactMessage`).
- `QuejaSugerencia.js` → Quejas y sugerencias de la comunidad.
- `ServicioInformatica.js` → Reportes de servicios informáticos.
- `ServicioGeneral.js` → Reportes de servicios generales (mantenimiento, limpieza, etc.).
- `Grade.js` → Calificaciones (preparado pero actualmente sin endpoint conectado).

Estos modelos **no hablan HTTP directamente**: solo describen la estructura y reglas de los datos.

Ejemplo (simplificado) de un modelo:

```js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
}, { timestamps: true });

const ContactMessage =
  mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactSchema);

export default ContactMessage;
```

> Nota: algunos modelos usan `mongoose.models.Nombre || mongoose.model(...)` para evitar errores en desarrollo cuando Astro recarga el código.

---

## 3. Rutas API (`src/pages/api`)

Las rutas en `src/pages/api` son los **endpoints HTTP** que usan los modelos. Siguen un patrón consistente:

1. Importan `connectDB`.
2. Importan un modelo específico.
3. Llaman a `await connectDB();`.
4. Ejecutan consultas Mongoose (`find`, `create`, `findByIdAndUpdate`, etc.).
5. Devuelven una `Response` con JSON.

### 3.1 Patrones de colección vs detalle

Para varios recursos hay **dos archivos de API con nombres parecidos**, pero con funciones distintas:

- `src/pages/api/contacto.js`
  - `GET /api/contacto` → lista todos los mensajes de contacto.
  - `POST /api/contacto` → crea un mensaje nuevo.
- `src/pages/api/contacto/[id].js`
  - `GET /api/contacto/:id` → obtiene un mensaje por ID.
  - `PATCH /api/contacto/:id` → actualiza un mensaje.
  - `DELETE /api/contacto/:id` → elimina un mensaje.

Este mismo patrón se repite para:

- `quejas-sugerencias.js` y `quejas-sugerencias/[id].js`
- `servicios-informaticos.js` y `servicios-informaticos/[id].js`
- `servicios-generales.js` y `servicios-generales/[id].js`

No son duplicados: uno es la **colección** (`/api/recurso`) y el otro es el **detalle** (`/api/recurso/:id`).

### 3.2 Mapa de modelos ↔ APIs ↔ páginas

Resumen rápido de qué usa qué:

- `Contact.js` (`ContactMessage`)
  - APIs: `api/contacto`, `api/contacto/[id]`
  - Páginas: `contacto.astro`, `admin-formularios.astro`

- `QuejaSugerencia.js`
  - APIs: `api/quejas-sugerencias`, `api/quejas-sugerencias/[id]`
  - Páginas: formulario de quejas, `admin-formularios.astro`

- `ServicioInformatica.js`
  - APIs: `api/servicios-informaticos`, `api/servicios-informaticos/[id]`
  - Páginas: `servicios-informaticos.astro`, `admin-formularios.astro`

- `ServicioGeneral.js`
  - APIs: `api/servicios-generales`, `api/servicios-generales/[id]`
  - Páginas: `servicios-generales.astro`, `admin-formularios.astro`

- `User.js`
  - APIs: `api/auth/login`, `api/auth/register`, `api/user/update`, `api/user/delete`
  - Páginas: `Auth/login.astro`, `Auth/register.astro`, `profile.astro`

- `Grade.js`
  - Actualmente sin APIs conectadas (solo definido el modelo).

---

## 4. Cómo agregar un nuevo modelo + API sin duplicar lógica

1. Crear el modelo en `src/DB/models/NuevoModelo.js`.
2. En `src/pages/api/nuevo-recurso.js`:
   - Importar `connectDB` y el modelo.
   - Implementar `GET`/`POST` según necesites.
3. (Opcional) Crear `src/pages/api/nuevo-recurso/[id].js` para `GET`/`PATCH`/`DELETE` por ID.
4. Desde una página `.astro` usar `fetch("/api/nuevo-recurso")` o `action="/api/nuevo-recurso"`.

Mientras sigas estos pasos y **siempre uses `connectDB()`**, no deberías volver a tener conexiones duplicadas ni confusion entre modelos y APIs.
