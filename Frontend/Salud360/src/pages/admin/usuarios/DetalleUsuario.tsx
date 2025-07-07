import  { useEffect, useState } from "react";
import { useParams } from "react-router";
import UsuariosForms from "@/components/admin/usuarios/UsuariosForms";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import { baseAPI } from "@/services/baseAPI";


function DetalleUsuario(){
  /*
    interface TipoDocumento {
        idTipoDocumento: number;
        nombre?: string;
        activo?: boolean;
        fechaCreacion?: string;
        fechaDesactivacion?: string;
      }
      
      interface Usuario {
        idUsuario: number;
        nombres: string;
        apellidos: string;
        numeroDocumento: string;
        correo: string;
        contrasenha: string;
        telefono: string;
        fechaNacimiento: string;
        activo: boolean;
        tipoDocumento: TipoDocumento;
      }
    */
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const {
        nombres,// setNombres,
        apellidos, //setApellidos,
        tipoDoc, //setTipoDoc,
        DNI, //setDNI,
        telefono,// setTelefono,
        direccion, //setDireccion,
        correo,// setCorreo,
        genero, //setGenero,
        fechaNacimiento, //setFechaNacimiento,
        //contrasenha, setContrasenha,
        setUsuarioAPI
    } = useUsuarioForm();

    useEffect(() => {
        baseAPI.get(`/admin/clientes/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setUsuarioAPI(res.data)
            //console.log("Usuario:", res.data);
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


    return(
            <UsuariosForms
                title="Detalles del usuario"
                nombres={nombres}
                apellidos={apellidos}
                tipoDoc={tipoDoc}
                DNI={DNI}
                telefono={telefono}
                correo={correo}
                direccion={direccion}
                genero={genero}
                fechaNacimiento={fechaNacimiento}
                buttonText="Crear Usuario"
                readOnly={true}
            />
    );
}

export default DetalleUsuario;

//Ver CrearUsuario