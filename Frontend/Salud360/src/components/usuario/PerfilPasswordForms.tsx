import {  useState } from "react";
//import PasswordInput from "../input/PasswordInput";
import InputPasswordLabel from "../InputPassword";
import Button from "../Button";
import { useNavigate } from "react-router";
import { baseAPI } from "@/services/baseAPI";

interface Props{
    id: string;
}

function PerfilPasswordForms({id}: Props){
    
    const [passwordActual, setPasswordActual] = useState("");
    const [passwordNueva, setPasswordNueva] = useState("");
    const [passwordNueva2, setPasswordNueva2] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleActualizarPassword = async() => {
        setError("");

        if (passwordNueva !== passwordNueva2){
            setError("Las contraseñas no coinciden");
            return;
        }


        try {
            const response = await baseAPI.put(`/usuarios/${id}/cambiarContrasenha`,
                {
                    contrasenhaActual: passwordActual,
                    contrasenhaNueva: passwordNueva
                },
                {
                    auth: {
                        username: "admin",
                        password: "admin123"
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            //console.log("Contraseña actualizada:", response.data);
            //alert("Usuario editado exitosamente");
            navigate("/usuario/configuracion/successCambiarContrasenha", {
                state: { created: true }
            });
        }
        catch (err) {
            console.error("Error al editar contraseña:", err);
            alert("Hubo un error al editar la contraseña");
        }

        

    }
    
    return(
        <>
            <section className="mt-8 flex flex-col gap-4">
                <InputPasswordLabel htmlFor={"contrasenha-actual"} label={"Contraseña actual"} name={"contrasenha"} placeholder="Ingrese la contraseña actual" value={passwordActual} required={true} onChange={(e) => setPasswordActual(e.target.value)}/>
                <InputPasswordLabel htmlFor={"contrasenha-actual"} label={"Contraseña nueva"} name={"contrasenha"} placeholder="Ingrese la nueva contraseña" value={passwordNueva} required={true} onChange={(e) => setPasswordNueva(e.target.value)}/>
                <InputPasswordLabel htmlFor={"contrasenha-actual"} label={"Confirmar nueva contraseña"} name={"contrasenha"} placeholder="Confirme la nueva contraseña" value={passwordNueva2} required={true} onChange={(e) => setPasswordNueva2(e.target.value)}/>
            </section>
            <div className="mt-8">
                <Button type="submit" size="lg" onClick={handleActualizarPassword}>Actualizar contraseña</Button>
            </div>

            {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
        </>
    )
}

export default PerfilPasswordForms;

{/*<PasswordInput
                    name="contrasenha-actual"
                    label="Contraseña actual"
                    placeholder="Ingrese la contraseña actual"
                    defaultValue={passwordActual}
                    onChange={(e) => setPasswordActual(e.target.value)}
                    required={false}
                /> */}

{/*<PasswordInput
                    name="contrasenha"
                    label="Contraseña nueva"
                    placeholder="Ingrese la nueva contraseña"
                    defaultValue={passwordNueva}
                    onChange={(e) => setPasswordNueva(e.target.value)}
                    required={false}
                /> */}

{/*<PasswordInput
                    name="confirmar-contrasenha"
                    label="Confirmar contraseña nueva"
                    placeholder="Confirme la nueva contraseña"
                    defaultValue={passwordNueva2}
                    onChange={(e) => setPasswordNueva2(e.target.value)}
                    required={false}
                /> */}