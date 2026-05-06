const db = require('../db/connection');

exports.getLibros = (req, res) => {
  db.query('SELECT * FROM libro', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createLibro = (req, res) => {
  const { titulo, stock, id_categoria, id_editorial } = req.body;

  db.query(
    'INSERT INTO libro (titulo, stock, id_categoria, id_editorial) VALUES (?, ?, ?, ?)',
    [titulo, stock, id_categoria, id_editorial],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Libro creado' });
    }
  );
};

exports.deleteLibro = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM libro WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Libro eliminado" });
  });
};