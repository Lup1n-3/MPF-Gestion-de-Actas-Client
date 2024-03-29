import { toast } from "react-toastify";
import {
  GET_ACTAS,
  GET_ACTAS_FILTERED,
  CREATE_ACTA,
  CREATE_INTEGRANTES,
  CREATE_BOLSAS,
  CREATE_EFECTOS,
  GET_BUGS_REPORTS,
  CLEAR_STATES,
  ADMIN,
  CREATE_PERITOS,
  UPDATE_BOLSAS,
  UPDATE_EFECTOS,
  GET_USERS,
  SET_CURRENT_USER,
} from "./variables";

let initialState = {
  admin: JSON.parse(localStorage.getItem("admin")) || false,
  allActas: [],
  allActasSave: [],
  currentActa: JSON.parse(localStorage.getItem("currentActa")) || [],
  currentIntegrantes: JSON.parse(localStorage.getItem("currentIntegrantes")) || [],
  currentPeritos: JSON.parse(localStorage.getItem("currentPeritos")) || [],
  currentBolsas: JSON.parse(localStorage.getItem("currentBolsas")) || [],
  currentEfectos: JSON.parse(localStorage.getItem("currentEfectos")) || [],
  bugsReports: [],
  users: JSON.parse(localStorage.getItem("users")) || [],
  currentUser: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));

      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case GET_USERS: {
      localStorage.setItem("users", JSON.stringify(action.payload));

      return {
        ...state,
        users: action.payload,
      };
    }
    case UPDATE_EFECTOS: {
      localStorage.setItem("currentEfectos", []);
      localStorage.setItem("currentEfectos", JSON.stringify(action.payload));

      return {
        ...state,
        currenEfectos: action.payload,
      };
    }
    case UPDATE_BOLSAS: {
      localStorage.setItem("currentBolsas", []);
      localStorage.setItem("currentBolsas", JSON.stringify(action.payload));

      return {
        ...state,
        currenBolsas: action.payload,
      };
    }
    case ADMIN: {
      localStorage.setItem("admin", !state.admin);
      return {
        ...state,
        admin: !state.admin,
      };
    }
    case CLEAR_STATES: {
      return {
        allActas: [],
        allActasSave: [],
        currentActa: [],
        currentIntegrantes: [],
        currentBolsas: [],
        currentEfectos: [],
        bugsReports: [],
      };
    }
    case GET_BUGS_REPORTS: {
      return {
        ...state,
        bugsReports: action.payload,
      };
    }
    case CREATE_EFECTOS: {
      const localEfectos = JSON.parse(localStorage.getItem("currentEfectos"));
      if (localEfectos) {
        localStorage.setItem("currentEfectos", JSON.stringify([...localEfectos, action.payload]));
      } else {
        localStorage.setItem("currentEfectos", JSON.stringify([action.payload]));
      }
      return {
        ...state,
        currentEfectos: [...state.currentEfectos, action.payload],
      };
    }

    case CREATE_BOLSAS: {
      const localBolsas = JSON.parse(localStorage.getItem("currentBolsas"));
      if (localBolsas) {
        localStorage.setItem("currentBolsas", JSON.stringify([...localBolsas, action.payload]));
      } else {
        localStorage.setItem("currentBolsas", JSON.stringify([action.payload]));
      }
      return {
        ...state,
        currentBolsas: [...state.currentBolsas, action.payload],
      };
    }

    case CREATE_PERITOS: {
      localStorage.setItem("currentPeritos", JSON.stringify(action.payload));

      return {
        ...state,
        currentPeritos: action.payload,
      };
    }

    case CREATE_INTEGRANTES: {
      localStorage.setItem("currentIntegrantes", JSON.stringify(action.payload));

      return {
        ...state,
        currentIntegrantes: action.payload,
      };
    }

    case CREATE_ACTA: {
      localStorage.setItem("currentActa", JSON.stringify(action.payload));
      return {
        ...state,
        currentActa: action.payload,
      };
    }

    case GET_ACTAS: {
      return {
        ...state,
        allActas: action.payload,
        allActasSave: action.payload,
      };
    }

    case GET_ACTAS_FILTERED: {
      const { mpf, cij, dil, estado } = action.payload;

      let actasFiltered;
      if (!mpf && !cij && !dil && !estado) {
        //* Ninguno
        actasFiltered = state.allActasSave;
      } else if (mpf && cij && dil && estado) {
        //* Todos
        actasFiltered = state.allActasSave.filter((acta) => {
          return (
            acta.estado === estado && String(acta.nro_mpf).match(mpf) && String(acta.nro_cij).match(cij) && String(acta.nro_dil).match(dil)
          );
        });
      } else if (mpf && cij && dil && !estado) {
        //* Sin estado
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_mpf).match(mpf) && String(acta.nro_cij).match(cij) && String(acta.nro_dil).match(dil);
        });
      } else if (mpf && cij && !dil && !estado) {
        //* Sin estado ni dil
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_mpf).match(mpf) && String(acta.nro_cij).match(cij);
        });
      } else if (mpf && !cij && !dil && !estado) {
        //* Solo mpf
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_mpf).match(mpf);
        });
      } else if (!mpf && cij && !dil && !estado) {
        //* Solo cij
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_cij).match(cij);
        });
      } else if (!mpf && !cij && dil && !estado) {
        //* Solo dil
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_dil).match(dil);
        });
      } else if (!mpf && !cij && !dil && estado) {
        //* Solo estado
        actasFiltered = state.allActasSave.filter((acta) => {
          return acta.estado === estado;
        });
      } else if (!mpf && !cij && dil && estado) {
        //* Solo estado y dil
        actasFiltered = state.allActasSave.filter((acta) => {
          return acta.estado === estado && String(acta.nro_dil).match(dil);
        });
      } else if (!mpf && cij && !dil && estado) {
        //* Solo estado y cij
        actasFiltered = state.allActasSave.filter((acta) => {
          return acta.estado === estado && String(acta.nro_cij).match(cij);
        });
      } else if (mpf && !cij && !dil && estado) {
        //* Solo estado y mpf
        actasFiltered = state.allActasSave.filter((acta) => {
          return acta.estado === estado && String(acta.nro_mpf).match(mpf);
        });
      } else if (!mpf && cij && dil && !estado) {
        //* Solo dil y cij
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_cij).match(cij) && String(acta.nro_dil).match(dil);
        });
      } else if (mpf && !cij && dil && !estado) {
        //* Solo mpf y dil
        actasFiltered = state.allActasSave.filter((acta) => {
          return String(acta.nro_mpf).match(mpf) && String(acta.nro_dil).match(dil);
        });
      }

      if (mpf || cij || dil || estado) {
        if (actasFiltered?.length === 0) {
          actasFiltered = state.allActasSave;
          toast.warning("¡No hay actas con esos datos! Mostrando todas");
        }
      }

      return {
        ...state,
        allActas: actasFiltered,
      };
    }

    default:
      return state;
  }
}

export default reducer;
