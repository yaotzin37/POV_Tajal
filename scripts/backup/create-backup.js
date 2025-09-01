const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '../../');
const BACKUP_DIR = path.join(PROJECT_ROOT, 'backups');
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-');

// Crea directorio de backups si no existe
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Crea archivo de respaldo
const backupPath = path.join(BACKUP_DIR, `backup-${TIMESTAMP}.zip`);
console.log(`Creando respaldo en ${backupPath}...`);

// Comprime los datos importantes
try {
  // Usamos la opción cwd para asegurar que el comando se ejecute desde la raíz del proyecto.
  execSync(`zip -r "${backupPath}" data public/img/dishes public/img/tables`, { cwd: PROJECT_ROOT });
  console.log('✅ Respaldo creado exitosamente');

  // Mantiene solo los últimos 7 días de respaldos
  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.startsWith('backup-'))
    .sort()
    .slice(0, -7);

  backups.forEach(file => {
    fs.unlinkSync(path.join(BACKUP_DIR, file));
    console.log(`🧹 Eliminado respaldo antiguo: ${file}`);
  });
} catch (error) {
  console.error('❌ Error al crear respaldo:', error);
  process.exit(1);
}
