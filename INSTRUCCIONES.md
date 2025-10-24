# 🚀 Instrucciones Rápidas de Inicio

## ✅ Estado Actual

La aplicación ha sido creada exitosamente con todas las funcionalidades implementadas:

- ✅ Estructura del proyecto Next.js con TypeScript
- ✅ Autenticación OAuth 2.0 con Google
- ✅ API para copiar archivos de Google Drive
- ✅ Interfaz de usuario moderna y responsive
- ✅ Componentes UI con shadcn/ui y TailwindCSS
- ✅ Dependencias instaladas

## 📝 Próximos Pasos

### 1. Configurar Google Cloud Platform (IMPORTANTE)

Debes crear las credenciales OAuth en Google Cloud Console:

1. Ve a: https://console.cloud.google.com/
2. Crea un nuevo proyecto
3. Habilita la **Google Drive API**
4. Configura la **Pantalla de consentimiento OAuth**
5. Crea credenciales **OAuth 2.0**

**📖 Consulta `SETUP_GUIDE.md` para instrucciones detalladas paso a paso**

### 2. Configurar Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secret_con_el_comando_de_abajo
```

2. Genera el `NEXTAUTH_SECRET` ejecutando en PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 3. Iniciar la Aplicación

```bash
pnpm dev
```

La aplicación estará disponible en: http://localhost:3000

## 🎯 Funcionalidades Implementadas

### Autenticación
- Login con Google OAuth 2.0
- Gestión segura de sesiones con NextAuth.js
- Tokens de acceso para Google Drive API

### Copia de Archivos
- Ingresa la URL del archivo de Google Drive
- Soporta múltiples formatos de URL
- Copia el archivo a tu cuenta automáticamente
- Muestra enlace directo al archivo copiado

### Interfaz de Usuario
- Diseño moderno y responsive
- Feedback visual del proceso
- Mensajes de error claros
- Tema claro/oscuro automático

## 📁 Estructura del Proyecto

```
copy-google-drive/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # Autenticación
│   │   └── copy-file/route.ts             # API de copia
│   ├── globals.css                        # Estilos globales
│   ├── layout.tsx                         # Layout principal
│   └── page.tsx                           # Página principal
├── components/
│   ├── ui/                                # Componentes UI
│   ├── file-copier.tsx                    # Componente de copia
│   └── providers.tsx                      # Providers
├── lib/
│   ├── auth.ts                            # Config de auth
│   └── utils.ts                           # Utilidades
├── .env                                   # Variables de entorno (crear)
├── package.json                           # Dependencias
├── README.md                              # Documentación
├── SETUP_GUIDE.md                         # Guía de configuración
└── INSTRUCCIONES.md                       # Este archivo
```

## 🔧 Comandos Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia el servidor de desarrollo

# Producción
pnpm build        # Construye la aplicación
pnpm start        # Inicia el servidor de producción

# Utilidades
pnpm lint         # Ejecuta el linter
```

## ⚠️ Importante

1. **NO subas el archivo `.env` a Git** (ya está en `.gitignore`)
2. **Configura Google Cloud Platform** antes de ejecutar la app
3. **Agrega tu correo como usuario de prueba** en Google Cloud
4. **Usa HTTPS en producción** para mayor seguridad

## 📚 Documentación Adicional

- **README.md**: Documentación completa del proyecto
- **SETUP_GUIDE.md**: Guía detallada de configuración de Google Cloud
- **Documentación oficial**:
  - [Next.js](https://nextjs.org/docs)
  - [NextAuth.js](https://next-auth.js.org/)
  - [Google Drive API](https://developers.google.com/drive/api)

## 🐛 Solución de Problemas

Si encuentras errores, consulta la sección de "Solución de Problemas" en `SETUP_GUIDE.md`

Los errores más comunes son:
- Credenciales OAuth incorrectas
- URIs de redirección mal configurados
- Falta de permisos en el archivo a copiar
- Variables de entorno no configuradas

## 🎉 ¡Todo Listo!

Una vez que configures las credenciales de Google Cloud y las variables de entorno, la aplicación estará completamente funcional.

**¡Disfruta copiando archivos de Google Drive! 🚀**
