# Cómo pasar JSX a un componente

En React, puedes pasar JSX como una prop a un componente de la misma manera que pasas otros tipos de datos. JSX es simplemente una sintaxis de JavaScript que React utiliza para crear elementos de interfaz de usuario. Aquí hay un ejemplo de cómo puedes hacerlo:

Supongamos que tienes un componente llamado `ChildComponent` que recibe JSX como prop:

```jsx
import React from 'react';

const ChildComponent = (props) => {
  return (
    <div>
      <p>Contenido del componente hijo:</p>
      {props.children}
    </div>
  );
};

export default ChildComponent;
```

En este ejemplo, `ChildComponent` tiene una prop llamada `children` que se utiliza para representar cualquier JSX que se le pase como hijo.

Ahora, en tu componente principal, puedes pasar JSX como prop al componente hijo:

```jsx
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  return (
    <div>
      <h1>Componente Padre</h1>
      {/* Pasa JSX como prop al componente hijo */}
      <ChildComponent>
        <p>Este es un párrafo dentro del componente hijo.</p>
        <strong>Este es un texto fuerte dentro del componente hijo.</strong>
      </ChildComponent>
    </div>
  );
};

export default ParentComponent;
```

En este caso, el contenido dentro de `<ChildComponent>` se pasa como JSX a través de la prop `children`. Dentro de `ChildComponent`, puedes renderizar este contenido usando `{props.children}`.

Recuerda que `children` es solo un nombre de prop comúnmente utilizado para este propósito, y puedes usar cualquier nombre que desees. Además, puedes pasar cualquier JSX como prop, no solo elementos simples, y el componente hijo puede decidir cómo renderizar ese JSX dentro de su estructura.
