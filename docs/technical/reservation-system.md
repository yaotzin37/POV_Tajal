# Sistema de Reservas

Este documento describe la estructura de datos y la lógica para el sistema de reservas.

## `tables.json`

Define la información de cada mesa.

```json
[
  {
    "id": "table-01",
    "capacity": 4,
    "location": "Terraza"
  }
]
```

## `reservations.json`

Almacena las reservas activas.

```json
[
  {
    "id": "res-001",
    "tableId": "table-01",
    "customerName": "Juan Pérez",
    "time": "2023-12-24T20:00:00Z",
    "pax": 4
  }
]
```
