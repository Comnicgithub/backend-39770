# Backend-39770
» Se creo un constructor de objetos llamado 'ProductManager'.

» Dentro del mismo se definió un array vacío ('this.products'), también se agrego el precio del iva a sumar al valor del producto.

» Se definió la variable 'product' como nombre para cada producto nuevo que se cree.

» Se creo dentro de'ProductManager' un método 'getProduct' para traer todos los productos que hay en stock con todas sus propiedades.

» Se creo dentro de'ProductManager' un metodo 'addProduct' el cual permite agregar nuevos productos al array 'this.products', este método permite agregar las siguientes propiedades de forma manual; title, description, price, thumbnail, stock; También de creo un condicional 'If' para configurar el id del producto cargado y que se autoincremente. Se configuro el calculo sobre el precio para sumarle el iva. Definimos la variable 'product' y le indicamos que vayan todos los valores que necesitamos 'id,title, description, price, thumbnail, stock'. Por ultimo usamos el método 'push' para subir el producto al array 'this.products'.

» Se creo dentro de'ProductManager' un método 'getProductById', el cual permite ubicar dentro del array 'this.products' el producto por su numero de 'id' mediante un 'find' que recorra todo el array y devuelva el 'id' requerido, en caso contrario se configuro un clg con un string que diga not found y devuelve un null.

» Se probaron los métodos 'addProduct' ingresando 6 productos nuevos, 'getProducts' trayendo todo el array de los productos pusheados y 'getProductById', este último poniendo un valor true y un valor null para confirmar su correcto funcionamiento.

