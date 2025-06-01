import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import UsuariosForms from "@/components/admin/usuarios/UsuariosForms";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import { useNavigate } from "react-router";

function EditarUsuario(){
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const navigate = useNavigate();

    const {
        nombres, setNombres,
        apellidos, setApellidos,
        tipoDoc, setTipoDoc,
        DNI, setDNI,
        telefono, setTelefono,
        direccion, setDireccion,
        correo, setCorreo,
        genero, setGenero,
        fechaNacimiento, setFechaNacimiento,
        contrasenha, setContrasenha,
        setUsuarioAPI
    } = useUsuarioForm();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/clientes/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setUsuarioAPI(res.data);
            console.log("Usuario:", res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Error cargando el usuario", err);
            setLoading(false);
          });
      }, []);
    
    if (loading) {
      return <p>Cargando usuario...</p>; // o un spinner
    }

    const handleEditarUsuario = async() => {
        try{
            const sexo = genero;

            const response = await axios.put(`http://localhost:8080/api/admin/clientes/${id}`, 
                {
                    nombres,
                    apellidos,
                    numeroDocumento: DNI,
                    correo,
                    contrasenha: (contrasenha == "xxxxxxxx" ) && contrasenha,
                    telefono,
                    sexo,
                    fechaNacimiento,
                    notificacionPorCorreo: true,
                    notificacionPorSMS: true,
                    notificacionPorWhatsApp: true,
                    direccion,
                    tipoDocumento: {
                        idTipoDocumento: tipoDoc
                    },
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

            console.log("Usuario editado:", response.data);
            //alert("Usuario editado exitosamente");
            navigate("/admin/usuarios/successEditar", {
                state: { created: true }
            });
        }
        catch (err){
            console.error("Error al editar usuario:", err);
            alert("Hubo un error al editar el usuario");
        }
    }

    
    return(
            <UsuariosForms
                title="Editar usuario"
                nombres={nombres}
                setNombres={setNombres}
                apellidos={apellidos}
                setApellidos={setApellidos}
                tipoDoc={tipoDoc}
                setTipoDoc={setTipoDoc}
                DNI={DNI}
                setDNI={setDNI}
                telefono={telefono}
                setTelefono={setTelefono}
                correo={correo}
                setCorreo={setCorreo}
                direccion={direccion}
                setDireccion={setDireccion}
                genero={genero}
                setGenero={setGenero}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                onSubmit={handleEditarUsuario}
                buttonText="Guardar"
                readOnly={false}
            />
    );
}

export default EditarUsuario;

//Ver CrearUsuario