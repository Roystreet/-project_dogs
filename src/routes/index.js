const router = require("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Temperament, Dog } = require("../db");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/dogs", (req, res) => {
  Dog.create({
    name: "perro",
    img: "rutasdkajsda",
    height: "25-26",
    weight: "30-52",
    age: 5,
  })
    .then((result) => res.status(200).json(result))
    .catch((result) => res.status(400).json({ message: result }));
});

router.get("/dogs", (req, res) => {
  Dog.findAll()
    .then((result) => res.status(200).json({ message: result }))
    .catch((result) => res.status(400).json({ message: result }));
});

module.exports = router;
