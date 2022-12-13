const Contenedor = require("./desafio.js");
const productos = new Contenedor("productos.txt");

const producto1 = {
    title: "Joystick PS5",
    price: 28000,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_621951-MLA46237882917_062021-O.webp",
};

const producto2 = {
    title: "Teclado Gamer",
    price: 20000,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_963204-MLA40694328429_022020-O.webp",
};

const producto3 = {
    title: "Monitor Gamer 27 Pulgadas Ozone 144hz",
    price: 1360000,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_885157-MLA51145522594_082022-O.webp",
};

const ejecutar = async () => {
    /* seleccionar producto por ejemplo producto2 */
        await productos.save(producto3);
        //await productos.getAll(); 
    /*  poner la id a buscar para que le de el producto */
        //await productos.getById(1); 
    /* poner la id a eliminar */
        //await productos.deleteById(3); 
        // await productos.deleteAll(); 
};

ejecutar();