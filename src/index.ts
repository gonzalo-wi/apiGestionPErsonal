import express, { Request, Response } from "express";
import cors from "cors";
import * as glide from "@glideapps/tables";

const app = express();
app.use(cors());
app.use(express.json());

const nominaTable = glide.table({
  token: "5e52f944-8d35-435e-b2a0-73c9281be943",
  app: "oWYpFv9Z629uWhWWRz9r",
  table: "native-table-0tB7PkKhQJtr67hYfKnt",
  columns: {
    area: { type: "string", name: "zQgxz" },
    cargo: { type: "string", name: "ltlo2" },
    legajo: { type: "number", name: "Legajo" },
    apellido: { type: "string", name: "Apellido" },
    nombre: { type: "string", name: "Nombre" },
    dni: { type: "number", name: "Dni" },
    fechaNac: { type: "date-time", name: "Fecha Nac" },
    fechaIngreso: { type: "date-time", name: "Fecha Ingreso" },
    categoria: { type: "string", name: "Categoria" },
    sucursal: { type: "string", name: "Sucursal" },
    cuil: { type: "number", name: "Cuil" },
    region: { type: "string", name: "SECTOR" },
    domicilio: { type: "string", name: "Domicilio" },
    localidad: { type: "string", name: "Localidad" },
    telefono: { type: "phone-number", name: "Telefono" },
    mail: { type: "email-address", name: "Mail" },
    estado: { type: "string", name: "Estado" },
    categoriaCronos: { type: "string", name: "Categoria Cronos" },
    rto: { type: "number", name: "Rto" },
    banda: { type: "string", name: "Banda" },
    sociedad: { type: "string", name: "Sociedad" },
    horario: { type: "string", name: "Horario" },
    tipoDeRegistro: { type: "string", name: "Tipo de registro" },
    vtoRegistro: { type: "date-time", name: "Vto registro" },
    personalDesasignadoRegional: { type: "string", name: "7ZW5r" },
    created: { type: "date-time", name: "0IUFy" }
  }
});

// GET todas las nóminas
app.get("/nominas", async (req: Request, res: Response) => {
  try {
    const nominas = await nominaTable.get();
    res.json(nominas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener nóminas" });
  }
});

// POST agregar nómina(s)
app.post("/nominas", async (req: Request, res: Response) => {
  const data = Array.isArray(req.body) ? req.body : [req.body];
  const invalid = data.find(item => !(item.nombre || item.categoria));
  if (invalid) {
    res.status(400).json({ error: "Falta el nombre o la categoría en uno o más objetos" });
    return;
  }
  try {
    const results = [];
    for (const item of data) {
      const row = {
        area: item.area,
        cargo: item.cargo,
        legajo: item.legajo,
        apellido: item.apellido,
        nombre: item.nombre || item.categoria,
        dni: item.dni,
        fechaNac: item.fechaNac,
        fechaIngreso: item.fechaIngreso,
        categoria: item.categoria,
        sucursal: item.sucursal,
        cuil: item.cuil,
        region: item.region,
        domicilio: item.domicilio,
        localidad: item.localidad,
        telefono: item.telefono,
        mail: item.mail,
        estado: item.estado,
        categoriaCronos: item.categoriaCronos,
        rto: item.rto,
        banda: item.banda,
        sociedad: item.sociedad,
        horario: item.horario,
        tipoDeRegistro: item.tipoDeRegistro,
        vtoRegistro: item.vtoRegistro,
        personalDesasignadoRegional: item.personalDesasignadoRegional,
        created: item.created
      };
      const result = await nominaTable.add(row);
      results.push(result);
    }
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar nómina" });
  }
});

app.put("/nominas/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateFields = req.body;
  if (!id) {
    res.status(400).json({ error: "Falta el id del registro" });
    return;
  }
  try {
    const result = await nominaTable.update(id, updateFields);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar nómina" });
  }
});

app.listen(3000, () => {
  console.log("API REST disponible en http://localhost:3000");
});