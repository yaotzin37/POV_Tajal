# Estructura de Datos del Menú

Este documento detalla la estructura de los archivos JSON que definen el menú.

## `categories.json`

Describe las categorías del menú.

```json
[
  {
    "id": "cat-01",
    "name": "Entradas",
    "order": 1
  }
]
```

## `dishes.json`

Contiene todos los platos del menú.

```json
[
  {
    "id": "dish-001",
    "name": "Plato de Ejemplo",
    "description": "Una descripción del plato.",
    "price": 10.99,
    "categoryId": "cat-01",
    "allergens": ["gluten", "dairy"]
  }
]
```

## `pairing-recommendations.json`

Define las recomendaciones de maridaje.

```json
[
  {
    "dishId": "dish-001",
    "wineId": "wine-05"
  }
]
```
