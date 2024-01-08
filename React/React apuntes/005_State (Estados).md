# State (Estados)

Sirven para poder memorizar datos en componentes y poder cambiarlos cuando sean necesarios.

Con los hooks añades funcionalidad a los componentes en react.

En el siguiente ejemplo podemos ver la funcionalidad de un hook para poder cambiar el estado de seguir o siguiendo.

- Lo primero que tenemos que hacer es importar el `useState`de react.

- Después declarar un array con dos valores:
  
  - Variable, en este caso `isFollowed`, que será el encargado de almacenar el valor de hook
  
  - Una función que será la encargada de modificar el valor de `isFollowed`. `setIsFollowed`.

- Una vez declarado el array tenemos que añadir el valor `= useState(false)`, en este caso nos interesa que el valor inicial de useState sea false, pero podemos poner integer, string, boolean, lo que nos haga falta.

- En el ejemplo vamos a usar este hook, cuando pulsemo el botón que tenemos creado en nuestro componente. Para ello ponemos un` onClick{}` y le pasamos la función que queremos que ejecute cuando este es clickeado `handleClick`. Quedando de la siguente manera `onClick{handleClick}`

- Definimos la funcion `handleClick`, la cual se encargará de ejecutar la función anteriormente definida `setIsFollowed `y que lo único que hará es invertir el valor de `isFollowed`. quedando de la siguente manera: `setIsFollowed(!isFollowed)` 

De esta manera tan sencilla cada vez que se clicke en el botón el valor de isFollowed cambiará de false a true y de true a false. Y con ello también cambiará el valor de text (ya que tenemos un ternario), el cual se verá automaticamente reflejado en el texto del botón.

### Componente Card (funcionalidad)

```jsx
import {useState} from 'react';

function Card({title}) {
  /* 
    useState es un Hook y devuelve un array con dos valores
    1- devuelve el valor del estado (false)
    2- devuelve una funcion para modificar ese valor.
    La funcion empieza con set segido del nombre de la variable.
    El valor inicial es asignado a nuestra conveniencia.
  */
  const [isFollowed, setIsFollowed] = useState(false);

/*
    Función llamada desde el botón, que a su vez llama 
    a la función setIsFollowed() que invierte el valor de isFollowed.
*/
  const handleClick = () =>{
    setIsFollowed(!isFollowed);
  }

/*Ternario que valida si isFollowed es true o false, asignando un texto*/
  const text = isFollowed ? 'siguiendo' : 'Seguir'

  return (
    <div className="card">
      <h1>{title}</h1>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}
```

### Componente App (uso del componente Card)

```jsx
 function App() {
    /* Espacio para añadir funcionalidad al componente */
  return (
    <>
      {/* tarjetas */}
      <Card title="Juan"></Card>
      <Card title="Maria"></Card>
    </>
  )
}
```
