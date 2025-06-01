import { useEffect, useState } from "react";

type UseStateProps = {
  name: string;
};

const SECURITY_CODE = "paradigma";

export function UseState({ name }: UseStateProps) {
  const initialState = {
    error: false,
    loading: false,
    value: "",
    authorized: false,
    deleted: false,
  };
  const [state, setState] = useState(initialState);

  const { error, loading, value, authorized, deleted } = state;

  useEffect(() => {
    console.log("Empezando el efecto");
    if (loading) {
      setState((prev) => ({ ...prev, error: false }));
      setTimeout(() => {
        if (value !== SECURITY_CODE) {
          setState((prev) => ({ ...prev, error: true }));
        } else {
          setState((prev) => ({ ...prev, authorized: true }));
        }
        setState((prev) => ({ ...prev, loading: !prev.loading }));
      }, 3000);
    }
    console.log("Terminando el efecto");
  }, [loading]);

  if (!authorized && !deleted) {
    return (
      <div>
        <h1>Eliminar {name}</h1>
        <p>
          Por favor, escribe el código de seguridad para comprobar que quieres
          eliminar.
        </p>
        {loading && <p>Cargando...</p>}

        {error && !loading && <p>Error: el código es incorrecto</p>}
        <input
          type="text"
          placeholder="Código de seguridad"
          value={value}
          onChange={(event) => {
            setState((prev) => ({ ...prev, value: event.target.value }));
            console.log(event.target.value);
          }}
        />
        <button
          onClick={() => {
            setState((prev) => ({ ...prev, loading: !prev.loading }));
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (authorized && !deleted) {
    return (
      <>
        <h1>Eliminar UseState</h1>
        <p>¿Seguro que quieres eliminar UseState?</p>
        <button
          onClick={() => {
            setState((prev) => ({ ...prev, deleted: true }));
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            setState((prev) => ({ ...prev, authorized: false, value: "" }));
          }}
        >
          No, volver
        </button>
      </>
    );
  } else if (authorized && deleted) {
    return (
      <>
        <h1>UseState fue eliminado</h1>
        <button onClick={() => {setState(initialState)}}>Recuperar UseState</button>
      </>
    )
  }
}
