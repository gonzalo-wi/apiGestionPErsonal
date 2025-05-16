import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import * as glide from "@glideapps/tables";

const app = express();
app.use(cors());
app.use(express.json());

const categoriasTable = glide.table({
  token: "5e52f944-8d35-435e-b2a0-73c9281be943",
  app: "oWYpFv9Z629uWhWWRz9r",
  table: "native-table-0tB7PkKhQJtr67hYfKnt", 
  columns: {
    nombre: { type: "string", name: "Categoria" }
  }
});

// GET
app.get("/categorias", async (req: Request, res: Response) => {
  try {
    const categorias = await categoriasTable.get();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// POST
const postCategoria: RequestHandler = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    res.status(400).json({ error: "Falta el nombre de la categoría" });
    return;
  }

  try {
    const result = await categoriasTable.add({ nombre });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar categoría" });
  }
};
app.post("/categorias", postCategoria);

// PUT
const putCategoria: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre) {
    res.status(400).json({ error: "Falta el nuevo nombre" });
    return;
  }

  try {
    const result = await categoriasTable.update(id, { nombre });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
};
app.put("/categorias/:id", putCategoria);

app.listen(3000, () => {
  console.log("API REST disponible en http://localhost:3000");
});