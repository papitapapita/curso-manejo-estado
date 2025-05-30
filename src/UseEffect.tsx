import { useEffect, useState } from "react"

type UseStateProps = {
    name: string
}

export function UseState({name}: UseStateProps) {
    const [error] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('Empezando el efecto');
        if (loading) {
            setTimeout(() => {
                setLoading(!loading);
            }, 3000);
        }
        console.log('Terminando el efecto');
    }, [loading])

    return (
        <div>
            <h1>Eliminar {name}</h1>
            <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
            {loading && (<p>Cargando...</p>)}
       
            {error && (
                <p>Error: el código es incorrecto</p>
            )}
            <input type="text" placeholder="Código de seguridad" />
            <button onClick={() => setLoading(!loading)}>Comprobar</button>
        </div>
    )
}