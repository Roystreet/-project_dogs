require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Dog, Temperament } = require("../db"); // Nos traemos el modelo dogs  para manejaro desde aca
const axios = require("axios").default;

// Creo una funcion que me retorne todos los perros de la api con la data tratada

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

// Funcion para tener los perros de la base de datos ya tratados
const getDogDb = async () => {
  try {
    const dogs = await Dog.findAll({ include: Temperament });
    const totalDogs = dogs.map((data) => {
      return {
        id: data.id,
        name: data.name,
        image: data.img,
        height: data.height,
        weight: data.weight,
        age: data.age,
        temperament: data.temperaments
          .map((temperament) => temperament.dataValues.name)
          .reduce((a, b) => a + ", " + b),
      };
    });
    //console.log(totalDogs);
    return totalDogs;
  } catch (e) {
    console.log(e);
  }
};
// Funcion donde guardamos  todos los perros tanto  de la api como del la base de datos
const totalDogs = async () => {
  try {
    const apiDogs = await getDogs();
    const dataDB = await getDogDb();

    const data = [...apiDogs, dataDB];
    //console.log(data);
    return data;
  } catch (e) {
    console.log;
  }
};
// funcion para testear la creacion de un perro
const createData = async () => {
  try {
    const newDog = await Dog.create({
      name: "junior",
      img: "http://",
      height: "25",
      weight: "25",
      age: "algo",
    });
    newDog.setTemperaments([2, 3, 4]).then(() => {
      console.log("success registro");
    });
  } catch (err) {
    console.log(err);
  }
}; //

/*createData()
  .then(() => {
    console.log("success registro");
  })
  .catch((err) => {
    console.log(err);
  });
*/
//totalDogs().then(() => {
//  console.log("todooo va bien");
//});

/*getDogDb().then(() => {
  console.log("promesa realizada");
});*/

module.exports = {
  getDogs: totalDogs,
};
