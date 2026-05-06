import { useEffect, useState } from "react";
import API from "../services/api";
import Table from "../components/Table";

function Libros() {
  const [libros, setLibros] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    stock: "",
    id_categoria: "",
    id_editorial: ""
  });

  const getLibros = async () => {
    try {
      const res = await API.get("/libros");
      setLibros(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLibros();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/libros", form);
      alert("Libro agregado");

      setForm({
        titulo: "",
        stock: "",
        id_categoria: "",
        id_editorial: ""
      });

      getLibros();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Libros</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="id_categoria"
          placeholder="ID Categoría"
          value={form.id_categoria}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="id_editorial"
          placeholder="ID Editorial"
          value={form.id_editorial}
          onChange={handleChange}
          required
        />

        <button type="submit">Guardar</button>
      </form>

      {/* TABLA */}
      <Table
        data={libros}
        columns={["id", "titulo", "stock", "id_categoria", "id_editorial"]}
      />
    </div>
  );
}

export default Libros;