# 🚀 Pasos Inmediatos para Solucionar el Problema

## ✅ Cambio Realizado en el Código

El scope de OAuth fue actualizado de:
- ❌ `https://www.googleapis.com/auth/drive.file` (solo archivos creados por la app)
- ✅ `https://www.googleapis.com/auth/drive` (acceso completo a Drive)

---

## 📝 Pasos que DEBES Seguir AHORA

### 1️⃣ Actualizar Google Cloud Console (5 minutos)

1. Abre: https://console.cloud.google.com/
2. Selecciona tu proyecto
3. Ve a: **APIs y servicios** → **Pantalla de consentimiento de OAuth**
4. Haz clic en: **"Editar aplicación"**
5. Avanza hasta: **"Scopes"** (paso 2)
6. Haz clic en: **"Agregar o quitar scopes"**
7. En **"Scopes manuales"**, REEMPLAZA el texto con:
   ```
   https://www.googleapis.com/auth/drive
   ```
8. Haz clic en: **"Actualizar"**
9. Haz clic en: **"Guardar y continuar"** hasta el final
10. Haz clic en: **"Volver al panel"**

### 2️⃣ Reiniciar el Servidor

En la terminal:
```bash
# Presiona Ctrl + C para detener
# Luego ejecuta:
pnpm dev
```

### 3️⃣ Cerrar Sesión y Volver a Autenticarte

1. Ve a: http://localhost:3000
2. Haz clic en: **"Cerrar sesión"**
3. Haz clic en: **"Iniciar sesión con Google"**
4. Selecciona tu cuenta
5. **IMPORTANTE**: Verás una nueva pantalla pidiendo permisos de Drive
6. Haz clic en: **"Permitir"**

### 4️⃣ Probar el Archivo

1. Pega esta URL:
   ```
   https://drive.google.com/file/d/1XCcQrCvF_C4-LVRA2XCURGdwxuDgdEdY/view
   ```
2. Haz clic en: **"Copiar Archivo"**

---

## ✅ Resultado Esperado

Deberías ver:
- ✅ Mensaje de éxito en verde
- ✅ Nombre del archivo copiado
- ✅ Enlace para ver el archivo en Drive

---

## 🔍 ¿Por Qué Era Necesario Este Cambio?

| Scope Anterior | Scope Nuevo | Diferencia |
|----------------|-------------|------------|
| `drive.file` | `drive` | Solo archivos de la app vs. Todos los archivos |
| ❌ No funciona | ✅ Funciona | Para copiar archivos existentes |

El scope `drive.file` es muy restrictivo y solo permite acceder a archivos que la aplicación misma ha creado. Para copiar archivos existentes en tu Drive, necesitas el scope completo `drive`.

---

## ⚠️ Importante

**DEBES cerrar sesión y volver a iniciar sesión** después de cambiar el scope en Google Cloud Console. De lo contrario, seguirás usando el token antiguo con permisos insuficientes.

---

## 🆘 Si No Funciona

1. Verifica que el scope en Google Cloud Console sea exactamente:
   ```
   https://www.googleapis.com/auth/drive
   ```
   (sin `.file` al final)

2. Borra las cookies del navegador:
   - F12 → Application → Cookies → localhost:3000 → Borrar todo

3. Cierra completamente el navegador y vuelve a abrirlo

4. Inicia sesión nuevamente
