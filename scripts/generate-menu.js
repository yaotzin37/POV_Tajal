
const fs = require('fs');
const path = require('path');

console.log("Generando menú...");

try {
    // Rutas a los archivos de datos y al archivo de salida
        const dataPath = path.join(__dirname, '..', 'public', 'data', 'menu', 'current');
    const outputPath = path.join(__dirname, '..', 'public', 'menu.html');

    // Leer los datos de los archivos JSON
    const categoriesRaw = fs.readFileSync(path.join(dataPath, 'categories.json'), 'utf8');
    const dishesRaw = fs.readFileSync(path.join(dataPath, 'dishes.json'), 'utf8');

    const categories = JSON.parse(categoriesRaw);
    const dishes = JSON.parse(dishesRaw);

    // Crear un mapa de categorías para un acceso más fácil
    const categoryMap = new Map(categories.map(cat => [cat.id, { ...cat, dishes: [] }]));

    // Agrupar los platillos por categoría
    dishes.forEach(dish => {
        const category = categoryMap.get(dish.categoryId);
        if (category) {
            category.dishes.push(dish);
        }
    });

    // Generar el contenido HTML
    let htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú - Restaurante Tajal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1 class="menu-title">Menú de Tajal</h1>
`;

    // Función para renderizar una categoría y sus platillos
    const renderCategory = (categoryId) => {
        const category = categoryMap.get(categoryId);
        if (!category || category.dishes.length === 0) return '';

        let categoryHtml = `<h2 class="category-title">${category.name}</h2>`;
        category.dishes.forEach(dish => {
            categoryHtml += `
                <div class="dish-row">
                    <div class="dish-details">
                        <div class="dish-name">${dish.name}</div>
                        <div class="dish-description">${dish.description}</div>
                    </div>
                    <div class="dish-price">$${dish.price}</div>
                </div>
            `;
        });
        return categoryHtml;
    };

    // Renderizar categorías principales (las que no tienen padre)
    categories.filter(cat => !cat.parent).forEach(mainCategory => {
        htmlContent += renderCategory(mainCategory.id);

        // Renderizar subcategorías
        categories.filter(subCat => subCat.parent === mainCategory.id).forEach(subCategory => {
            htmlContent += renderCategory(subCategory.id);
        });
    });


    htmlContent += `
    </div>
</body>
</html>
`;

    // Escribir el archivo HTML
    fs.writeFileSync(outputPath, htmlContent, 'utf8');

    console.log("Menú generado exitosamente en: " + outputPath);

} catch (error) {
    console.error("Error al generar el menú:", error);
}
