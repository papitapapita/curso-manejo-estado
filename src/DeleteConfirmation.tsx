import { useEffect, useReducer } from "react";
import { reducer, initialState } from "./useReducer";

type DeleteConfirmationProps = {
  name: string;
};

const SECURITY_CODE = "paradigma";

export function DeleteConfirmation({ name }: DeleteConfirmationProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { error, loading, value, authorized, deleted } = state;
  const handleCheck = () => dispatch({ type: "LOADING" });
  const handleDelete = () => dispatch({ type: "DELETED" });
  const handleBack = () => dispatch({ type: "BACK" });
  const handleReset = () => dispatch({ type: "RESET" });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (loading) {
      timeoutId = setTimeout(() => {
        if (value !== SECURITY_CODE) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "AUTHORIZED" });
        }
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
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
          disabled={loading}
          onChange={(event) =>
            dispatch({ type: "CHANGE_VALUE", payload: event.target.value })
          }
        />
        <button disabled={loading} onClick={handleCheck}>
          Comprobar
        </button>
      </div>
    );
  } else if (authorized && !deleted) {
    return (
      <>
        <h1>Eliminar DeleteConfirmation</h1>
        <p>¿Seguro que quieres eliminar DeleteConfirmation?</p>
        <button onClick={handleDelete}>Sí, eliminar</button>
        <button onClick={handleBack}>No, volver</button>
      </>
    );
  } else if (deleted) {
    return (
      <>
        <h1>DeleteConfirmation fue eliminado</h1>
        <button onClick={handleReset}>Recuperar DeleteConfirmation</button>
      </>
    );
  }
}
