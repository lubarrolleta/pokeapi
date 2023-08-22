# pokeapi
Proyecto de creacion de api rest con node, encriptado de datos enviados al cliente, proteccion de api

LA API CUENTA CON DIFERENTES RUTAS PARA EL ACCESO AL INFORMACION
Esta api cuenta con su propia generacion de tokens para la autenticacion de usuarios, incluso agrega una cookie de token, con la informacion del usuario y tiempo en se caduca el token.
GET '/users' => nos muestra los usuarios registrados en la db de mongodb , podemos encryptar la data (/constantes/ENCRYPT= true/false).
POST '/favorites' => podemos agregar nuevos pokemons a la lista de favoritos {id,name, url, poster}.
GET '/favorites/:id' => nos muestra los la lista de de pokemons favoritos de un usuario.
