import type { Cita } from "../types/citas.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCitas = async() => {
    try{
        const response = await fetch(`${BASE_URL}/rest/v1/citas?select=*&order=fecha_cita`,{
            headers: {
                apikey: API_KEY,
            },
        });

        const data: Cita[] = await response.json();
        // console.log("DATA:", data);

        return data;
    }
    catch(error: unknown){
        throw new Error(`Error en el llamado API: ${error}`);      
    }
};

export const postCitas = async(cita: Cita) => {
    try{        
       const response = await fetch(`${BASE_URL}/rest/v1/citas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: API_KEY,
            },
            body: JSON.stringify(cita),
        });

        if (!response.ok) {
            throw new Error("Error al guardar la cita"); 
        }
        
        return "Cita creada correctamente";
    }
    catch(error: unknown){
        throw new Error(`Error en el llamado API: ${error}`);      
    }
};
