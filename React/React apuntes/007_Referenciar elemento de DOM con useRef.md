# Referenciar elemento de DOM con useRef

Para poder referenciar un elemento del DOM en React lo mejor es usar el hook: `useRef`

Ej:

```jsx

/*Importamos el hook de react*/
import {useRef} from 'react';

/*Función que añade un <li> al <ul> referenciado*/
const addLi = () =>{
  const li = document.createElement('li');
  li.innerHTML = refInput.current.value;
  refUl.current.appendChild(li);
}

/*Referenciamos el input para obtener el valor*/
<input type="text" ref={refInput} /
/*Añadimos un botón para que se active la función addLi()*/
<button onClick={addLi}>Añadir</button>
/*Referenciamos el ul donde se iran agregando los <li>*/
<ul ref={refUl}></ul>


```

En el ejemplo añadimos un elemento <li> al <ul> lo el texto añadido en el input, cuales están referenciados una vez que se de click en el boton añadir.



Usar el hook useRef es muy facíl solo tenemos que importarlo y poner en el elemento `ref={}` junto con un nombre que lo referencie de forma única. 

En este ejemplo para el <ul> hemos puesto el nombre refUl quedando de la siguente manera: `ref={refUl}` a traves del nombre lo llamaremos para su uso.

Ej: `refUl.current.appendChild(li);`


