import type { Cita } from "../../types/citas.types"
import './CardCita.css';


// Type local para las props:
type CitaProps = {
    cita: Cita;
}

export const CardCita = ({ cita }: CitaProps) => {
  const ahora = new Date();
  const fechaCita = new Date(cita.fecha_cita);

  const diferenciaMs = Math.abs(ahora.getTime() - fechaCita.getTime());
  const diferenciaMinutos = diferenciaMs / (1000 * 60);

  const expired = fechaCita < ahora && diferenciaMinutos > 10;
  const citaActual = diferenciaMinutos <= 10;

  const claseCard = citaActual ? "card card-actual" : (expired ? "card card-expirada" : "card");

  let mensaje = null;
  if (diferenciaMinutos <= 10) {
    mensaje = <p className="tag">⏰ Cita en curso</p>;
  } else if (fechaCita < ahora) {
    mensaje = <p className="tag">⚠️ Cita pasada</p>;
  }

  return (
    <div key={cita.id} className={claseCard}>
        <h3><strong>Cita</strong></h3>
        <p><strong>Paciente:</strong> {cita.paciente}</p>
        <p><strong>Fecha y hora:</strong> {cita.fecha_cita.replace("T", " - ")}</p>
        {mensaje}
    </div>
  )
}
