import axios from "axios";
import { serverUrl } from "../../../helpers/globalVariables";
import generateDoc from "./generateDoc";

const getSavedActa = async (actaId, navigate) => {
  try {
    const res = await axios.get(serverUrl + `/getActas/${actaId}`);
    if (res) {
      localStorage.setItem("finalActa", JSON.stringify(res.data));
      if (res.data.nro_mpf) {
        localStorage.setItem("actaFlag", "MPF/DEN");
      } else {
        localStorage.setItem("actaFlag", "COOP");
      }
      generateDoc();
      if (navigate) {
        navigate("/");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export default getSavedActa;
