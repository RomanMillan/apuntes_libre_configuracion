

# Cómo especificar valores predeterminados para los props



En React, puedes especificar valores predeterminados para las props de un componente utilizando la propiedad `defaultProps`. De esta manera, si una prop no se proporciona al componente desde su componente padre, se utilizará el valor predeterminado que hayas especificado. 

```jsx
import React from 'react';

// Definir el componente con defaultProps
const MyComponent = (props) => {
  return (
    <div>
      <p>{props.text}</p>
    </div>
  );
};

// Especificar los valores predeterminados con defaultProps
MyComponent.defaultProps = {
  text: 'Texto predeterminado',
};

export default MyComponent;
```

En este ejemplo, el componente `MyComponent` tiene una prop llamada `text`. Si el componente padre no proporciona un valor para la prop `text`, se utilizará el valor predeterminado especificado en `MyComponent.defaultProps`.

Luego, al utilizar `MyComponent` en otro componente:

```jsx
import React from 'react';
import MyComponent from './MyComponent';

const ParentComponent = () => {
  return (
    <div>
      <h1>Componente Padre</h1>
      {/* No se proporciona un valor para la prop 'text' */}
      <MyComponent />
    </div>
  );
};

export default ParentComponent;
```

En este caso, como no se proporciona un valor para la prop `text` en `ParentComponent`, se utilizará el valor predeterminado especificado en `MyComponent.defaultProps`, y se mostrará "Texto predeterminado" en el componente `MyComponent`.
