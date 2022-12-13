//Servidor************
const express = require('express');
const { Router } = express;
const aplicacion = express();

const rutaProductos = Router();

const port = 8080;

//***** Hacemos la carpeta public visible
aplicacion.use('/static', express.static(__dirname + '/public'));
//****************
aplicacion.set('view engine', 'ejs');

aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }

  save(objeto) {
    let id = 1;
    this.productos.forEach((element, index) => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    objeto.id = id;
    this.productos.push(objeto);
    return id;
  }

  getById(id) {
    let objetoSeleccionado = null;
    this.productos.forEach(element => {
      if (element.id == id) {
        objetoSeleccionado = element;
      }
    });
    return objetoSeleccionado;
  }

  getAll() {
    return this.productos;
  }

  deleteById(id) {
    let indexSeleccionado = -1;
    this.productos.forEach((element, index) => {
      if (element.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      this.productos.splice(indexSeleccionado, 1);
    }
    
  }

  deleteAll() {
    this.productos = [];
  }

  update(producto) {
    let objetoSeleccionado = null;
    this.productos.forEach((element, indice) => {
        if (element.id == producto.id) {
          objetoSeleccionado = indice;
        }
        if (objetoSeleccionado){
          this.productos[objetoSeleccionado] = producto;
        }

    });
}
}
const productos = new Contenedor([]);


//Endpoints***

//Get by id
 
aplicacion.get('/', (peticion, respuesta) => {
  respuesta.render('formulario', {});
});

aplicacion.get('/productos', (peticion, respuesta) => {
  const listaProductos = productos.getAll();
  respuesta.render('lista', {
    productos: listaProductos
  });
});

aplicacion.post('/productos', (peticion, respuesta) => {
    const producto = peticion.body;
    if(producto) {
      let title = (producto.hasOwnProperty('title'))? true:null;
      let price = (producto.hasOwnProperty('price'))? true:null;
      let thumbnail = (producto.hasOwnProperty('thumbnail'))? true:null;
      console.log('El producto tiene titulo?:' + title);
      console.log('El producto tiene price?:' + price);
      console.log('El producto tiene thumbnail?:' + thumbnail);

      if(title == null  || price == null || thumbnail == null){
        console.log('error');
       
      }
      else{
        productos.save(producto);
    respuesta.render('formulario', {});

      }
    }
});
 


rutaProductos.put('/:id', (peticion, respuesta) => {
  const producto = peticion.body  
  const id = peticion.params.id;
  productos.update({id, ...producto});
  respuesta.json({
    status: "ok"
  });
});

rutaProductos.delete('/:id', (peticion, respuesta) => {
    
    const id = parseInt(peticion.params.id);
    const producto = productos.getById(id);
    if (producto) {
      productos.deleteById(id);
      respuesta.status(204).end();
    } else {
      !producto && respuesta.status(404).json(notFound);
    }

});
//aplicacion.use('/api/productos', rutaProductos);

//***********


//Servidor************
const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));
//****************