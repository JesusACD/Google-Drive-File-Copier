# 📁 Funcionalidad de Copia de Carpetas

## 🎉 Nueva Funcionalidad

La aplicación ahora soporta la copia de **carpetas completas** de Google Drive, incluyendo:

- ✅ Todos los archivos dentro de la carpeta
- ✅ Todas las subcarpetas (recursivamente)
- ✅ Estructura de carpetas preservada
- ✅ Contador de elementos copiados

## 🚀 Cómo Usar

### Copiar una Carpeta

1. Ve a Google Drive y encuentra la carpeta que deseas copiar
2. Haz clic derecho en la carpeta → "Compartir" → "Obtener enlace"
3. Asegúrate de que sea accesible (público o compartido contigo)
4. Copia la URL, se verá así:
   ```
   https://drive.google.com/drive/folders/1ABC123xyz456
   ```
5. Pega la URL en la aplicación
6. Haz clic en "Copiar Archivo"
7. Espera a que se complete el proceso

### Resultado

La aplicación creará una nueva carpeta con el mismo nombre que la original, conteniendo:
- Todos los archivos de la carpeta original (con sus nombres originales)
- Todas las subcarpetas con sus contenidos (con sus nombres originales)
- La misma estructura de carpetas

**Nota:** Si ya existe una carpeta con el mismo nombre, Google Drive creará la copia sin conflictos (ambas carpetas pueden coexistir con el mismo nombre).

## ⚙️ Cómo Funciona

### Proceso de Copia Recursiva

1. **Detecta el tipo**: La aplicación verifica si la URL es de un archivo o carpeta
2. **Crea la carpeta raíz**: Se crea una nueva carpeta en tu Drive
3. **Lista el contenido**: Obtiene todos los archivos y subcarpetas
4. **Copia recursivamente**:
   - Para cada archivo: lo copia a la nueva carpeta
   - Para cada subcarpeta: repite el proceso recursivamente
5. **Cuenta los elementos**: Lleva un registro de cuántos elementos se copiaron

### Código Técnico

La función `copyFolder` en `/app/api/copy-file/route.ts`:

```typescript
async function copyFolder(
  drive: any,
  folderId: string,
  folderName: string,
  parentId: string | null
): Promise<{ id: string; name: string; webViewLink: string; itemsCopied: number }>
```

- Crea la carpeta destino
- Lista todos los elementos con `drive.files.list()`
- Copia archivos con `drive.files.copy()`
- Llama recursivamente para subcarpetas

## ⏱️ Consideraciones de Rendimiento

### Tiempo de Copia

| Tamaño de Carpeta | Tiempo Estimado |
|-------------------|-----------------|
| Pequeña (< 10 archivos) | 5-15 segundos |
| Mediana (10-50 archivos) | 30-60 segundos |
| Grande (50-200 archivos) | 2-5 minutos |
| Muy grande (> 200 archivos) | 5-15 minutos |

### Limitaciones

- **Límite de API**: Google Drive API tiene límites de uso
- **Timeout**: Carpetas muy grandes pueden exceder el timeout del servidor
- **Memoria**: Cada archivo se procesa secuencialmente para evitar problemas de memoria

## 🔧 Características Técnicas

### Detección Automática

La aplicación detecta automáticamente si la URL es de un archivo o carpeta:

```typescript
const isFolder = fileMetadata.data.mimeType === "application/vnd.google-apps.folder";
```

### Manejo de Errores

- Si un archivo individual falla, la copia continúa con los demás
- Los errores se registran en la consola pero no detienen el proceso
- El contador final refleja solo los elementos copiados exitosamente

### Formatos de URL Soportados

**Carpetas:**
- `https://drive.google.com/drive/folders/FOLDER_ID`
- Solo el `FOLDER_ID`

**Archivos (como antes):**
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`
- Solo el `FILE_ID`

## 💡 Casos de Uso

### 1. Backup de Carpetas
Crea copias de seguridad de carpetas importantes

### 2. Compartir Estructura
Duplica una estructura de carpetas para compartir con otros

### 3. Plantillas de Proyectos
Copia carpetas de plantillas para nuevos proyectos

### 4. Organización
Reorganiza tu Drive copiando carpetas a nuevas ubicaciones

## ⚠️ Advertencias

### Carpetas Grandes

Para carpetas con más de 100 archivos:
- El proceso puede tardar varios minutos
- No cierres la ventana del navegador
- Mantén la pestaña activa
- Verás un indicador de carga durante el proceso

### Permisos

- Necesitas tener acceso de lectura a todos los archivos de la carpeta
- Si algún archivo no es accesible, se omitirá pero la copia continuará
- La carpeta copiada se creará en la raíz de tu Drive

### Cuota de API

Google Drive API tiene límites:
- 1,000 consultas por 100 segundos por usuario
- Si copias muchas carpetas grandes, podrías alcanzar el límite
- En ese caso, espera unos minutos antes de intentar nuevamente

## 🎨 Interfaz de Usuario

### Mensaje de Éxito

Cuando se copia una carpeta, verás:
- ✅ Nombre de la carpeta copiada
- ✅ Número total de elementos copiados
- ✅ Enlace para ver la carpeta en Drive

Ejemplo:
```
Carpeta copiada exitosamente con 45 elementos
Mi Proyecto
Se copiaron 45 elementos en total
[Ver en Drive]
```

### Indicador de Progreso

Durante la copia:
- Spinner de carga animado
- Mensaje "Copiando archivo..."
- El botón se deshabilita para evitar duplicados

## 🔄 Próximas Mejoras

Posibles mejoras futuras:
- [ ] Barra de progreso con porcentaje
- [ ] Opción para elegir carpeta destino
- [ ] Copia paralela de archivos (más rápida)
- [ ] Opción para mantener o cambiar nombres
- [ ] Filtros por tipo de archivo
- [ ] Previsualización antes de copiar

## 📝 Notas Técnicas

### Recursión

La función usa recursión para manejar subcarpetas:
```typescript
if (item.mimeType === "application/vnd.google-apps.folder") {
  const subfolderResult = await copyFolder(
    drive,
    item.id,
    item.name,
    newFolder.data.id
  );
  itemsCopied += subfolderResult.itemsCopied;
}
```

### Contador de Elementos

El contador incluye:
- Todos los archivos copiados
- Todas las carpetas creadas (incluyendo la raíz)
- Se suma recursivamente desde las subcarpetas

## ✅ Testing

Para probar la funcionalidad:

1. **Carpeta simple**: Crea una carpeta con 3-5 archivos
2. **Carpeta con subcarpetas**: Crea una carpeta con 2 subcarpetas
3. **Carpeta grande**: Prueba con una carpeta de 20+ archivos
4. **Carpeta vacía**: Verifica que funcione con carpetas sin contenido

---

¡Disfruta de la nueva funcionalidad de copia de carpetas! 🎉
