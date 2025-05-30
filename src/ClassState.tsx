import React from "react";

interface ClassStateProps {
    name: string
}

export class ClassState extends React.Component<ClassStateProps> {
    state = {
        loading: true,
        error: false
    }

    render() {
        const { name } = this.props;
        const { error, loading} = this.state;
        return (
            <div>
                <h1>Eliminar {name}</h1>
                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
                {error && (<p>Error: el código es incorrecto</p>)}
                {loading && (<p>Cargando...</p>)}
                <input type="text" placeholder="Código de seguridad" />
                <button onClick={() => this.setState({ error: !error})}>Comprobar</button>
            </div>
        )
        
    }
}