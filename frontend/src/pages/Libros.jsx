import { useEffect, useState } from "react";
import API from "../services/api";

function Libros() {
  const [libros, setLibros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editoriales, setEditoriales] = useState([]);

  const [form, setForm] = useState({
    titulo: "",
    stock: "",
    id_categoria: "",
    id_editorial: ""
  });

  // 🔄 Cargar datos
  const getData = async () => {
    const librosRes = await API.get("/libros");
    const catRes = await API.get("/libros/categorias");
    const editRes = await API.get("/libros/editoriales");

    setLibros(librosRes.data);
    setCategorias(catRes.data);
    setEditoriales(editRes.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // 📝 Formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/libros", form);
    alert("Libro agregado");
    setForm({ titulo: "", stock: "", id_categoria: "", id_editorial: "" });
    getData();
  };

  const deleteLibro = async (id) => {
    await API.delete(/libros/`${id}`);
    getData();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📚 Gestión de Libros</h1>

      {/* FORM */}
      <form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
        <input name="titulo" placeholder="Título" onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />

        {/* SELECT CATEGORIA */}
        <select name="id_categoria" onChange={handleChange} required>
          <option value="">Categoría</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        {/* SELECT EDITORIAL */}
        <select name="id_editorial" onChange={handleChange} required>
          <option value="">Editorial</option>
          {editoriales.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>

        <button>Guardar</button>
      </form>

      {/* TABLA */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.titulo}</td>
              <td>{l.stock}</td>
              <td>
                <button onClick={() => deleteLibro(l.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Libros;