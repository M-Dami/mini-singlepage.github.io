import './Citas.css';
import { useEffect, useState } from "react";
import { fetchCitas, postCitas } from "../../services/citas.services";
import type { Cita } from "../../types/citas.types";
import { CardCita, Error, Loading } from "../index";

export const Citas = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paciente, setNombre] = useState("");
    const [fecha_cita, setHora] = useState("");
    const [citas, setCitas] = useState<Cita[]>([]);

    // Obtener citas: GET
    const getCitas = async () => {
        setLoading(true);
        try{
            const data: Cita[] = await fetchCitas();
            setCitas(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(error){
            // console.log("error", error);
            setError('Error en el llamado API')
        } finally {
            setLoading(false);
        }
    };

    // Agregar cita: POST
    const agregarCita = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!paciente || !fecha_cita) {
            setLoading(false);
            return alert("Llena todos los campos");
        }
        try{
            await postCitas({paciente, fecha_cita});
            setNombre("");
            setHora("");
            getCitas(); // Refrescar citas
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(error){
            // console.log("error", error);
            setError('Error en el llamado API')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCitas();
    }, []);

    if (loading) {
        return (
            <Loading/>
        );
    }

    if(error){
        return(
            <Error message={error} />
        );
    }

    return (
        <div style={{ padding: "2rem", minWidth: "400px", margin: "auto" }}>
            <h1>Formulario de Citas Médicas</h1>
            <form onSubmit={agregarCita}>
                <input
                    type="text"
                    placeholder="Nombre del paciente"
                    value={paciente}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={fecha_cita}
                    onChange={(e) => setHora(e.target.value)}
                />
                <button type="submit">Registrar Cita</button>
            </form>

            <h2>Citas Registradas</h2>
            {citas.map((cita, index) => (
                <CardCita key={index} cita={cita}/>
            ))}
        </div>
    )
}
