| Name            | Description                                           |
| --------------- | ----------------------------------------------------- |
| id              | UUID generated from cryptographically secure function |
| name            | Item name                                             |
| quantity        | Quantity                                              |
| quantityName    | "x" for generic items, "kg", "l"                      |
| checked         | boolean                                               |
| lastChecked     | short date stored as number DDMMYYYY. eg: `18122023`  |
| lastUnchecked   | time stored as stored as unix timestamp (ms)          |
| averageDuration | average duration in days between "check" events       |
| count           | number of data points for averageDuration calculation |
