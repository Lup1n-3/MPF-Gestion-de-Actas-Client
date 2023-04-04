import React from "react";
//* Redux
import { createEfecto, EditEfecto } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { toast } from "react-toastify";
//* Modal
import Modal from "react-modal";
//* Components
import AddDiscoModal from "./AddDiscoModal";
import AddSimModal from "./AddSimModal";
import AddSdModal from "./AddSdModal";
//* Initializations
const { button, select, input, modal40x40 } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

const modal40x30 = {
  content: {
    ...modal40x40.content,
    width: "30%",
    height: "max-content",
  },
};

function AddEfectos({ alternModal }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentEfecto", null);
    };
  });

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s?.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s?.currentBolsas);

  const [addDiscosModal, setAddDiscosModal] = React.useState(false);
  const [discos, setDiscos] = React.useState([]);

  const [addSimModal, setAddSimModal] = React.useState(false);
  const [sims, setSims] = React.useState([]);

  const [addSdModal, setAddSdModal] = React.useState(false);
  const [sds, setSds] = React.useState([]);

  const [efecto, setEfecto] = React.useState(
    JSON.parse(localStorage.getItem("currentEfecto")) || {
      bolsa_id: "",
      tipoDeElemento: "",
      tipoDeDisco: "",
      marca: "",
      modelo: "",
      imei: "",
      estado: "",
      tipoSeguridad: "",
      desbloqueo: "",
      herramientaSoft: "",
      tipoExtraccion: "",
      extraccion: "",
      almacenamiento: "",
      serialNumber: "",
      encendido: "",
      observacionEncendido: "",
      elementoFallado: "",
      observacionFalla: "",
      color: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (efecto.bolsa_id && efecto.tipoDeElemento) {
      if (efecto.edit) {
        dispatch(EditEfecto(efecto, discos, sims, sds, currentActa.id));
      } else {
        dispatch(createEfecto(efecto, discos, sims, sds, currentActa.id));
      }
      alternModal();
    } else {
      toast.error("¡Faltan datos necesarios para el Elemento!");
    }
  };

  const handleComplete = () => {
    const { bolsa_id, tipoDeDisco, tipoDeElemento, estado, encendido, elementoFallado } = efecto;

    switch (tipoDeElemento) {
      case "celular": {
        if (bolsa_id && estado && encendido) {
          return "true";
        }
        break;
      }
      case "tablet": {
        if (bolsa_id && estado && encendido) {
          return "true";
        }
        break;
      }
      case "notebook": {
        if (bolsa_id) {
          return "true";
        }
        break;
      }
      case "gabinete": {
        if (bolsa_id) {
          return "true";
        }
        break;
      }
      case "unidad de almacenamiento flash": {
        if (bolsa_id && elementoFallado && estado) {
          return "true";
        }
        break;
      }
      case "dvr": {
        if (bolsa_id && estado) {
          return "true";
        }
        break;
      }
      case "disco": {
        if (bolsa_id && tipoDeDisco && estado) {
          return "true";
        }
        break;
      }
      default:
        return "false";
    }
  };

  const handleOptButtonClick = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case "sim": {
        setAddSimModal(true);
        break;
      }
      case "discos": {
        setAddDiscosModal(true);
        break;
      }
      case "sd": {
        setAddSdModal(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Title>{efecto.edit ? "Editar Elemento" : "Agregar Elemento"}</Title>
        <InputContainer>
          <Label>Bolsa</Label>
          <Select
            disabled={efecto.edit ? true : false}
            value={efecto.bolsa_id}
            onChange={(e) => setEfecto({ ...efecto, bolsa_id: Number(e.target.value) })}
          >
            <SelectOpt value="">Precinto</SelectOpt>
            {currentBolsas.map((b) => {
              if (b.estado !== "cerrada" && b.estado !== "cerrada en proceso") {
                return (
                  <SelectOpt value={b.id} key={b.id} style={b.colorPrecinto === "rojo" ? { color: redColor } : { color: greenColor }}>
                    {b.nroPrecinto}
                  </SelectOpt>
                );
              }
            })}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Tipo de Elemento</Label>
          <Select
            disabled={efecto.edit ? true : false}
            value={efecto.tipoDeElemento}
            onChange={(e) => setEfecto({ ...efecto, tipoDeElemento: e.target.value })}
          >
            <SelectOpt value="">Tipo de Elemento</SelectOpt>
            <SelectOpt value="celular">Celular</SelectOpt>
            <SelectOpt value="tablet">Tablet</SelectOpt>
            <SelectOpt value="notebook">Notebook</SelectOpt>
            <SelectOpt value="gabinete">Gabinete</SelectOpt>
            <SelectOpt value="unidad de almacenamiento flash">Unidad de Almacenamiento Flash</SelectOpt>
            <SelectOpt value="dvr">DVR</SelectOpt>
            <SelectOpt value="disco">Disco</SelectOpt>
          </Select>
        </InputContainer>
        {efecto.tipoDeElemento === "disco" && (
          <InputContainer>
            <Label>Tipo de Disco</Label>
            <Select value={efecto.tipoDeDisco} onChange={(e) => setEfecto({ ...efecto, tipoDeDisco: e.target.value })}>
              <SelectOpt value="">Tipo De Disco</SelectOpt>
              <SelectOpt value="Disco Rígido">Disco Rígido</SelectOpt>
              <SelectOpt value="Disco Sólido">Disco Sólido</SelectOpt>
            </Select>
          </InputContainer>
        )}

        <InputContainer>
          <Label>Marca</Label>
          <Input
            type="text"
            name="marca"
            value={efecto.marca}
            placeholder="Marca"
            onChange={(e) => setEfecto({ ...efecto, marca: e.target.value.toUpperCase() })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Modelo</Label>
          <Input
            type="text"
            name="modelo"
            value={efecto.modelo}
            placeholder="Modelo"
            onChange={(e) => setEfecto({ ...efecto, modelo: e.target.value.toUpperCase() })}
          />
        </InputContainer>

        {efecto.tipoDeElemento === "celular" && (
          <InputContainer>
            <Label>IMEI</Label>
            <Input
              type="number"
              name="imei"
              value={efecto.imei}
              placeholder="Imei"
              onChange={(e) => setEfecto({ ...efecto, imei: e.target.value })}
            />
          </InputContainer>
        )}

        {(efecto.tipoDeElemento !== "disco" || efecto.tipoDeElemento !== "dvr") && (
          <InputContainer>
            <Label>Color</Label>
            <Select value={efecto.color} onChange={(e) => setEfecto({ ...efecto, color: e.target.value })}>
              <SelectOpt value="">Selecciona un color</SelectOpt>
              <SelectOpt value="negro">Negro</SelectOpt>
              <SelectOpt value="blanco">Blanco</SelectOpt>
              <SelectOpt value="gris">Gris</SelectOpt>
              <SelectOpt value="rojo">Rojo</SelectOpt>
              <SelectOpt value="azul">Azul</SelectOpt>
              <SelectOpt value="verde">Verde</SelectOpt>
              <SelectOpt value="amarillo">Amarillo</SelectOpt>
              <SelectOpt value="naranja">Naranja</SelectOpt>
              <SelectOpt value="morado">Morado</SelectOpt>
              <SelectOpt value="rosado">Rosado</SelectOpt>
              <SelectOpt value="marrón">Marrón</SelectOpt>
            </Select>
          </InputContainer>
        )}

        {(efecto.tipoDeElemento === "notebook" ||
          efecto.tipoDeElemento === "unidad de almacenamiento flash" ||
          efecto.tipoDeElemento === "tablet" ||
          efecto.tipoDeElemento === "gabinete" ||
          efecto.tipoDeElemento === "dvr" ||
          efecto.tipoDeElemento === "disco") && (
          <InputContainer>
            <Label>Serial Nº</Label>
            <Input
              type="text"
              name="serialNumber"
              value={efecto.serialNumber}
              placeholder="Serial Nº"
              onChange={(e) => setEfecto({ ...efecto, serialNumber: e.target.value.toUpperCase() })}
            />
          </InputContainer>
        )}

        {(efecto.tipoDeElemento === "disco" || efecto.tipoDeElemento === "unidad de almacenamiento flash") && (
          <InputContainer>
            <Label>Almacenamiento</Label>
            <Input
              type="text"
              name="almacenamiento"
              value={efecto.almacenamiento}
              placeholder="500 GB / 1 TB"
              onChange={(e) => setEfecto({ ...efecto, almacenamiento: e.target.value.toUpperCase() })}
            />
          </InputContainer>
        )}

        {efecto.tipoDeElemento !== "gabinete" &&
          efecto.tipoDeElemento !== "unidad de almacenamiento flash" &&
          efecto.tipoDeElemento !== "notebook" &&
          efecto.tipoDeElemento !== "dvr" &&
          efecto.tipoDeElemento !== "disco" && (
            <InputContainer>
              <Label>¿Enciende?</Label>
              <Select value={efecto.encendido} onChange={(e) => setEfecto({ ...efecto, encendido: e.target.value })}>
                <SelectOpt value="">¿Enciende?</SelectOpt>
                <SelectOpt value="si">Si</SelectOpt>
                <SelectOpt value="no">No</SelectOpt>
              </Select>
            </InputContainer>
          )}

        {efecto.encendido === "no" && (
          <InputContainer>
            <Label>Observacion Encendido</Label>
            <Input
              type="text"
              name="observacionEncendido"
              value={efecto.observacionEncendido}
              placeholder="¿Por que no enciende?"
              onChange={(e) => setEfecto({ ...efecto, observacionEncendido: e.target.value })}
            />
          </InputContainer>
        )}

        {(efecto.tipoDeElemento === "unidad de almacenamiento flash" || efecto.tipoDeElemento === "disco") && (
          <InputContainer>
            <Label>¿Falla?</Label>
            <Select value={efecto.elementoFallado} onChange={(e) => setEfecto({ ...efecto, elementoFallado: e.target.value })}>
              <SelectOpt value="">¿Falla?</SelectOpt>
              <SelectOpt value="si">Si</SelectOpt>
              <SelectOpt value="no">No</SelectOpt>
            </Select>
          </InputContainer>
        )}

        {efecto.encendido === "si" && (
          <InputContainer>
            <Label>¿Falla?</Label>
            <Select value={efecto.elementoFallado} onChange={(e) => setEfecto({ ...efecto, elementoFallado: e.target.value })}>
              <SelectOpt value="">¿Falla?</SelectOpt>
              <SelectOpt value="si">Si</SelectOpt>
              <SelectOpt value="no">No</SelectOpt>
            </Select>
          </InputContainer>
        )}

        {efecto.elementoFallado === "si" && (
          <InputContainer>
            <Label>Observacion Falla</Label>
            <Input
              type="text"
              name="observacionFalla"
              value={efecto.observacionFalla}
              placeholder="¿Por que Falla?"
              onChange={(e) => setEfecto({ ...efecto, observacionFalla: e.target.value })}
            />
          </InputContainer>
        )}

        {efecto.tipoDeElemento === ""
          ? null
          : efecto.tipoDeElemento !== "unidad de almacenamiento flash" &&
            efecto.tipoDeElemento !== "notebook" &&
            efecto.tipoDeElemento !== "gabinete" &&
            efecto.encendido === "si" &&
            efecto.elementoFallado === "no" && (
              <InputContainer>
                <Label>Herramienta Software</Label>
                <Select value={efecto.herramientaSoft} onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}>
                  <SelectOpt value="">Herramienta Software</SelectOpt>
                  <SelectOpt value="Cellebrite, UFED 4PC V7.60">UFED 4PC</SelectOpt>
                  <SelectOpt value="Cellebrite, UFED PREMIUM V7.60.702">UFED PREMIUM</SelectOpt>
                  <SelectOpt value="Magnet, AXIOM V6.10.0">AXIOM</SelectOpt>
                  <SelectOpt value="Opentext, ENCASE V8.11">ENCASE</SelectOpt>
                  <SelectOpt value="Grayshift, GREYKEY">GREYKEY</SelectOpt>
                  <SelectOpt value="Magnet, DVR EXAMINER V3.50">DVR EXAMINER</SelectOpt>
                  <SelectOpt value="TABLEAU TX1 V 22.3.0.3">TABLEAU TX1 V 22.3.0.3</SelectOpt>
                  <SelectOpt value="TABLEAU TD3">TABLEAU TD3</SelectOpt>
                  <SelectOpt value="TABLEAU FORENSIC BRIDGE (bloqueador de escritura)">
                    TABLEAU FORENSIC BRIDGE (bloqueador de escritura)
                  </SelectOpt>
                </Select>
              </InputContainer>
            )}

        {efecto.tipoDeElemento !== "unidad de almacenamiento flash" &&
          efecto.tipoDeElemento !== "notebook" &&
          efecto.tipoDeElemento !== "disco" &&
          efecto.tipoDeElemento !== "gabinete" &&
          efecto.herramientaSoft !== "" && (
            <InputContainer>
              <Label>Tipo de Seguridad</Label>
              <Select value={efecto.tipoSeguridad} onChange={(e) => setEfecto({ ...efecto, tipoSeguridad: e.target.value })}>
                <SelectOpt value="">Tipo de Seguridad</SelectOpt>
                <SelectOpt value="ninguna">Ninguna</SelectOpt>
                <SelectOpt value="patron">Patron</SelectOpt>
                <SelectOpt value="contraseña">Contraseña</SelectOpt>
                <SelectOpt value="PIN de inicio">Pin</SelectOpt>
                <SelectOpt value="huella">Huella</SelectOpt>
              </Select>
            </InputContainer>
          )}
        {efecto.tipoDeElemento === ""
          ? null
          : efecto.tipoDeElemento !== "unidad de almacenamiento flash" &&
            efecto.tipoSeguridad !== "ninguna" &&
            efecto.tipoSeguridad !== "" && (
              <InputContainer>
                <Label>¿Desbloqueo?</Label>
                <Select value={efecto.desbloqueo} onChange={(e) => setEfecto({ ...efecto, desbloqueo: e.target.value })}>
                  <SelectOpt value="">Desbloqueo</SelectOpt>
                  <SelectOpt value="si">Si</SelectOpt>
                  <SelectOpt value="no">No</SelectOpt>
                </Select>
              </InputContainer>
            )}

        {efecto.tipoDeElemento !== "unidad de almacenamiento flash" && efecto.tipoSeguridad === "ninguna" ? (
          <InputContainer>
            <Label>Tipo de Extracción</Label>
            <Select value={efecto.tipoExtraccion} onChange={(e) => setEfecto({ ...efecto, tipoExtraccion: e.target.value })}>
              <SelectOpt value="">Tipo de Extracción</SelectOpt>
              <SelectOpt value="ninguna">Ninguna</SelectOpt>
              <SelectOpt value="fisica">Fisica</SelectOpt>
              <SelectOpt value="logica">Logica</SelectOpt>
              <SelectOpt value="logica avanzada">Logica Avanzada</SelectOpt>
              <SelectOpt value="fisica y logica">Ambas</SelectOpt>
            </Select>
          </InputContainer>
        ) : (
          efecto.tipoDeElemento !== "unidad de almacenamiento flash" &&
          efecto.desbloqueo === "si" && (
            <InputContainer>
              <Label>Tipo de Extracción</Label>
              <Select value={efecto.tipoExtraccion} onChange={(e) => setEfecto({ ...efecto, tipoExtraccion: e.target.value })}>
                <SelectOpt value="">Tipo de Extracción</SelectOpt>
                <SelectOpt value="ninguna">Ninguna</SelectOpt>
                <SelectOpt value="fisica">Fisica</SelectOpt>
                <SelectOpt value="logica">Logica</SelectOpt>
                <SelectOpt value="logica avanzada">Logica Avanzada</SelectOpt>
                <SelectOpt value="fisica y logica">Ambas</SelectOpt>
              </Select>
            </InputContainer>
          )
        )}

        {(efecto.tipoDeElemento === "unidad de almacenamiento flash" || efecto.tipoDeElemento === "disco") &&
          efecto.elementoFallado === "no" && (
            <>
              <InputContainer>
                <Label>Herramienta Software</Label>
                <Select value={efecto.herramientaSoft} onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}>
                  <SelectOpt value="">Herramienta Software</SelectOpt>
                  <SelectOpt value="Cellebrite, UFED 4PC V7.60">UFED 4PC</SelectOpt>
                  <SelectOpt value="Cellebrite, UFED PREMIUM V7.60.702">UFED PREMIUM</SelectOpt>
                  <SelectOpt value="Magnet, AXIOM V6.10.0">AXIOM</SelectOpt>
                  <SelectOpt value="Opentext, ENCASE V8.11">ENCASE</SelectOpt>
                  <SelectOpt value="Grayshift, GREYKEY">GREYKEY</SelectOpt>
                  <SelectOpt value="Magnet, DVR EXAMINER V3.50">DVR EXAMINER</SelectOpt>
                  <SelectOpt value="TABLEAU TX1 V 22.3.0.3">TABLEAU TX1 V 22.3.0.3</SelectOpt>
                  <SelectOpt value="TABLEAU TD3">TABLEAU TD3</SelectOpt>
                  <SelectOpt value="TABLEAU FORENSIC BRIDGE (bloqueador de escritura)">
                    TABLEAU FORENSIC BRIDGE (bloqueador de escritura)
                  </SelectOpt>
                </Select>
              </InputContainer>
              {efecto.herramientaSoft !== "" && (
                <InputContainer>
                  <Label>Tipo de Extracción</Label>
                  <Select value={efecto.tipoExtraccion} onChange={(e) => setEfecto({ ...efecto, tipoExtraccion: e.target.value })}>
                    <SelectOpt value="">Tipo de Extracción</SelectOpt>
                    <SelectOpt value="ninguna">Ninguna</SelectOpt>
                    <SelectOpt value="fisica">Fisica</SelectOpt>
                    <SelectOpt value="logica">Logica</SelectOpt>
                    <SelectOpt value="logica avanzada">Logica Avanzada</SelectOpt>
                    <SelectOpt value="fisica y logica">Ambas</SelectOpt>
                  </Select>
                </InputContainer>
              )}
            </>
          )}

        {efecto.tipoDeElemento !== "notebook" && efecto.tipoDeElemento !== "gabinete" && (
          <InputContainer>
            <Label>Estado</Label>
            <Select value={efecto.estado} onChange={(e) => setEfecto({ ...efecto, estado: e.target.value })}>
              <SelectOpt value="">Estado</SelectOpt>
              <SelectOpt value="completo">Completo</SelectOpt>
              <SelectOpt value="en proceso">En Proceso</SelectOpt>
            </Select>
          </InputContainer>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
          <Button type="submit" value={efecto.edit ? "Editar Elemento" : "Cargar Elemento"} complete={handleComplete()} />
          {(efecto.tipoDeElemento === "celular" || efecto.tipoDeElemento === "tablet") && (
            <>
              <OptButton onClick={(e) => handleOptButtonClick(e)} value="sim">
                Agregar SIM
              </OptButton>
              <OptButton onClick={(e) => handleOptButtonClick(e)} value="sd">
                Agregar SD
              </OptButton>
            </>
          )}

          {(efecto.tipoDeElemento === "notebook" || efecto.tipoDeElemento === "gabinete" || efecto.tipoDeElemento === "dvr") && (
            <OptButton onClick={(e) => handleOptButtonClick(e)} value="discos">
              Agregar Discos
            </OptButton>
          )}
        </div>
      </Form>

      <Modal isOpen={addDiscosModal} style={modal40x30} ariaHideApp={false}>
        <AddDiscoModal discos={discos} setDiscos={setDiscos} setAddDiscoModal={setAddDiscosModal} toast={toast} />
      </Modal>

      <Modal isOpen={addSimModal} style={modal40x30} ariaHideApp={false}>
        <AddSimModal sims={sims} setSims={setSims} setAddSimModal={setAddSimModal} toast={toast} />
      </Modal>

      <Modal isOpen={addSdModal} style={modal40x30} ariaHideApp={false}>
        <AddSdModal sds={sds} setSds={setSds} setAddSdModal={setAddSdModal} toast={toast} />
      </Modal>
    </>
  );
}

export default AddEfectos;

const Title = styled.h4`
  border-bottom: 2px solid white;
  width: 120%;
  text-align: center;
  margin-bottom: 2%;
  padding-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;
  color: white;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: max-content;
  border-bottom: 1px solid ${secondaryColor};
  padding-bottom: 10px;
  margin-block: 5px;
`;

const Label = styled.label`
  flex: 1;
`;

const Input = styled.input`
  ${input}
  font-size: medium;
  flex: 1;
  height: 30px;
  text-align: center;
`;

const Select = styled.select`
  ${select}
  font-size: medium;
  flex: 1;
  height: 30px;
  text-align: center;
`;

const SelectOpt = styled.option``;

const Button = styled.input`
  ${button}
  padding: 5px;
  padding-inline: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;
  margin-bottom: -2.5%;
  margin-top: 1%;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: ${principalColor};
    border: 2px solid transparent;
  }

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;

const OptButton = styled.button`
  ${button}
  padding: 5px;
  padding-inline: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${greenColor};
  margin-bottom: -2.5%;
  margin-top: 1%;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: ${principalColor};
    border: 2px solid transparent;
  }
`;

const CloseIcon = styled(Close)`
  position: absolute;
  right: 0;
  top: 0;
  width: 8%;
  margin-top: 1%;
  color: white;
  transition: all 0.5s ease;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;
