import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import UsuariosForms from "@/components/admin/usuarios/UsuariosForms";
import useUsuarioForm from "@/hooks/useUsuarioForm";

function EditarUsuario(){
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const {
        nombres, setNombres,
        apellidos, setApellidos,
        DNI, setDNI,
        telefono, setTelefono,
        rol, setRol,
        correo, setCorreo,
        genero, setGenero,
        fechaNacimiento, setFechaNacimiento,
        contrasenha, setContrasenha,
        setUsuarioAPI
    } = useUsuarioForm();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/usuarios/${id}`, {
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
            const numeroDocumento = DNI;
            const response = await axios.patch(`http://localhost:8080/api/usuarios/${id}`, 
                {
                    nombres,
                    apellidos,
                    numeroDocumento,
                    telefono,
                    correo,
                    genero,
                    fechaNacimiento,
                    contrasenha,
                    tipoDocumento: {
                        idTipoDocumento: 1
                    },
                    rol: {
                        idRol: 1
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

            console.log("Usuario creado:", response.data);
            alert("Usuario creado exitosamente");
        }
        catch (err){
            console.error("Error al crear usuario:", err);
            alert("Hubo un error al crear el usuario");
        }


    }

    

    return(
        <div className="mx-128 my-auto">
            <UsuariosForms
                title="Editar usuario"
                nombres={nombres}
                setNombres={setNombres}
                apellidos={apellidos}
                setApellidos={setApellidos}
                DNI={DNI}
                setDNI={setDNI}
                telefono={telefono}
                setTelefono={setTelefono}
                correo={correo}
                setCorreo={setCorreo}
                rol={rol}
                setRol={setRol}
                genero={genero}
                setGenero={setGenero}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                contrasenha={contrasenha}
                setContrasenha={setContrasenha}
                onSubmit={handleEditarUsuario}
                buttonText="Guardar"
                readOnly={false}
            />
        </div>
    );
}

export default EditarUsuario;