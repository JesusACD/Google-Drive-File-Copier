# Solución: Cuenta Incorrecta

## 🔴 Tu Problema Específico

Puedes acceder al archivo desde el navegador en modo incógnito, pero la aplicación dice que no tienes permisos. Esto significa que **estás autenticado con una cuenta diferente** en la aplicación.

## 🎯 Solución Paso a Paso

### Paso 1: Verificar con qué cuenta estás autenticado

1. Mira la esquina superior derecha de la aplicación
2. Verás un texto que dice **"Autenticado como: tu-correo@gmail.com"**
3. **Anota ese correo electrónico**

### Paso 2: Verificar con qué cuenta accedes al archivo

1. Abre el archivo en modo incógnito: https://drive.google.com/file/d/1dT8ehkUzG4S4xNEpatDjVzYpptP1QERE/view
2. Te pedirá que inicies sesión
3. **Anota con qué cuenta inicias sesión**

### Paso 3: Comparar las cuentas

**¿Son la misma cuenta?**

- ❌ **NO** → Sigue al Paso 4
- ✅ **SÍ** → Sigue al Paso 5

---

## 📝 Paso 4: Cambiar de cuenta en la aplicación

Si las cuentas son diferentes, necesitas cerrar sesión y volver a autenticarte:

1. En la aplicación, haz clic en **"Cerrar sesión"** (botón en la esquina superior derecha)
2. Haz clic en **"Iniciar sesión con Google"**
3. **IMPORTANTE**: Selecciona la **misma cuenta** con la que accedes al archivo en modo incógnito
4. Acepta los permisos solicitados
5. Verifica que el correo mostrado en la esquina superior derecha sea el correcto
6. Intenta copiar el archivo nuevamente

**¡Debería funcionar ahora!** ✅

---

## 📝 Paso 5: Compartir el archivo con tu cuenta

Si quieres mantener la cuenta actual en la aplicación, necesitas que el archivo esté compartido con esa cuenta:

### Opción A: Hacer el archivo público

1. Abre el archivo en tu navegador: https://drive.google.com/file/d/1dT8ehkUzG4S4xNEpatDjVzYpptP1QERE/view
2. Haz clic en el botón **"Compartir"** (esquina superior derecha)
3. Haz clic en **"Cambiar"** junto a "Restringido"
4. Selecciona **"Cualquier persona con el enlace"**
5. Asegúrate de que el rol sea al menos **"Visualizador"**
6. Haz clic en **"Listo"**
7. Vuelve a la aplicación e intenta copiar el archivo

### Opción B: Compartir con tu cuenta específica

1. Abre el archivo en tu navegador
2. Haz clic en **"Compartir"**
3. En el campo "Agregar personas y grupos", escribe el correo que aparece en la aplicación
4. Selecciona al menos **"Visualizador"** como rol
5. Haz clic en **"Enviar"**
6. Vuelve a la aplicación e intenta copiar el archivo

---

## 🔍 ¿Por Qué Pasa Esto?

Google Drive tiene permisos por cuenta. Cuando accedes en modo incógnito, probablemente usas una cuenta diferente a la que usaste para autenticarte en la aplicación.

**Ejemplo:**
- Cuenta A (trabajo@empresa.com): Tiene acceso al archivo
- Cuenta B (personal@gmail.com): NO tiene acceso al archivo

Si te autenticaste en la aplicación con la Cuenta B, pero el archivo solo está compartido con la Cuenta A, obtendrás el error "Archivo no encontrado".

---

## ✅ Verificación Final

Después de seguir los pasos, verifica:

1. ✅ El correo en la aplicación es el correcto
2. ✅ Puedes acceder al archivo con ese correo en el navegador
3. ✅ El archivo está compartido contigo o es público
4. ✅ Tienes al menos permisos de "Visualizador"

Si todo está correcto, la copia debería funcionar sin problemas.

---

## 💡 Consejo para el Futuro

Para evitar este problema:

1. **Siempre verifica con qué cuenta estás autenticado** (mira la esquina superior derecha)
2. **Usa archivos de tu propio Drive** para pruebas
3. **Si usas archivos de otros**, asegúrate de que estén compartidos con tu cuenta

---

## 🆘 ¿Aún No Funciona?

Si después de seguir todos los pasos sigues teniendo problemas:

1. **Cierra completamente el navegador** y vuelve a abrirlo
2. **Borra las cookies** del sitio localhost:3000
3. **Reinicia el servidor de desarrollo**:
   ```bash
   # Presiona Ctrl+C para detener el servidor
   pnpm dev
   ```
4. **Vuelve a iniciar sesión** con la cuenta correcta

---

## 📊 Resumen Visual

```
┌─────────────────────────────────────────────────────┐
│  Aplicación                                         │
│  Autenticado como: cuenta-A@gmail.com              │
└─────────────────────────────────────────────────────┘
                    ↓
         ¿Cuenta-A tiene acceso al archivo?
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
       SÍ                      NO
        ↓                       ↓
   ✅ Funciona          ❌ Error 404
                              ↓
                    Solución: Cambiar cuenta
                    o compartir archivo
```
