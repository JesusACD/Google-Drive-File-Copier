# Google Drive File Copier

Una aplicación web moderna para copiar archivos y carpetas de Google Drive a tu cuenta de forma sencilla y segura.

## 🚀 Características

- ✅ Autenticación segura con Google OAuth 2.0
- ✅ Copia archivos de Google Drive con solo pegar la URL
- ✅ **Copia carpetas completas recursivamente** (incluyendo subcarpetas)
- ✅ Interfaz moderna y responsive
- ✅ Soporte para múltiples formatos de URL
- ✅ Feedback visual del proceso de copia
- ✅ Contador de elementos copiados para carpetas
- ✅ Acceso directo al archivo o carpeta copiada

## 🛠️ Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **NextAuth.js** - Autenticación OAuth
- **Google Drive API** - Integración con Google Drive
- **TailwindCSS** - Estilos
- **shadcn/ui** - Componentes UI
- **Lucide React** - Iconos

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Una cuenta de Google
- Credenciales de Google Cloud Platform

## 🔧 Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd copy-google-drive
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar Google Cloud Platform

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Drive API**:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Drive API"
   - Haz clic en "Enable"

4. Crea credenciales OAuth 2.0:
   - Ve a "APIs & Services" > "Credentials"
   - Haz clic en "Create Credentials" > "OAuth client ID"
   - Selecciona "Web application"
   - Agrega los siguientes URIs autorizados:
     - **Authorized JavaScript origins**: `http://localhost:3000`
     - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
   - Guarda el **Client ID** y **Client Secret**

5. Configura la pantalla de consentimiento OAuth:
   - Ve a "APIs & Services" > "OAuth consent screen"
   - Completa la información requerida
   - Agrega los siguientes scopes:
     - `openid`
     - `email`
     - `profile`
     - `https://www.googleapis.com/auth/drive.file`

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secret_con_openssl_rand_base64_32
```

Para generar el `NEXTAUTH_SECRET`, ejecuta:

```bash
openssl rand -base64 32
```

## 🚀 Ejecutar la aplicación

### Modo desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Modo producción

```bash
pnpm build
pnpm start
```

## 📖 Uso

1. **Inicia sesión** con tu cuenta de Google
2. **Copia la URL** del archivo o carpeta de Google Drive que deseas copiar
3. **Pega la URL** en el campo de entrada
4. **Haz clic en "Copiar Archivo"**
5. **¡Listo!** El archivo o carpeta se copiará a tu Google Drive

### Formatos de URL soportados

**Para archivos:**
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`
- Solo el `FILE_ID`

**Para carpetas:**
- `https://drive.google.com/drive/folders/FOLDER_ID`
- Solo el `FOLDER_ID`

**Nota:** Las carpetas se copian recursivamente, incluyendo todos los archivos y subcarpetas. Las carpetas grandes pueden tardar varios minutos en copiarse.

## 🔒 Seguridad

- La aplicación utiliza OAuth 2.0 para autenticación segura
- No se almacenan credenciales de usuario
- Los tokens de acceso se manejan de forma segura con NextAuth.js
- Solo se solicitan los permisos mínimos necesarios

## 🐛 Solución de problemas

### Error: "No tienes permisos para copiar este archivo"

- Verifica que el archivo sea público o que tengas acceso a él
- Asegúrate de que el propietario del archivo haya compartido el archivo contigo

### Error: "URL inválida"

- Verifica que la URL sea de Google Drive
- Asegúrate de copiar la URL completa o el ID del archivo

### Error de autenticación

- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que los URIs de redirección en Google Cloud Console coincidan con tu configuración

## 📝 Estructura del proyecto

```
copy-google-drive/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts          # Configuración de NextAuth
│   │   └── copy-file/
│   │       └── route.ts          # API para copiar archivos
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── components/
│   ├── ui/                       # Componentes UI de shadcn
│   ├── file-copier.tsx           # Componente principal de copia
│   └── providers.tsx             # Providers de la aplicación
├── lib/
│   ├── auth.ts                   # Configuración de autenticación
│   └── utils.ts                  # Utilidades
├── types/
│   └── next-auth.d.ts            # Tipos de NextAuth
├── .env.example                  # Ejemplo de variables de entorno
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ usando Next.js y Google Drive API
