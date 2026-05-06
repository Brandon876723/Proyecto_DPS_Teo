const db = require('../db/connection');

exports.getPrestamos = (req, res) => {
  db.query('SELECT * FROM prestamo', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createPrestamo = (req, res) => {
  const { id_libro, id_estudiante, id_bibliotecario } = req.body;

  db.query(
    'INSERT INTO prestamo (id_libro, id_estudiante, id_bibliotecario, fecha_prestamo) VALUES (?, ?, ?, NOW())',
    [id_libro, id_estudiante, id_bibliotecario],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Préstamo creado' });
    }
  );
};