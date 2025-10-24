# 🔄 Reiniciar el Servidor

## Pasos Rápidos

1. **Detener el servidor actual**:
   - Ve a la terminal donde está corriendo `pnpm dev`
   - Presiona `Ctrl + C`

2. **Limpiar la caché** (opcional):
   ```powershell
   Remove-Item -Recurse -Force .next
   ```

3. **Reiniciar**:
   ```bash
   pnpm dev
   ```

4. **Refrescar el navegador**:
   - Presiona `Ctrl + Shift + R` en http://localhost:3000

---

## ¿Por qué es necesario?

Next.js a veces no detecta automáticamente los nuevos archivos de API. Un reinicio completo soluciona este problema.
