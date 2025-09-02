const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const PROJECT_ROOT = path.resolve(__dirname, '../../');
const DATA_DIR = path.join(PROJECT_ROOT, 'public', 'data');
const BACKUP_DIR = path.join(PROJECT_ROOT, 'backups');
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-');
const BACKUP_FILE = `backup-${TIMESTAMP}.zip`;
const BACKUP_PATH = path.join(BACKUP_DIR, BACKUP_FILE);

// Crea el directorio de backups si no existe
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

console.log(`Creando respaldo en ${BACKUP_PATH}...`);

// Crea un stream de salida para el archivo zip
const output = fs.createWriteStream(BACKUP_PATH);
const archive = archiver('zip', {
  zlib: { level: 9 } // Nivel de compresión máximo
});

// Pipe del stream de archiver al stream de salida
archive.pipe(output);

// Añade el directorio 'data' al archivo zip
archive.directory(DATA_DIR, 'data');

// Finaliza el archivado
archive.finalize();

output.on('close', () => {
  console.log(`✅ Respaldo creado exitosamente: ${archive.pointer()} bytes escritos.`);
  cleanupOldBackups();
});

archive.on('error', (err) => {
  console.error('❌ Error al crear respaldo:', err);
  process.exit(1);
});

function cleanupOldBackups() {
  console.log('🧹 Buscando respaldos antiguos para eliminar...');
  try {
    const backups = fs.readdirSync(BACKUP_DIR)
      .filter(file => file.startsWith('backup-') && file.endsWith('.zip'))
      .sort()
      .slice(0, -7); // Mantiene los 7 más recientes

    if (backups.length > 0) {
      backups.forEach(file => {
        fs.unlinkSync(path.join(BACKUP_DIR, file));
        console.log(`- Eliminado respaldo antiguo: ${file}`);
      });
    } else {
      console.log('No hay respaldos antiguos que eliminar.');
    }
  } catch (error) {
    console.error('❌ Error al limpiar respaldos antiguos:', error);
  }
}