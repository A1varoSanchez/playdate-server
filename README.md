## Family routes

Base URL `/api/family`

| HTTP Method | URI path                 | Description        |
|-------------|--------------------------|--------------------|
| GET         | `/getAllfamilies`        | All families       |
| GET         | `/myFriends/:userId`     | List of friends    |
| POST        | `/addFriend/:friendId`   | Add friend         |
| DELETE      | `/deletFriend/:friendId` | Delete friend      |


## Event routes

Base URL `/api/event`

| HTTP Method | URI path                  | Description        |
|-------------|---------------------------|--------------------|
| POST        | `/eventCreate`            | Create event       |
| POST        | `/eventJoin`              | Join event         |
| GET         | `/allEvent`               | All events         |
| GET         | `/eventDetails/:eventId`  | Event details      |
| GET         | `/map`                    | Maps               |
| GET         | `/map-place`              | Maps               |


## Auth routes

Base URL `/api/auth`

| HTTP Method | URI path         | Description       |
|-------------|------------------|-------------------|
| POST        | `/signup`        | Signup user       |
| POST        | `/login`         | Login user        |
| PUT         | `/editUser/:id`  | Edit user         |
| GET         | `/verify`        | Verify Auth token |



## Client routes

| URL                            | Description      | Protected |
|--------------------------------|------------------|-----------|
| `/`                            | Index Page       |           |
| `/eventos`                     | Lista de eventos |           |
| `/eventos/mapa`                | Mapa de eventos  |           |
| `/eventos/crear`               | crear eventos    |   User    |
| `/eventos/editar/:id`          | Editar evento    |   User    |
| `/eventos/detalles/:id`        | Detalles evento  |   User    |
| `/perfil/:id`                  | Detalles usuario |   User    |
| `/inicio-sesion`               | Iniciar sesion   |           |
| `/registro`                    | Registro         |           |
| `/listado/usuarios`            | lista usuarios   |   Admin   |