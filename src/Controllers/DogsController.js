require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Dog } = require("../db"); // Nos traemos el modelo dogs  para manejaro desde aca
const axios = require("axios").default;

// Creo una funcion que me retorne todos los perros

const getDogs = async () => {
  try {
    //const dogs = [];
    const api = await axios.get(URL);
    const listDogs = api.data;
    console.log(listDogs);
  } catch (e) {
    // console.log(e);
  }
};

console.log(getDogs());
