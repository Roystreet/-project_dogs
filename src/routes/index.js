const router = require("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Temperament, Dog } = require("../db");
const { getDogs } = require("../Controllers/DogsController");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query;
    const data = await getDogs();
    if (name) {
      s;
      const datafiltrada = data.filter((data) => data.name === name);
      if (datafiltrada.length > 0) {
        res.status(200).json(datafiltrada);
      } else {
        res.status(404).json({ message: "Dog no encontrado" });
      }
    } else {
      res.status(200).json(data);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/dogs/id", async (req, res) => {});

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

router.get("/temperament", async (req, res) => {});

module.exports = router;
