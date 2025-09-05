# Script para configurar el firewall para Vite Dev Server
# Ejecutar como administrador

Write-Host "Configurando reglas de firewall para Vite Dev Server..." -ForegroundColor Green

# Agregar regla para puerto 5173
netsh advfirewall firewall add rule name="Vite Dev Server - Puerto 5173" dir=in action=allow protocol=TCP localport=5173

# Agregar regla para puerto 5174 (backup)
netsh advfirewall firewall add rule name="Vite Dev Server - Puerto 5174" dir=in action=allow protocol=TCP localport=5174

# Agregar regla para puerto 5175 (backup)
netsh advfirewall firewall add rule name="Vite Dev Server - Puerto 5175" dir=in action=allow protocol=TCP localport=5175

Write-Host "Reglas de firewall agregadas exitosamente!" -ForegroundColor Green
Write-Host "Ahora puedes acceder desde tu teléfono usando:" -ForegroundColor Yellow
Write-Host "http://192.168.0.3:5173/" -ForegroundColor Cyan
Write-Host "http://192.168.56.1:5173/" -ForegroundColor Cyan

Read-Host "Presiona Enter para continuar..."
