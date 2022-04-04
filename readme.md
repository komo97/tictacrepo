# Instalación

   1. Descargar el ultimo release.
   2. Subir el contenido de la carpeta **dist** al servidor.
   3. Desde **cpanel** acceder a **phpMyAdmin**.
   4. Configurar un usuario que tenga todos los privilegios de **data** y **esctructura** y ponerle una contraseña segura desde el area de *User accounts* que se encuentra en el *home* de **phpMyAdmin**.
   5. En el archivo **requests.php** cambiar las siguientes variables:
```php
   $servername = <apuntar al servidor>
   $username = <nombre del usuario que recien se creo>
   $password = <contraseña del usuario que recien se creo>
```
   6. En **phpMyAdmin** ir a *home*, a la seccion de *import* y hay que importar el archivo **tictac.sql**. Esto va a generar una base de datos llamada *tictac* y dos tablas llamadas *rankingstable* y *tickets*.
   7. Dar click a la tabla de *tickets*, ir a la seccion de *insert* y añadir tantos tickets como sea necesario.
       - Unicamente se debe llenar la casilla que dice "**tickets**" con el numero serial del ticket, el resto de casillas deben permanecer vacias.
   8. Una vez terminado de insertar los tickets ya se puede probar el sitio.
