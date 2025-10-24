# Guía de Configuración Detallada

Esta guía te ayudará a configurar la aplicación paso a paso.

## 📋 Tabla de Contenidos

1. [Configuración de Google Cloud Platform](#1-configuración-de-google-cloud-platform)
2. [Configuración del Proyecto Local](#2-configuración-del-proyecto-local)
3. [Pruebas y Verificación](#3-pruebas-y-verificación)

---

## 1. Configuración de Google Cloud Platform

### Paso 1.1: Crear un Proyecto

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en el selector de proyectos en la parte superior
3. Haz clic en "Nuevo Proyecto"
4. Ingresa un nombre para tu proyecto (ej: "Drive File Copier")
5. Haz clic en "Crear"

### Paso 1.2: Habilitar Google Drive API

1. En el menú lateral, ve a **"APIs y servicios"** > **"Biblioteca"**
2. Busca **"Google Drive API"**
3. Haz clic en el resultado
4. Haz clic en **"Habilitar"**
5. Espera a que se habilite la API

### Paso 1.3: Configurar Pantalla de Consentimiento OAuth

1. Ve a **"APIs y servicios"** > **"Pantalla de consentimiento de OAuth"**
2. Selecciona **"Externo"** (a menos que tengas Google Workspace)
3. Haz clic en **"Crear"**

4. **Información de la aplicación:**
   - Nombre de la aplicación: `Drive File Copier`
   - Correo electrónico de asistencia: tu correo
   - Logo de la aplicación: (opcional)

5. **Dominios autorizados:**
   - Para desarrollo: deja en blanco
   - Para producción: agrega tu dominio

6. **Información de contacto del desarrollador:**
   - Agrega tu correo electrónico

7. Haz clic en **"Guardar y continuar"**

8. **Scopes (Permisos):**
   - Haz clic en **"Agregar o quitar scopes"**
   - Busca y selecciona:
     - `openid`
     - `email`
     - `profile`
   - En "Scopes manuales", agrega:
     - `https://www.googleapis.com/auth/drive`
   - Haz clic en **"Actualizar"**
   - Haz clic en **"Guardar y continuar"**
   
   **Nota importante:** Usa `drive` (no `drive.file`) para poder acceder a todos los archivos de Drive.

9. **Usuarios de prueba:**
   - Haz clic en **"Agregar usuarios"**
   - Agrega tu correo electrónico de Google
   - Haz clic en **"Agregar"**
   - Haz clic en **"Guardar y continuar"**

10. Revisa el resumen y haz clic en **"Volver al panel"**

### Paso 1.4: Crear Credenciales OAuth 2.0

1. Ve a **"APIs y servicios"** > **"Credenciales"**
2. Haz clic en **"Crear credenciales"** > **"ID de cliente de OAuth"**
3. Selecciona **"Aplicación web"**

4. **Configuración:**
   - Nombre: `Drive File Copier Web Client`
   
   - **Orígenes de JavaScript autorizados:**
     ```
     http://localhost:3000
     ```
     (Para producción, agrega tu dominio: `https://tudominio.com`)
   
   - **URIs de redirección autorizados:**
     ```
     http://localhost:3000/api/auth/callback/google
     ```
     (Para producción: `https://tudominio.com/api/auth/callback/google`)

5. Haz clic en **"Crear"**

6. **¡IMPORTANTE!** Guarda las credenciales:
   - **ID de cliente**: Cópialo (se verá como: `123456789-abc...xyz.apps.googleusercontent.com`)
   - **Secreto del cliente**: Cópialo (se verá como: `GOCSPX-abc...xyz`)

---

## 2. Configuración del Proyecto Local

### Paso 2.1: Instalar Dependencias

```bash
pnpm install
```

### Paso 2.2: Configurar Variables de Entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Abre el archivo `.env` y completa con tus credenciales:

   ```env
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUI
   GOOGLE_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=TU_SECRET_GENERADO_AQUI
   ```

3. Genera el `NEXTAUTH_SECRET`:
   
   **En Windows (PowerShell):**
   ```powershell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```
   
   **En Linux/Mac:**
   ```bash
   openssl rand -base64 32
   ```
   
   Copia el resultado y pégalo en `NEXTAUTH_SECRET`

### Paso 2.3: Verificar Configuración

Asegúrate de que tu archivo `.env` se vea así (con tus valores reales):

```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_aleatorio_generado_de_32_caracteres
```

---

## 3. Pruebas y Verificación

### Paso 3.1: Iniciar la Aplicación

```bash
pnpm dev
```

La aplicación debería estar corriendo en: http://localhost:3000

### Paso 3.2: Probar la Autenticación

1. Abre http://localhost:3000 en tu navegador
2. Haz clic en **"Iniciar sesión con Google"**
3. Selecciona tu cuenta de Google (debe ser una de las cuentas de prueba)
4. Acepta los permisos solicitados
5. Deberías ser redirigido a la aplicación autenticado

### Paso 3.3: Probar la Copia de Archivos

1. **Preparar un archivo de prueba:**
   - Ve a tu Google Drive
   - Crea un archivo de prueba o selecciona uno existente
   - Haz clic derecho > "Obtener enlace"
   - Asegúrate de que el enlace sea accesible (al menos "Cualquier persona con el enlace")
   - Copia el enlace

2. **Copiar el archivo:**
   - En la aplicación, pega el enlace en el campo de entrada
   - Haz clic en **"Copiar Archivo"**
   - Espera a que se complete el proceso
   - Deberías ver un mensaje de éxito con el enlace al archivo copiado

3. **Verificar:**
   - Haz clic en "Ver archivo en Drive"
   - Verifica que el archivo se haya copiado correctamente en tu Drive

---

## 🔧 Solución de Problemas Comunes

### Error: "Access blocked: This app's request is invalid"

**Causa:** La pantalla de consentimiento OAuth no está configurada correctamente.

**Solución:**
1. Ve a la pantalla de consentimiento OAuth
2. Verifica que todos los campos obligatorios estén completos
3. Asegúrate de haber agregado los scopes correctos
4. Agrega tu correo como usuario de prueba

### Error: "redirect_uri_mismatch"

**Causa:** El URI de redirección no coincide con el configurado en Google Cloud.

**Solución:**
1. Ve a tus credenciales OAuth en Google Cloud
2. Verifica que el URI de redirección sea exactamente:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
3. No debe tener espacios ni caracteres adicionales
4. Guarda los cambios y espera unos minutos

### Error: "No tienes permisos para copiar este archivo"

**Causa:** El archivo no es accesible o no tienes permisos.

**Solución:**
1. Verifica que el archivo sea público o compartido contigo
2. Si es tu archivo, asegúrate de estar autenticado con la cuenta correcta
3. Intenta con un archivo diferente

### Error: "Invalid credentials"

**Causa:** Las credenciales en el archivo `.env` son incorrectas.

**Solución:**
1. Verifica que hayas copiado correctamente el Client ID y Client Secret
2. Asegúrate de no tener espacios al inicio o final
3. Reinicia el servidor de desarrollo después de cambiar el `.env`

---

## 📝 Notas Importantes

### Límites de la API

- Google Drive API tiene límites de uso
- Para desarrollo: 1,000 consultas por 100 segundos por usuario
- Si necesitas más, solicita un aumento de cuota en Google Cloud

### Modo de Producción

Para desplegar en producción:

1. **Actualiza las variables de entorno:**
   ```env
   NEXTAUTH_URL=https://tudominio.com
   ```

2. **Actualiza las credenciales OAuth en Google Cloud:**
   - Agrega tu dominio de producción a los orígenes autorizados
   - Agrega el URI de redirección de producción

3. **Publica la aplicación:**
   - En la pantalla de consentimiento OAuth, haz clic en "Publicar aplicación"
   - Esto puede requerir verificación de Google

### Seguridad

- **NUNCA** compartas tu archivo `.env`
- **NUNCA** subas tu archivo `.env` a Git (ya está en `.gitignore`)
- Genera un nuevo `NEXTAUTH_SECRET` para producción
- Usa HTTPS en producción

---

## 🎉 ¡Listo!

Si has seguido todos los pasos, tu aplicación debería estar funcionando correctamente.

Para cualquier problema adicional, consulta la documentación oficial:
- [Google Drive API](https://developers.google.com/drive/api/guides/about-sdk)
- [NextAuth.js](https://next-auth.js.org/)
- [Next.js](https://nextjs.org/docs)
