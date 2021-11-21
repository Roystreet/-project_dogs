const router = require("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Temperament, Dog } = require("../db");
const { getDogs } = require("../Controllers/DogsController");
const { dogTemperament } = require("../Controllers/TemperamentsController.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query;
    const data = await getDogs();
    if (name) {
      const datafiltrada = data.filter(
        (data) => data.name.toLowerCase() === name.toLowerCase()
      );
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

router.get("/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dog = await getDogs();
    console.log(dog.length);
    const dogId = dog.filter((d) => d.id == id);
    if (dogId.length > 0) {
      res.status(200).json(dogId);
    } else {
      res.status(404).json({ message: "Dog no encontrado" });
    }
  } catch (e) {
    console.log("error");
  }
});

router.post("/dogs", async (req, res) => {
  const { name, img, height, weight, age, temperament } = req.body;

  console.log(weight);
  try {
    const newDog = await Dog.create({
      name: name,
      img: img,
      height: height,
      weight: weight,
      age: age,
    });

    await newDog.setTemperaments(temperament);

    res
      .status(200)
      .json({ message: " se ha creado un nuevo Dog de manera exitosa" });
  } catch (e) {
    console.log(e);
  }
});

router.get("/temperament", async (req, res) => {
  try {
    const temperament = await dogTemperament();
    res.status(200).json(temperament);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
