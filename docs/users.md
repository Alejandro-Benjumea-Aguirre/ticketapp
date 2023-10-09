<div style="padding-bottom: 50px; padding-left:90px;">
  <img style="  float: left;
  width: 160px;
  height: 80px;" src="logo.png">
  <h3 style="  position: relative;
  top: 30px;
  left: 10px;">Servicio API REST PANA-TICKETS V1.0 </h3>
</div>

Para interactuar con el API primero se debe iniciar sesion enviando usuario y contraseña y la api respondera un con un token, el cual tiene una vigencia de unas 4 horas, para iniciar sesion se debe de enviar username y password por medio de una peticion POST.

## `POST` Get Token 
```
{{SERVER_ADDRESS}}/api/auth
```

Para obtener el Token enviar en el body los siguientes parametros:
- `username`: username
- `password`: password

Donde **username** y **password** son las credenciales proporcionadas por Pana Business.

Ejemplo Request:
```
--request GET '{{SERVER_ADDRESS}}/api/auth' \
--data-raw '{
    "username": "abenjumea",
    "password": "123456"
}'
```

Ejemplo Respuesta:
```
{
    error: false,
    status: 200,
    body: {
        "name": "Alejandro Benjumea Aguirre",
        "username": "abenjumea",
        "email": "alejandro_benjumea@pana.com.co",
        "token": "121e65e96fa712f2b03b569fce6a6859b46cac27",
    }  
}
```

<div style="padding-top:180px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 1/6</span>
</div>
<div style="page-break-after: always"></div> 
                                 

## `GET` Listar usuarios
- Servicio: <span style="color:#0984e3">Listar todos los usuarios</span>
- Accion : <span style="color:#0984e3">users</span>
```
{{SERVER_ADDRESS}}/api/users
```

Enviar una peticion GET a la url /api/users con el respectivo token


Ejemplo Request:
```
--request GET '{{SERVER_ADDRESS}}/api/users' \
--header 'TOKEN: {{TOKEN}}' \
```

<div style="padding-top:50px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 2/6</span>
</div>
<div style="page-break-after: always"></div>

✔ Ejemplo Respuesta Exitosa:
```json
{
    
}
```
<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div> 

## Posibles Mensajes de Error

<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div> 

## `GET` Listar usuario
- Servicio: <span style="color:#0984e3">Listar un usuario</span>
- Accion : <span style="color:#0984e3">users</span>
```
{{SERVER_ADDRESS}}/api/users/id
```

Enviar una peticion GET a la url /api/users con el respectivo token y id especifico como parametro


Ejemplo Request:
```
--request GET '{{SERVER_ADDRESS}}/api/users/id' \
--header 'TOKEN: {{TOKEN}}' \
```

<div style="padding-top:50px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 2/6</span>
</div>
<div style="page-break-after: always"></div>

✔ Ejemplo Respuesta Exitosa:
```json
{
    
}
```
<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div> 

## Posibles Mensajes de Error

<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div>

## `POST` Crear usuarios
- Servicio: <span style="color:#0984e3">Crear usuario</span>
- Accion : <span style="color:#0984e3">users</span>
```
{{SERVER_ADDRESS}}/api/users
```

Enviar una peticion POST a la url /api/users con el respectivo token y el json con la respectiva informacion del usuario a crear.

Ejemplo Request:
```
--request POST '{{SERVER_ADDRESS}}/api/users' \
--header 'TOKEN: {{TOKEN}}' \
--data-raw '{
    "uid": 12,
    "username": "abenjumea",
    "name": "Alejandro Benjumea Aguirre",
    "password": "123456",
    "email": "alejandro_benjumea@pana.com.co",
    "rol_id": "1",
    "state_id": "1",
    "department_id", "1",
    "campus_id": "1",
    "created_date": "2023-10-09"
}'
```

<div style="padding-top:50px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 2/6</span>
</div>
<div style="page-break-after: always"></div>

✔ Ejemplo Respuesta Exitosa:
```json
{
    "error": false,
    "status": 200,
    "body": {
        "id": "uid",
        "name": "name",
        "username": "username",
        "email": "email",
    } 
}
```
<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div> 

## Posibles Mensajes de Error

<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div>

## `PATCH` Actualizar usuario
- Servicio: <span style="color:#0984e3">Actualizar usuario</span>
- Accion : <span style="color:#0984e3">users</span>
```
{{SERVER_ADDRESS}}/api/users/id
```

Enviar una peticion PATCH a la url /api/users con el respectivo token y el json con la respectiva informacion que se requiere actualizar y en el header el id del usuario que se requiere actualizar.

Ejemplo Request:
```
--request PATCH '{{SERVER_ADDRESS}}/api/users/id' \
--header 'TOKEN: {{TOKEN}}' \
--data-raw '{
    "name": "Alejandro Benjumea",
    "email": "alejandro_benjumea@pana.com",
}'
```

<div style="padding-top:50px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 2/6</span>
</div>
<div style="page-break-after: always"></div>

✔ Ejemplo Respuesta Exitosa:
```json
{
    "error": false,
    "status": 200,
    "body": {
        "name": "Alejandro Benjumea",
        "email": "alejandro_benjumea@pana.com"
    } 
}
```
<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div> 

## Posibles Mensajes de Error

<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div>

## `DELETE` Inactivar usuario
- Servicio: <span style="color:#0984e3">Inactivar usuario</span>
- Accion : <span style="color:#0984e3">users</span>
```
{{SERVER_ADDRESS}}/api/users/id
```

Enviar una peticion DELETE a la url /api/users con el respectivo token y en el header el id del usuario que se requiere actualizar.

Ejemplo Request:
```
--request DELETE '{{SERVER_ADDRESS}}/api/users/id' \
--header 'TOKEN: {{TOKEN}}' \
```

<div style="padding-top:50px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 2/6</span>
</div>
<div style="page-break-after: always"></div>

✔ Ejemplo Respuesta Exitosa:
```json
{
    "error": false,
    "status": 200,
    "body": {
        "name": "Alejandro Benjumea",
        "username": "abenjumea",
        "email": "alejandro_benjumea@pana.com.co"
    } 
}
```
<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div> 

## Posibles Mensajes de Error

<div style="padding-top:590px"><div>

--- 
<div>
  <span style="  float: left">
    Desarrollado por Pana Business <a href="https://www.pana.com.co">https://www.pana.com.co</a>
  </span>
  <span style="  float: right">Página 3/6</span>
</div>
<div style="page-break-after: always"></div>

