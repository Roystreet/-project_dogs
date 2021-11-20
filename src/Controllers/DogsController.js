require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Dog, Temperament } = require("../db"); // Nos traemos el modelo dogs  para manejaro desde aca
const axios = require("axios").default;

// Creo una funcion que me retorne todos los perros

const getDogs = async () => {
  try {
    //const dogs = [];
    const api = await axios.get(URL);
    const listDogs = api.data;
    // console.log(listDogs);
    // console.log(listDogs);
    const objeto = listDogs.map((data) => {
      return {
        id: data.id,
        name: data.name,
        img: data.image.url,
        height: data.height.metric,
        weight: data.weight.metric,
        age: data.life_span,
        temperament: data.temperament ? data.temperament : "sin temperamentos",
      };
    });

    return objeto;
  } catch (e) {
    console.log(e);
  }
};

const dogsDatabases = async () => {
  try {
    //const dogs = await Dog.findAll({ include: "temperament" });
    // const totalDogs=
  } catch (e) {
    console.log("error");
  }
};

const totalDogs = async () => {
  try {
    const apiDogs = await getDogs();
    const dataDB = await Dog.findAll({ include: Temperament });
    console.log(apiDogs);
    console.log(dataDB.length);
    return dataDB;
  } catch (e) {
    console.log;
  }
};

totalDogs()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err + "ultimo errror");
  });
