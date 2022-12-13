const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    // escribir un archivo 
    async writeFile(archivo, contenido) {
        try {
            await fs.writeFileSync(archivo, JSON.stringify(contenido, null, 2));
        } catch (error) {
            console.log(`Ocurrio un error:`, error.message);
        }
    }

    /* Leer el archivo */
    async readFile(archivo) {
        try {
            const data = await fs.readFileSync(archivo);
            return JSON.parse(data);
        } catch (error) {
            console.log(`Ocurrio un error:`, error.message);
        }
    }

    /* Buscar si existe el archivo */
    exists(archivo) {
        try {
            if (!fs.existsSync(archivo)) {
                throw new Error("No se encontro el archivo.");
            } else {
                return true;
            }
        } catch (error) {
            console.log(`Ocurrio un error:`, error.message);
        }
    }

    /* guardar nuevo producto en archivo */

    async save(producto) {
        try {
            /* verifico si existe archivo y sino creo uno nuevo */
            if (!this.exists(this.archivo)) {
                console.log(
                    `No se encontro el archivo ${this.archivo}\n se procede a crear uno nuevo`
                );
                let arrayProductos = [];

                producto["id"] = 1;
                arrayProductos.push(producto);
                console.log("se esta agregando el producto");
                await this.writeFile(this.archivo, arrayProductos);
                console.log(`Se agrego un nuevo producto con la id ${producto["id"]}`);
                return producto["id"];
            } else {
                /*Si el archivo existe  primero se verifica si esta vacio*/
                if (this.readFile(this.archivo)) {
                    const data = await this.readFile(this.archivo);
                    if (data.length === 0) {
                        /*si esta vacio  se le asigna la id 1 al primer producto*/
                        producto["id"] = 1;
                    } else {
                        /*Si tiene producto se le asigna la id siguente */
                        let ultimoId = data[data.length - 1].id;
                        producto["id"] = ultimoId + 1;
                    }
                    data.push(producto);
                    console.log("se esta agregando el producto");
                    /*se escribe el producto */
                    this.writeFile(this.archivo, data);
                    console.log(
                        `Se agrego un nuevo producto con la id ${producto["id"]}`
                    );
                    return producto["id"];
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    /* getById */

    async getById(id) {
        try {
            if (this.exists(this.archivo)) {
                const data = await this.readFile(this.archivo);
                /* uso filter para buscar el producto con el id que queramos */
                const dataId = data.filter((item) => item.id === id);
                if (dataId.length === 0) {
                    throw new Error("No se encontro el ID");
                } else {
                    console.log(`El producto cona id ${id} :\n,`, dataId);
                    return dataId;
                }
            }
        } catch (error) {
            console.log(`Ocurrio un error:`, error.message);
        }
    }

    /* getAll */
    async getAll() {
        try {
            /* verifico si existe el archivo */
            if (this.exists(this.archivo)) {
                console.log("Leyendo archivo...");
                const data = await this.readFile(this.archivo);
                /* verifico una vez que existe, si esta vacio o no */
                if (data.length !== 0) {
                    console.log(`Contenido del archivo ${this.archivo} :\n`, data);
                } else {
                    throw new Error(`El archivo ${this.archivo} esta vacio.`);
                }
            }
        } catch (error) {
            console.log(`Ocurrio un error:`, error.message);
        }
    }

    /* deleteById */

    async deleteById(id) {
        try {
            if (this.exists(this.archivo)) {
                console.log(`Buscando producto con el id ${id}`);
                const data = await this.readFile(this.archivo);
                /* verifico que exista id */
                if (data.some((item) => item.id === id)) {
                    const data = await this.readFile(this.archivo);
                    /* elimino producto */
                    const datos = data.filter((item) => item.id !== id);
                    this.writeFile(this.archivo, datos);
                    console.log(`Se borro el producto con el id ${id}`);
                } else {
                    throw new Error(`No se encontro el produco con id ${id}`);
                }
            }
        } catch (error) {
            console.log(`Ocurrio un error:`, error.message);
        }
    }

    /* deleteAll. */

    async deleteAll() {
        try {
            if (this.exists(this.archivo)) {
                console.log("Borrando datos...");
                let nuevoArrayProductos = [];
                await this.readFile(this.archivo, nuevoArrayProductos);
                console.log(`Se borraron todos los datos del archivo ${this.archivo}`);
            }
        } catch (error) {
            console.log(`Ocurrio un error:`, error.message);
        }
    }
}

module.exports = Contenedor;