const express = require('express');
const cors = require('cors');

const libroRoutes = require('./routes/libroRoutes');
const prestamoRoutes = require('./routes/prestamoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/libros', libroRoutes);
app.use('/prestamos', prestamoRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});