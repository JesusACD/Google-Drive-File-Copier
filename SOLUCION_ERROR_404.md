# Solución al Error "File not found"

## 🔴 Problema

Estás recibiendo el error:
```
File not found: 1DSePO06s1_fmXIGXzIPvn6USOYc5DfrM
```

Esto significa que el archivo con ese ID no existe, fue eliminado, o no tienes permisos para acceder a él.

## ✅ Solución Recomendada: Usar un Archivo Propio

La forma más sencilla de probar la aplicación es usar un archivo de tu propio Google Drive:

### Paso 1: Crear un Archivo de Prueba

1. Ve a [Google Drive](https://drive.google.com)
2. Asegúrate de estar autenticado con la **misma cuenta** que usas en la aplicación
3. Crea un nuevo archivo:
   - Haz clic en "Nuevo" → "Documento de Google" (o cualquier tipo de archivo)
   - Ponle un nombre, por ejemplo: "Archivo de Prueba"

### Paso 2: Obtener la URL del Archivo

1. Haz clic derecho en el archivo que acabas de crear
2. Selecciona "Compartir"
3. En la ventana que se abre, haz clic en "Cambiar" junto a "Restringido"
4. Selecciona **"Cualquier persona con el enlace"**
5. Haz clic en "Copiar enlace"

La URL se verá algo así:
```
https://docs.google.com/document/d/1ABC123xyz456/edit?usp=sharing
```

### Paso 3: Usar la URL en la Aplicación

1. Ve a tu aplicación en http://localhost:3000
2. Pega la URL completa en el campo de entrada
3. Haz clic en "Copiar Archivo"

**¡Debería funcionar sin problemas!** 🎉

---

## 🔍 ¿Por Qué Ocurre Este Error?

El error puede ocurrir por varias razones:

### 1. El Archivo No Existe
- El archivo fue eliminado
- El ID del archivo es incorrecto
- La URL está mal formada

### 2. Permisos Insuficientes
- No tienes acceso al archivo
- El archivo no está compartido contigo
- Estás autenticado con una cuenta diferente

### 3. Archivo Privado
- El archivo pertenece a otra persona
- No está compartido públicamente
- No tienes permisos de visualización

---

## 🛠️ Otras Soluciones

### Opción A: Verificar la Cuenta de Autenticación

Asegúrate de estar autenticado con la cuenta correcta:

1. En la aplicación, haz clic en "Cerrar sesión"
2. Vuelve a iniciar sesión con la cuenta que tiene acceso al archivo
3. Intenta copiar el archivo nuevamente

### Opción B: Verificar Permisos del Archivo

Si el archivo pertenece a otra persona:

1. Pídele al propietario que comparta el archivo contigo
2. O que lo haga público con "Cualquier persona con el enlace"
3. Asegúrate de tener al menos permisos de "Visualizador"

### Opción C: Usar un Archivo Diferente

Si el archivo original no está disponible:

1. Busca otro archivo en tu Drive
2. O crea uno nuevo siguiendo los pasos anteriores
3. Asegúrate de que sea accesible

---

## 📝 Mejoras Implementadas

He actualizado el código para mostrar mensajes de error más claros:

### Antes:
```
Error al copiar el archivo
```

### Ahora:
```
Archivo no encontrado. Verifica que:
• El archivo existe
• Tienes permisos para acceder a él
• Estás autenticado con la cuenta correcta
• El archivo está compartido contigo o es público
```

---

## 🧪 Prueba Rápida

Para verificar que la aplicación funciona correctamente:

1. **Crea un documento de prueba** en tu Google Drive
2. **Compártelo públicamente** (Cualquier persona con el enlace)
3. **Copia la URL** del documento
4. **Pégala en la aplicación**
5. **Haz clic en "Copiar Archivo"**

Si sigue el proceso correctamente, deberías ver:
- ✅ Mensaje de éxito
- ✅ Nombre del archivo copiado
- ✅ Enlace para ver el archivo en Drive

---

## 🆘 ¿Aún Tienes Problemas?

Si después de seguir estos pasos sigues teniendo problemas:

1. **Verifica las credenciales OAuth**:
   - Revisa que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` sean correctos
   - Asegúrate de que los URIs de redirección estén bien configurados

2. **Revisa los permisos de la API**:
   - Ve a Google Cloud Console
   - Verifica que la Google Drive API esté habilitada
   - Confirma que los scopes incluyan `https://www.googleapis.com/auth/drive.file`

3. **Reinicia el servidor**:
   ```bash
   # Detén el servidor (Ctrl+C)
   # Vuelve a iniciarlo
   pnpm dev
   ```

4. **Limpia la sesión**:
   - Cierra sesión en la aplicación
   - Borra las cookies del navegador
   - Vuelve a iniciar sesión

---

## 💡 Consejo

Para evitar este error en el futuro, **siempre usa archivos de tu propio Google Drive** o archivos que estén explícitamente compartidos contigo con permisos de visualización o edición.
