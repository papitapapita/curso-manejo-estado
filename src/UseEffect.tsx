import { useState } from "react"

type UseStateProps = {
    name: string
}

export function UseState({name}: UseStateProps) {
    const [error, setError] = useState(false);
    const [loading] = useState(true)

    return (
        <div>
            <h1>Eliminar {name}</h1>
            <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
            {loading && (<p>Cargando...</p>)}
       
            {error && (
                <p>Error: el código es incorrecto</p>
            )}
            <input type="text" placeholder="Código de seguridad" />
            <button onClick={() => setError(!error)}>Comprobar</button>
        </div>
    )
}