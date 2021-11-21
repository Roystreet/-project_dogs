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
    console.log(totalDogs);
  } catch (e) {
    console.log(e);
  }
};

const totalDogs = async () => {
  try {
    const apiDogs = await getDogs();
    const dataDB = await Dog.findAll({ include: Temperament });
    //console.log(apiDogs);
    console.log(dataDB.length);
    console.log(dataDB);
    // return dataDB;
  } catch (e) {
    console.log;
  }
};

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

getDogDb().then(() => {
  console.log("promesa realizada");
});
