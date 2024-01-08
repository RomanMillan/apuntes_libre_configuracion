# Crear componente

Hay dos tipos de componentes en React

- Componentes de Funciones (Recomendado)

- Componentes de Clases

## Componente de funciones

```jsx
function HelloWorld() {
  return <h1>Hello World!</h1>
}
```

## Componente de clases

```jsx
import { Component } from 'react'

class HelloWorld extends Component {
  render() {
    return <h1>Hello World!</h1>
  }
}
```

**<mark>IMPORTANTE</mark>**: Tanto si es de funcion o clases, el nombre tiene que empezar en letra mayuscula.

---

## Componente Exterior

### navbar.jsx

```jsx
export function Navbar() {
    return(
        <>
           <div>
               <p>El Condor</p>
               <input type="text" name="search" id="search" />
               <button type="submit">Buscar</button>
            </div>
        </>
    )
}
```

### App.jsx

```jsx
import { Navbar } from './navbar'

function App() {
  return (
    <>
      <Navbar/>
    </>
  )
}
```
