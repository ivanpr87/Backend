const fs = require('fs');
const path = require('path')
const filePath = path.resolve(__dirname, "../products.json");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

class Contenedor {
	constructor(archivo) {
		this.archivo = archivo;
	}

	async validateExistFile() {
		try {
			await fs.promises.stat(`${this.archivo}`)
		} catch (err) {
			await fs.promises.writeFile(`${this.archivo}`, JSON.stringify([]));
		}
	}

	async readFileFn() {
		await this.validateExistFile();
		const contenido = await fs.promises.readFile(`${this.archivo}`, 'utf-8');
		return JSON.parse(contenido);
	}

	async writeProducts(productos) {
		await this.validateExistFile();
		const data = JSON.stringify(productos, null, 4)
		await fs.promises.writeFile(this.archivo, data)
	}

	async exists(id) {
		const data = await this.getAll()
		const indice = data.findIndex(product => product.id == id)
		// if(indice < 0){
		// 	return false;
		// } else {
		// 	return true;
		// }
		return indice >= 0;
	}

	//save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
	async save(element) {
		//el typeof al precio se lo quito porque en el form ya está el type=number, no me deja ingresar letras,
		//y de entrada me tira error porque ingresa como string el numero del form, pero luego se parsea y se guarda como number, por eso lo quito
		if (!element.title || typeof element.title !== 'string' || !element.price) throw new Error('Datos invalidos');

		const data = await this.readFileFn();
		let id = 1;

		if (data.length) {
			//Si tengo elementos en mi array
			id = data[data.length - 1].id + 1;
		}


		const nuevoProducto = {
			title: element.title,
			price: parseInt(element.price),
			thumbnail: element.thumbnail,
			timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
			codigo: uuidv4(),
			stock: parseInt(element.stock),
			id: id,
		};

		data.push(nuevoProducto);

		await this.writeProducts(data)
		console.log(`Nuevo producto guardado, N° ID: ${nuevoProducto.id}`);

		return nuevoProducto.id;
	}

	//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
	async getAll() {
		try {
			const data = this.readFileFn();
			return data

		} catch {
			console.log('Error al obtener todos los datos');
		}
	}


	//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		const data = await this.readFileFn()
		const idProducto = data.find((producto) => producto.id === id);

		if (!idProducto) throw new Error("No existe ese producto");

		return idProducto;

	}



	async updateById(id, updateProduct) {
		const exist = await this.exists(id);
		if (!exist) throw new Error(`No existe item con ID ${id}`)

		const productos = await this.getAll()
		const productoId = productos.findIndex(producto => producto.id == id)

		const productoViejo = productos[productoId]

		const productoModificado = {
			title: updateProduct.title,
			price: parseInt(updateProduct.price),
			thumbnail: updateProduct.thumbnail,
			timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
			codigo: uuidv4(),
			stock: parseInt(updateProduct.stock),
			id: productoViejo.id,
		}

		productos.splice(productoId, 1, productoModificado)

		await this.writeProducts(productos)
		return productoModificado

	}

	// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
	async deleteById(id) {
		const data = await this.readFileFn()

		const productoId = data.findIndex((producto) => producto.id === id);

		if (productoId < 0) {
			throw new Error('El producto no existe');
		}

		data.splice(productoId, 1);

		await this.writeProducts(data)

	}

	async deleteAll() {
		await this.writeProducts([])
	}
}

const instanciaProductsApi = new Contenedor(filePath)

module.exports = {
	ProductsController: instanciaProductsApi
} 
