class Product {
  constructor(id, title, value, thumbnail) {
    this.id = id || null;
    this.title = title || null;
    this.value = value || null;
    this.thumbnail = thumbnail || null;
  }

  saveProduct(body, prodcutArray) {
    try {
      let id = 1;
      if (prodcutArray.length) {
        id = prodcutArray[prodcutArray.length - 1].id + 1;
      }

      const newProdcut = {
        id: id,
        title: body.title,
        value: body.value,
        thumbnail: body.thumbnail,
      };

      prodcutArray.push(newProdcut);
    } catch (error) {
      throw new Error("Problems during product saving!", error);
    }
  }
}

const productObj = new Product();

const productArray = [
  new Product(
    1,
    "Escuadra",
    123.45,
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
  ),
  new Product(
    2,
    "Calculadora",
    234.56,
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
  ),
  new Product(
    3,
    "Globo Terráqueo",
    345.67,
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
  ),
];

module.exports = {
  productObj,
  productArray,
};
