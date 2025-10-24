# 🔧 Solución: Cambiar Scope de OAuth

## 🔴 Problema Identificado

El scope actual `https://www.googleapis.com/auth/drive.file` solo permite acceder a archivos que **la aplicación misma ha creado**. Por eso no puedes acceder a archivos existentes en tu Drive.

## ✅ Solución Completa

### Paso 1: Actualizar el Código (✅ Ya Hecho)

El código ya fue actualizado para usar el scope correcto:
```
https://www.googleapis.com/auth/drive
```

Este scope permite acceso completo a Google Drive.

### Paso 2: Actualizar Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **"APIs y servicios"** → **"Pantalla de consentimiento de OAuth"**
4. Haz clic en **"Editar aplicación"**
5. Ve a la sección **"Scopes"** (paso 2)
6. Haz clic en **"Agregar o quitar scopes"**
7. Busca y selecciona:
   - ✅ `openid`
   - ✅ `email`
   - ✅ `profile`
8. En **"Scopes manuales"**, **REEMPLAZA** el scope anterior con:
   ```
   https://www.googleapis.com/auth/drive
   ```
9. Haz clic en **"Actualizar"**
10. Haz clic en **"Guardar y continuar"**
11. Continúa hasta el final y haz clic en **"Volver al panel"**

### Paso 3: Reiniciar el Servidor

```bash
# Detener el servidor (Ctrl + C)
pnpm dev
```

### Paso 4: Cerrar Sesión y Volver a Autenticarte

**IMPORTANTE**: Debes cerrar sesión y volver a iniciar sesión para obtener los nuevos permisos.

1. Ve a http://localhost:3000
2. Haz clic en **"Cerrar sesión"** (esquina superior derecha)
3. Haz clic en **"Iniciar sesión con Google"**
4. Selecciona tu cuenta
5. **Verás una nueva pantalla de permisos** que incluye acceso a Google Drive
6. Haz clic en **"Permitir"**

### Paso 5: Probar Nuevamente

1. Pega la URL de tu archivo: 
   ```
   https://drive.google.com/file/d/1XCcQrCvF_C4-LVRA2XCURGdwxuDgdEdY/view
   ```
2. Haz clic en **"Copiar Archivo"**

**¡Debería funcionar ahora!** ✅

---

## 📊 Diferencia entre Scopes

| Scope | Acceso | Uso |
|-------|--------|-----|
| `drive.file` | Solo archivos creados por la app | ❌ No funciona para archivos existentes |
| `drive` | Todos los archivos de Drive | ✅ Funciona para copiar cualquier archivo |

---

## 🔍 Verificación

Después de volver a autenticarte, verifica en la consola del navegador (F12) → Network → Headers que la petición incluya el nuevo token con los permisos correctos.

---

## ⚠️ Nota de Seguridad

El scope `https://www.googleapis.com/auth/drive` da acceso completo a Google Drive. Esto es necesario para copiar archivos existentes. Si prefieres un acceso más limitado, puedes usar:

- `https://www.googleapis.com/auth/drive.readonly` - Solo lectura (no podrás copiar)
- `https://www.googleapis.com/auth/drive.file` - Solo archivos de la app (no funciona para tu caso)

Para esta aplicación, necesitamos el scope completo `drive` para poder copiar archivos.

---

## 🆘 Si Sigue Sin Funcionar

1. **Borra las cookies** del navegador para localhost:3000
2. **Cierra completamente el navegador**
3. **Vuelve a abrir** y accede a http://localhost:3000
4. **Inicia sesión nuevamente**

Si aún así no funciona, verifica que en Google Cloud Console el scope esté correctamente configurado como `https://www.googleapis.com/auth/drive` (sin `.file` al final).
