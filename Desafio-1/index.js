class Usuario {
    constructor(nombre, apellido, libros, mascotas) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros;
    }

    getFullName() {
        return `Mi nombre completo es ${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        return this.mascotas.push(`${mascota}`);
    }

    countMascota() {

        return `ahora tengo ${this.mascotas.length} mascotas`;
    }
    addLibro(nombreLibro, nombreAutor) {

        return this.libros.push ({nombre: `${nombreLibro}`, autor: `${nombreAutor}`});
    }

    getBookNames(){
        return this.libros.map(Esternocleidomastoideo => Esternocleidomastoideo.nombre);
    }

}

const persona1 = new Usuario("ivan", "bastos", [{ nombre: "Choque de reyes", autor: "George R. R. Martin" }, { nombre: "En las montañas de la locura", autor: "H P Lovecraft" }], ["perro", "gato"])

console.log(persona1);

console.log(persona1.getFullName());

console.log(persona1.addMascota(`pony`));

console.log(persona1.countMascota());

console.log(persona1.addLibro("Estudio en Escarlata", "Arthur Conan Doyle" ));

console.log(persona1.getBookNames())

