# La prop `children` en React

La prop `children` es una prop especial que se pasa a los componentes. Es un objeto que contiene los elementos que envuelve un componente.

Por ejemplo, si tenemos un componente `Card` que muestra una tarjeta con un título y un contenido, podemos usar la prop `children` para mostrar el contenido:

### Componente Card (definición)

```jsx
function Card(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <div>{props.children}</div>
    </div>
  )
}
```

### Componente Card (uso)

Y luego podemos usarlo de la siguiente forma:

```jsx
<Card title="Título de la tarjeta">
  <p>Contenido de la tarjeta</p>
</Card>
```

En este caso, la prop `children` contiene el elemento `<p>Contenido de la tarjeta</p>`.

Pero puede tener tantos elementos necesite el componente.

No es necesario que todos los componentes tengan el mismo tipo de elementos.

EJemplo:

```jsx
<Card title="Título de la tarjeta">
  <p>Contenido de la tarjeta</p>
</Card>

<Card title="Título de la tarjeta 2">
  <p>Contenido de la tarjeta</p>
 <span>Otro contenido</span>
</Card>
```

En este ejemplo usamos dos veces el componente card, pero el contenido de children es diferente. Esto es totalmente válido. Ya que el componente renderizará un h2 con el título y un div con el contenido children que tenga cada componente independienete.

Conocer y saber usar la prop `children` es muy importante para crear componentes reutilizables en React.
