const fs = require('fs');
const path = require('path');

const slugify = (text) => {
  if (!text) return '';
  return text.toString().toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const INPUT_FILE = path.join(__dirname, '../temp_menu.json');
const OUTPUT_DIR = path.join(__dirname, '../data/menu/current');
const CATEGORIES_OUTPUT_FILE = path.join(OUTPUT_DIR, 'categories.json');
const DISHES_OUTPUT_FILE = path.join(OUTPUT_DIR, 'dishes.json');

try {
  console.log(`Leyendo el archivo de menú de origen: ${INPUT_FILE}`);
  const sourceData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));

  const categories = [];
  const dishes = [];
  let dishCounter = 1;

  for (const section of sourceData.sections) {
    const mainCategoryId = section.id || slugify(section.title);
    console.log(`Procesando sección: ${section.title} (ID: ${mainCategoryId})`);

    categories.push({
      id: mainCategoryId,
      name: section.title,
      parent: null
    });

    if (section.items) {
      for (const item of section.items) {
        dishes.push({
          id: `dish-${String(dishCounter++).padStart(3, '0')}`,
          name: item.name,
          description: item.description || '',
          price: item.price, // Se mantiene como string
          categoryId: mainCategoryId
        });
      }
    }

    if (section.categories) {
      for (const subCategory of section.categories) {
        const subCategoryId = slugify(subCategory.title);
        console.log(`Procesando sub-categoría: ${subCategory.title} (ID: ${subCategoryId})`);

        categories.push({
          id: subCategoryId,
          name: subCategory.title,
          parent: mainCategoryId
        });

        if (subCategory.items) {
          for (const item of subCategory.items) {
            dishes.push({
              id: `dish-${String(dishCounter++).padStart(3, '0')}`,
              name: item.name,
              description: item.description || '',
              price: item.price, // Se mantiene como string
              categoryId: subCategoryId
            });
          }
        }
      }
    }
  }

  console.log(`Escritura de ${categories.length} categorías en: ${CATEGORIES_OUTPUT_FILE}`);
  fs.writeFileSync(CATEGORIES_OUTPUT_FILE, JSON.stringify(categories, null, 2));

  console.log(`Escritura de ${dishes.length} platos en: ${DISHES_OUTPUT_FILE}`);
  fs.writeFileSync(DISHES_OUTPUT_FILE, JSON.stringify(dishes, null, 2));

  console.log('✅ Conversión completada exitosamente.');

} catch (error) {
  console.error('❌ Error durante el proceso de conversión:', error);
  process.exit(1);
}
