import Button from "@/components/Button";
import Input from "@/components/input/Input";
import PasswordInput from "@/components/input/PasswordInput";
import { useUsuario } from "@/hooks/useUsuario";
import { Calendar, ChevronDown, Mail, MapPin, Pen, Phone } from "lucide-react";
import { useNavigate } from "react-router";

function Inicio() {
  const {
    datos: {
      nombres,
      apellidos,
      correo,
      telefono,
      fechaNacimiento,
      sexo,
      fotoPerfil,
      numeroDocumento,
      fechaCreacion,
    },
  } = useUsuario();
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <form action="">
        <section className="flex gap-4 mb-8">
          <figure className="relative group">
            <img
              src={fotoPerfil}
              alt="Foto de perfil"
              className="h-[72px] aspect-1/1 rounded-full"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full bg-black/40 rounded-full backdrop-blur-xs flex justify-center items-center transition-all ease-out duration-100">
              <Pen color="white" />
            </div>
            <input
              type="file"
              name=""
              id=""
              className="absolute top-0 left-0 w-full h-full opacity-0"
            />
          </figure>
          <div>
            <h1 className="text-left">
              {nombres} {apellidos}
            </h1>
            <span className="block text-left">
              Miembro desde:{" "}
              <time dateTime={fechaCreacion}>{fechaCreacion}</time>
            </span>
          </div>
        </section>
        <section className="grid grid-cols-2 justify-start place-items-stretch gap-4 mb-8">
          <Input
            idName="nombres"
            label="Nombres"
            required={true}
            defaultValue={nombres}
          />
          <Input
            idName="apellidos"
            label="Apellidos"
            required={true}
            defaultValue={apellidos}
          />
          <div className="col-span-full">
            <Input
              idName="correo-electronico"
              label="Correo electrónico"
              type="email"
              leftIcon={<Mail />}
              required={true}
              defaultValue={correo}
            />
          </div>
          <Input
            idName="telefono"
            label="Teléfono"
            leftIcon={<Phone />}
            required={true}
            defaultValue={telefono}
          />
          <Input
            idName="sexo"
            label="Sexo"
            rightIcon={<ChevronDown />}
            required={true}
            defaultValue={sexo}
          />
          <Input
            idName="ubicacion"
            label="Ubicación"
            leftIcon={<MapPin />}
            required={true}
            placeholder="Dirección"
          />
          <Input
            idName="fecha-nacimiento"
            label="Fecha de nacimiento"
            type="date"
            leftIcon={<Calendar />}
            required={true}
            defaultValue={fechaNacimiento}
          />
          <Input
            idName="tipo-documento"
            label="Tipo de documento de identidad"
            required={true}
            placeholder="Seleccione una opción"
            rightIcon={<ChevronDown />}
          />
          <Input
            idName="numero-documento"
            label="Número de documento de identidad"
            required={true}
            defaultValue={numeroDocumento}
            placeholder="Ingrese su número de documento"
          />

          {/* <div>
          <label htmlFor="genre">Género</label>
          <select id="genre" name="genre" required>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          </select>
          </div> */}
          {/* <div>
          <label htmlFor="doc-type">Tipo de documento</label>
          <select id="doc-type" name="doc-type" required>
          <option value="M">DNI</option>
          <option value="F">Carné de extranjería</option>
          </select>
          </div>
          <div>
          <label htmlFor="num-doc">Número de documento</label>
          <input type="number" name="num-doc" id="num-doc" required />
          </div> */}
        </section>
        <hr />
        <section className="mt-8 flex flex-col gap-4">
          <PasswordInput
            idName="contrasenha-actual"
            label="Contraseña actual"
            placeholder="Ingrese la contraseña actual"
            required={false}
          />
          <PasswordInput
            idName="contrasenha"
            label="Contraseña nueva"
            placeholder="Ingrese la nueva contraseña"
            required={false}
          />
          <PasswordInput
            idName="confirmar-contrasenha"
            label="Confirmar contraseña nueva"
            placeholder="Confirme la nueva contraseña"
            required={false}
          />
        </section>
        <section className="flex gap-4 mt-8 justify-end">
          <Button onClick={() => navigate(-1)} variant="outline">
            Volver
          </Button>
          <Button type="submit">Aplicar cambios</Button>
        </section>
      </form>
    </div>
  );
}

export default Inicio;
