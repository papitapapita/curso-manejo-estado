import React from "react";

export class ClassState extends React.Component {
    render() {
        return (
            <div>
                <h1>Eliminar UseState</h1>
                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
                <input type="text" placeholder="Código de seguridad" />
                <button>Comprobar</button>
            </div>
        )
        
    }
}