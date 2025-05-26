import express, { Request, Response } from "express";
import * as glide from "@glideapps/tables";

const ticketsApp = express();
ticketsApp.use(express.json());

const ticketsTable = glide.table({
  token: "5e52f944-8d35-435e-b2a0-73c9281be943",
  app: "oWYpFv9Z629uWhWWRz9r",
  table: "native-table-WegwJnzLERg10PS0V6hr",
  columns: {
    idCreador: { type: "string", name: "ID" },
    novedad: { type: "string", name: "Novedad" },
    fechaCreaciN: { type: "date-time", name: "Fecha de creación" },
    idEmpleado: { type: "string", name: "Legajo creador" },
    fechaInicio: { type: "date-time", name: "Fecha de inicio" },
    fechaFin: { type: "date-time", name: "Fecha de fin" },
    comentario: { type: "string", name: "Comentario" },
    attachment: { type: "string", name: "Attachment" },
    validaciN: { type: "boolean", name: "Validación" },
    idValidador: { type: "string", name: "Validador" },
    lastModified: { type: "date-time", name: "59m64" },
    regiNAsignadaDesdeEjecuciN: { type: "string", name: "jOlLV" },
    eliminar: { type: "boolean", name: "6B3Yp" },
    source: { type: "string", name: "YktKM" },
    idCronos: { type: "string", name: "yITBB" }
  }
});

// Consultar todos los tickets
ticketsApp.get("/tickets", async (_req: Request, res: Response) => {
  try {
    const tickets = await ticketsTable.get();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tickets" });
  }
});

// Agregar ticket(s)
ticketsApp.post("/tickets", async (req: Request, res: Response) => {
  const data = Array.isArray(req.body) ? req.body : [req.body];
  try {
    const results = [];
    for (const item of data) {
      const row = {
        idCreador: item.idCreador,
        novedad: item.novedad,
        fechaCreaciN: item.fechaCreaciN,
        idEmpleado: item.idEmpleado,
        fechaInicio: item.fechaInicio,
        fechaFin: item.fechaFin,
        comentario: item.comentario,
        attachment: item.attachment,
        validaciN: item.validaciN,
        idValidador: item.idValidador,
        lastModified: item.lastModified,
        regiNAsignadaDesdeEjecuciN: item.regiNAsignadaDesdeEjecuciN,
        eliminar: item.eliminar,
        source: item.source,
        idCronos: item.idCronos
      };
      const result = await ticketsTable.add(row);
      results.push(result);
    }
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar ticket" });
  }
});

// Editar ticket
ticketsApp.put("/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateFields = req.body;
  if (!id) {
    res.status(400).json({ error: "Falta el id del ticket" });
    return;
  }
  try {
    const result = await ticketsTable.update(id, updateFields);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar ticket" });
  }
});

// Eliminar ticket
ticketsApp.delete("/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Falta el id del ticket" });
    return;
  }
  try {
    await ticketsTable.delete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar ticket" });
  }
});

export default ticketsApp;