# Solución: Error 404 en API

## 🔴 Error

```
POST http://localhost:3000/api/copy-file 404 (Not Found)
```

Este error significa que Next.js no encuentra el endpoint de la API.

## ✅ Solución: Reiniciar el Servidor

Next.js a veces no detecta nuevos archivos de API automáticamente. Necesitas reiniciar el servidor:

### Paso 1: Detener el Servidor

En la terminal donde está corriendo `pnpm dev`:

1. Presiona **Ctrl + C** (Windows/Linux) o **Cmd + C** (Mac)
2. Espera a que el proceso se detenga completamente

### Paso 2: Limpiar la Caché (Opcional pero Recomendado)

```bash
# Eliminar la carpeta .next
rm -rf .next

# En Windows PowerShell:
Remove-Item -Recurse -Force .next
```

### Paso 3: Reiniciar el Servidor

```bash
pnpm dev
```

### Paso 4: Esperar a que Compile

Espera a ver este mensaje:
```
✓ Ready in Xms
○ Local: http://localhost:3000
```

### Paso 5: Refrescar el Navegador

1. Ve a http://localhost:3000
2. Presiona **Ctrl + Shift + R** (o **Cmd + Shift + R** en Mac) para hacer un hard refresh
3. Intenta copiar el archivo nuevamente

---

## 🔍 Verificación Rápida

Si el error persiste, verifica que los archivos existan:

1. Verifica que existe: `app/api/copy-file/route.ts`
2. Verifica que existe: `app/api/auth/[...nextauth]/route.ts`

---

## 🛠️ Solución Alternativa: Verificar Errores de Compilación

Si después de reiniciar sigues teniendo el error:

1. Mira la terminal donde corre `pnpm dev`
2. Busca errores de compilación en rojo
3. Si hay errores de TypeScript o imports, repórtalos

---

## 💡 Causa del Problema

Next.js usa un sistema de hot-reload que a veces no detecta:
- Nuevos archivos de API creados
- Cambios en archivos de configuración
- Cambios en variables de entorno

Por eso es necesario reiniciar el servidor manualmente.

---

## ✅ Después de Reiniciar

Una vez que el servidor esté corriendo correctamente:

1. Abre http://localhost:3000
2. Verifica que estés autenticado
3. Pega la URL del archivo: https://drive.google.com/file/d/1dT8ehkUzG4S4xNEpatDjVzYpptP1QERE/view
4. Haz clic en "Copiar Archivo"

**¡Debería funcionar ahora!** ✅
