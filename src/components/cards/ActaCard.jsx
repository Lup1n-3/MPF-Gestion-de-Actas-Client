import React from "react";
import { useNavigate } from "react-router-dom";
import { removeActa } from "redux/actions";
import { Icons as I } from "assets";
import { getSavedActa, editSavedActa } from "utils/index";
import { useDispatch } from "react-redux";

export function ActaCard({ acta, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalEfectos, setTotalEfectos] = React.useState(0);

  React.useEffect(() => {
    let sum = 0;
    acta.Bolsas.map((bolsa) => {
      sum += bolsa.Efectos.length;
    });
    setTotalEfectos(sum);
  }, []);

  const handleRemoveActa = (nroMpf) => {
    const res = confirm(`¿Estas seguro que quieres eliminar el acta ${nroMpf}?`);
    if (res) {
      dispatch(removeActa(acta.id));
    }
  };

  return (
    <div
      className={`mt-2 flex  min-h-[65px] w-[95%] items-center rounded-md border-2 border-principal bg-white shadow-md ${
        acta.estado === "en proceso"
          ? "border-r-[15px] border-r-process"
          : acta.estado === "completa"
          ? "border-r-[15px] border-r-principal"
          : acta.estado === "deprecada"
          ? "border-r-[15px] border-r-error"
          : acta.estado === "en creacion"
          ? "border-r-[15px] border-r-secondary"
          : "border-r-[15px] border-r-principal"
      }`}
    >
      <div className="flex max-w-[90%] flex-1">
        <span className="cardInfoContainer">
          <span className="cardTitle">Fecha</span>
          <br />
          {acta.mes} {acta.dias}
        </span>
        {!acta.nro_coop && (
          <span className="cardInfoContainer">
            <span className="cardTitle">MPF</span>
            <br />
            {acta.nro_mpf}
          </span>
        )}
        {!acta.nro_mpf && (
          <span className="cardInfoContainer">
            <span className="cardTitle">COOP</span>
            <br />
            {acta.nro_coop}
          </span>
        )}
        <span className="cardInfoContainer">
          <span className="cardTitle">CIJ</span>
          <br />
          {acta.nro_cij}
        </span>
        <span className="cardInfoContainer">
          <span className="cardTitle">DIL</span>
          <br />
          {acta.nro_dil}
        </span>
        <span className="cardInfoContainer">
          <span className="cardTitle">Suscriptores</span>
          <br />
          {acta.Integrantes.length}
        </span>
        <span className="cardInfoContainer">
          <span className="cardTitle">Bolsas</span>
          <br />
          {acta.Bolsas.length}
        </span>
        <span className="cardInfoContainer">
          <span className="cardTitle">Elementos</span>
          <br />
          {totalEfectos}
        </span>
      </div>
      <div className="flex h-full w-[10%] items-center justify-around">
        {type === "remove" ? (
          <>
            <I.fileRemove
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Eliminar"
              className="icons w-6 hover:text-error/40"
              onClick={() => handleRemoveActa(acta.nro_mpf)}
            />
          </>
        ) : (
          <>
            {acta.estado !== "en creacion" && (
              <I.fileDownload
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Imprimir Acta"
                className="icons w-6"
                onClick={() => getSavedActa(acta.id)}
              />
            )}
            {acta.estado === "en creacion" && (
              <>
                <I.documentEdit
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Editar"
                  className="icons w-6"
                  onClick={() => editSavedActa(acta.id, navigate, "/actas/crear/1")}
                />
                <I.warning data-tooltip-id="my-tooltip" data-tooltip-content="Acta incompleta" className="w-6 text-process" />
              </>
            )}
            {acta.estado === "completa" && (
              <I.eye
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Ver"
                className="icons w-6"
                onClick={() => editSavedActa(acta.id, navigate, "/actas/crear/1")}
              />
            )}
            {(acta.estado === "en proceso" || acta.estado === "para completar") && (
              <I.fileLock
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Ir a cerrar elementos en proceso"
                className="icons w-6"
                onClick={() => editSavedActa(acta.id, navigate, "/actas/crear/4")}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
