# Pasar Props (propiedades) a un Componente

En React, puedes pasar propiedades (props) a un componente para transmitir información desde un componente padre a un componente hijo. Aquí hay un ejemplo básico de cómo hacerlo:

Supongamos que tienes un componente hijo llamado `ChildComponent` y un componente padre llamado `ParentComponent`. Quieres pasar una prop llamada `mensaje` desde `ParentComponent` a `ChildComponent`.

```jsx
// ChildComponent.js
import React from 'react';

const ChildComponent = (props) => {
  return (
    <div>
      <p>{props.mensaje}</p>
    </div>
  );
};

export default ChildComponent;
```

```jsx
// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const mensajeParaChild = 'Hola desde el padre';

  return (
    <div>
      <h1>Componente Padre</h1>
      <ChildComponent mensaje={mensajeParaChild} />
    </div>
  );
};

export default ParentComponent;
```

En este ejemplo:

1. En `ParentComponent`, se crea una variable `mensajeParaChild` que contiene el mensaje que quieres pasar al componente hijo.
2. Al renderizar `ChildComponent` en `ParentComponent`, se pasa la prop `mensaje` con el valor de `mensajeParaChild`.

Cuando `ChildComponent` recibe la prop `mensaje`, puede acceder a ella utilizando `props.mensaje` dentro de su función. En este caso, se muestra el mensaje dentro de un párrafo (`<p>{props.mensaje}</p>`).


