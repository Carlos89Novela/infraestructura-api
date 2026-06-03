const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*"
}));


let logs = [];

// GET
app.get("/api/logs", (req, res) => {
  res.json(logs);
});

// POST logs
app.post("/api/logs", (req, res) => {

  if (!req.body.usuario || !req.body.accion) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const log = {
    usuario: req.body.usuario,
    fecha: new Date(),
    ip: req.ip,
    accion: req.body.accion
  };

  logs.push(log);

  res.status(201).json(log);
});

// ✅ NUEVO ENDPOINT (RECUPERAR CONTRASEÑA)
app.post("/api/recover", (req, res) => {

  if (!req.body || !req.body.usuario) {
    return res.status(400).json({
      error: "Usuario requerido"
    });
  }

  const token = Math.random().toString(36).substring(2);

  console.log("Simulación de envío de correo");
  console.log("Usuario:", req.body.usuario);
  console.log("Token:", token);

  res.json({
    message: "Correo simulado enviado",
    token: token
  });
});

// ✅ SIEMPRE AL FINAL
app.listen(4000, () => {
  console.log("API corriendo en puerto 4000");
});

// Cambio para PR