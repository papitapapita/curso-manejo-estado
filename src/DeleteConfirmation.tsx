import React, { useEffect, useState } from "react";

type DeleteConfirmationProps = {
  name: string;
};

interface State {
  error: boolean;
  loading: boolean;
  value: string;
  authorized: boolean;
  deleted: boolean;
}

const SECURITY_CODE = "paradigma";

export function DeleteConfirmation({ name }: DeleteConfirmationProps) {
  const initialState: State = {
    error: false,
    loading: false,
    value: "",
    authorized: false,
    deleted: false,
  };

  const [state, setState] = useState(initialState);

  const { error, loading, value, authorized, deleted } = state;
 
  const changeState = (newState: Partial<State>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const toggleLoading = () => {
    setState((prev) => ({ ...prev, loading: !prev.loading }));
  };

  const onLoading = () => {
    changeState({ error: false });
    setTimeout(() => {
      if (value !== SECURITY_CODE) {
        changeState({ error: true });
      } else {
        changeState({ authorized: true });
      }
      toggleLoading();
    }, 3000);
  };

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeState({ value: event.target.value });
    console.log(event.target.value);
  };

  useEffect(() => {
    if (loading) {
      onLoading();
    }
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
          onChange={(event) => onValueChange(event)}
        />
        <button onClick={toggleLoading}>Comprobar</button>
      </div>
    );
  } else if (authorized && !deleted) {
    return (
      <>
        <h1>Eliminar DeleteConfirmation</h1>
        <p>¿Seguro que quieres eliminar DeleteConfirmation?</p>
        <button
          onClick={() => {
            changeState({ deleted: true });
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            changeState({ authorized: false, value: "" });
          }}
        >
          No, volver
        </button>
      </>
    );
  } else if (authorized && deleted) {
    return (
      <>
        <h1>DeleteConfirmation fue eliminado</h1>
        <button
          onClick={() => {
            changeState(initialState);
          }}
        >
          Recuperar DeleteConfirmation
        </button>
      </>
    );
  }
}
