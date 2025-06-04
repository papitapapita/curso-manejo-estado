import type { State } from "./types/State";

type Action =
  | { type: "ERROR" }
  | { type: "AUTHORIZED" }
  | { type: "RESET" }
  | { type: "LOADING" }
  | { type: "CHANGE_VALUE"; payload: string }
  | { type: "DELETED" }
  | { type: "BACK" };

export const initialState: State = {
  error: false,
  loading: false,
  value: "",
  authorized: false,
  deleted: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ERROR":
      return { ...state, loading: false, error: true };
    case "AUTHORIZED":
      return {
        ...state,
        error: false,
        loading: false,
        authorized: true,
      };
    case "LOADING":
      return {
        ...state,
        error: false,
        loading: true,
      };
    case "RESET":
      return initialState;
    case "CHANGE_VALUE":
      return {
        ...state,
        value: action.payload,
      };
    case "BACK":
      return initialState;
    case "DELETED":
      return {
        ...state,
        authorized: false,
        deleted: true,
      };
    default:
      return state;
  }
}
