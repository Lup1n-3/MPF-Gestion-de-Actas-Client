import React from "react";
import { useNavigate } from "react-router-dom";
import { removeActa } from "../../../redux/actions";
//* Styles
import styled from "styled-components";
import Variables from "../../../Styles/Variables";
import GlobalStyles from "../../../Styles/GlobalStyles";
import { FileDownload } from "@styled-icons/remix-line/FileDownload";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
import { FileRemove } from "@styled-icons/evaicons-solid/FileRemove";
//* Utils
import getSavedActa from "../template/getSavedActa";
import editSavedActa from "../template/editSavedActa";
import { useDispatch } from "react-redux";
//* Initialization
const { secondaryColor, redColor } = Variables;
const { actaCardContainer, cardInfo, cardTitle } = GlobalStyles;

function ActaCard({ acta, type }) {
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

  /*
    ! ({acta, type}) type = "create" muestra cartas de creacion, cuando haya consultas ver que mostrar en la card, va a llegar type = "consulta"
  */

  return (
    <ActaContainer estado={acta.estado}>
      <Info>
        <CardTitle>Fecha</CardTitle>
        <br />
        {acta.mes} {acta.dias}
      </Info>
      {!acta.nro_coop && (
        <Info>
          <CardTitle>MPF</CardTitle>
          <br />
          {acta.nro_mpf}
        </Info>
      )}
      {!acta.nro_mpf && (
        <Info>
          <CardTitle>COOP</CardTitle>
          <br />
          {acta.nro_coop}
        </Info>
      )}
      <Info>
        <CardTitle>CIJ</CardTitle>
        <br />
        {acta.nro_cij}
      </Info>
      <Info>
        <CardTitle>DIL</CardTitle>
        <br />
        {acta.nro_dil}
      </Info>
      <Info>
        <CardTitle>Suscriptores</CardTitle>
        <br />
        {acta.Integrantes.length}
      </Info>
      <Info>
        <CardTitle>Bolsas</CardTitle>
        <br />
        {acta.Bolsas.length}
      </Info>
      <Info>
        <CardTitle>Efectos</CardTitle>
        <br />
        {totalEfectos}
      </Info>
      {type === "remove" ? (
        <>
          <RemoveIcon onClick={() => dispatch(removeActa(acta.id))} />
        </>
      ) : (
        <>
          <DownloadIcon onClick={() => getSavedActa(acta.id)} />
          <EditIcon onClick={() => editSavedActa(acta.id, navigate)} />
        </>
      )}
    </ActaContainer>
  );
}

export default ActaCard;

const ActaContainer = styled.div`
  ${actaCardContainer}
`;

const Info = styled.span`
  ${cardInfo}
`;

const CardTitle = styled.strong`
  ${cardTitle}
`;

const DownloadIcon = styled(FileDownload)`
  width: 25px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const EditIcon = styled(DocumentEdit)`
  width: 25px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const RemoveIcon = styled(FileRemove)`
  width: 25px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: ${redColor};
    cursor: pointer;
  }
`;
