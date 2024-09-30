
# Backend 2 pre entrega 1 - Moro Alan

Esta pre entrega se centra en lo visto en clase en el curso de programación backend 2 comisión 70070

## Clonar el Repositorio



```bash
  git clone https://github.com/alanmorog/backend270070.git

```
    
## instalación de dependencias



```bash
  npm install

```
    

    
## iniciar el proyecto



```bash
  npm start

```
    
## Dependencias

![Dependencias](./assets/screenshots/dependencias.png)

## Filemap

![three](./assets/screenshots/three.png)
## Roadmap

- Se presentó de acuerdo a lo solicitado en la consigna, crear un modelo User el cual se obtendrá por conexión con Mongo los campos firts_name, last_name, email, age, password, cart y role.
    #### Dejando como definición el campo cart como cartId y el campo role como User.

- Utilizar el paquete Bycrypt para encriptar la contraseña, utilizando el método hashSync 
- Se utilizo estrategias de passport de manera local para el modelo de usuarios
- Paralelamente se desarrollo un sistema de login que trabaja con JWT
- Se implemento un endpoint current donde se obtiene a travez de un token la informacion del usuario

## Endpoints utilizados

- /login
- /api/session/current
- /register
- /profile
- /failregister
- /logout

### login desde navegador

![loginPage](./assets/screenshots/loginPage.png)

### usuarios desde mongo

![mongoUser](./assets/screenshots/mongoUser.png)

### perfil desde navegador

![profilePage](./assets/screenshots/profilePage.png)

### plogin desde postman con token

![postmanLogin](./assets/screenshots/postmanLogin.png)

### current desde postman con token

![postmanLogin](./assets/screenshots/postmanCurrent.png)