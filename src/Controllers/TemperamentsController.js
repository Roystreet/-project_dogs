require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Temperament } = require("../db"); // Nos traemos el modelo temperamento para manejaro desde aca
const axios = require("axios").default;

const saveTemperament = async () => {
  const listTemperament = [];
  const dogs = await axios.get(URL);

  for (let i = 1; i < dogs.data.length - 1; i++) {
    let temperamentsDogs = dogs.data[i].temperament;

    if (temperamentsDogs) {
      // La api trae dogs que no traen la propiedad temperamentos hago la validacion para que no me de error
      listTemperament.push(temperamentsDogs.split(","));
    }
  }
  const totalTemperaments = listTemperament.flat();
  const data = new Set(totalTemperaments);
  const temperamentsApi = [...data];
  const objeto = temperamentsApi.map((data) => {
    return { name: data };
  });

  Temperament.bulkCreate(objeto, { validate: true })
    .then((result) => {
      console.log("logrado");
    })
    .catch((err) => {
      console.log(err + "negado ");
    });
};

module.exports = {
  temperament: saveTemperament,
};
