# Renderizando contenido

Cuando queremos renderizar un contenido que tenemos en nuestra "sección" de js en nuestro componene, tenemos que usar las llaves `{}` y muy importante esto solo puede renderizar una información.

No podemos renderizar mas de una variable o constante en las mismas llaves, para ello tendríamos que abrir otras llaves fuera y renderizar ese otro contenido.

EJ.

```jsx
 function App() {

  const users = [
    {
      username: 'Juan Saenz',
      isFollowed: false
    },
    {
      username: 'Maria Lopez',
      isFollowed: true
    }
  ]

  return (
    <>
      {
        users.map(user => {
          const {username, isFollowed} = user;
          return(
            <Card name={username} initialFollow={isFollowed}/>
          )
        })
      }
    </>
  )
}
```

En este ejemplo el componente App tiene un array de usuarios (BD de prueba). Y este lo tenemos que iterar para poder agregarle los datos (username, isFollowed) a cada uno del componente `Card`.

Para poder renderizar este array (users), tenemos que añadir las llaves `{}` y despues la función map, que será la encargada de iterar sobre el array sacando cada usuario.

Después como podemos observar tenemos que asignar otro `return()` donde dentro se creará cada componente `Card `único con su `username `y su `isFollowed`.

A pesar de ser un` map (forEach)` donde recorre todo un array de usuarios, solo necesitamos poner unas llaves, ya que actua como un solo dato.

Si quisieramos renderizar otros datos en las mismas llaves, entonces nos daría un error.

Ej: **<mark>ERROR</mark>**

```jsx
 function App() {

  const users = [
    {
      username: 'Juan Saenz',
      isFollowed: false
    },
    {
      username: 'Maria Lopez',
      isFollowed: true
    }
  ]
   const name = 'Paquito';
  return (
    <>
      {
        users.map(user => {
          const {username, isFollowed} = user;
          return(
            <Card name={username} initialFollow={isFollowed}/>
          )
        })
        name
      }
    </>
  )
}
```

En este caso name estaría dando error ya que estamos intentando renderizar la función `map` y la constante name en las mismas llaves.

EJ **<mark>CORRECCIÓN</mark>**

```jsx
 function App() {

  const users = [
    {
      username: 'Juan Saenz',
      isFollowed: false
    },
    {
      username: 'Maria Lopez',
      isFollowed: true
    }
  ]
   const name = 'Paquito';
  return (
    <>
      {
        users.map(user => {
          const {username, isFollowed} = user;
          return(
            <Card name={username} initialFollow={isFollowed}/>
          )
        })
      }
      {name}
    </>
  )
}
```

De esta manera si podemos renderizar en el componente tanto la función map como la constante name, sin que de error.
