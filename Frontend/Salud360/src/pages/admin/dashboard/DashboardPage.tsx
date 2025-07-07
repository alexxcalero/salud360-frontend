import { useEffect, useState } from "react";
import { baseAPI } from "@/services/baseAPI";

function DashboardPage() {
  const [usuarios, setUsuarios] = useState<number>(0);
  const [comunidades, setComunidades] = useState<number>(0);
  const [medicos, setMedicos] = useState<number>(0);
  const [labelsMeses, setLabelsMeses] = useState<string[]>([]);
  const [usuariosPorMes, setUsuariosPorMes] = useState<number[]>([]);
  const [topComunidades, setTopComunidades] = useState<{ nombre: string, cantMiembros: number, recaudado: number }[]>([]);
  const [membresiasDonaData, setMembresiasDonaData] = useState<number[]>([0, 0, 0]);
  const [gananciasTotales, setGananciasTotales] = useState<number>(0);
  const [isLaptop, setIsLaptop] = useState(false);

  const updateLayout = () => {
    const width = window.innerWidth;
    setIsLaptop(width < 1540);
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const accesosRapidos = [
    { texto: "Crear Comunidad", ruta: "/admin/comunidades/crear" },
    { texto: "Crear Servicio", ruta: "/admin/servicios/crear" },
    { texto: "Crear Local", ruta: "/admin/locales/crear" },
    { texto: "Crear Usuario", ruta: "/admin/usuarios/crear/usuario" },
    { texto: "Crear Admin", ruta: "/admin/usuarios/crear/admin" },
    { texto: "Crear Personal Médico", ruta: "/admin/personalMedico/crear" }
  ];

  useEffect(() => {
    let usuariosTotalTemp = 0;

    baseAPI.get("/admin/clientes", {
      auth: { username: "admin", password: "admin123" }
    }).then(res => {
      const data = res.data;
      usuariosTotalTemp = data.length;
      setUsuarios(usuariosTotalTemp);

      const conteoPorMes: Record<string, number> = {};
      const etiquetasMeses: string[] = [];
      const hoy = new Date();
      const start = new Date(2025, 0);
      const opciones = { month: 'short' } as const;
      const locale = 'es-ES';

      while (start <= hoy) {
        const clave = `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, '0')}`;
        const label = start.toLocaleDateString(locale, opciones).replace(".", "");
        etiquetasMeses.push(label);
        conteoPorMes[clave] = 0;
        start.setMonth(start.getMonth() + 1);
      }

      data.forEach((cli: any) => {
        if (!cli.fechaCreacion) return;
        const fecha = new Date(cli.fechaCreacion);
        const clave = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
        if (clave in conteoPorMes) conteoPorMes[clave]++;
      });

      setLabelsMeses(etiquetasMeses);
      setUsuariosPorMes(Object.values(conteoPorMes));

      // Ahora traer comunidades y membresías en paralelo
      Promise.all([
        baseAPI.get("/comunidades", {
          auth: { username: "admin", password: "admin123" }
        }),
        baseAPI.get("/membresias", {
          auth: { username: "admin", password: "admin123" }
        }),
        baseAPI.get("/admin/medicos", {
          auth: { username: "admin", password: "admin123" }
        })
      ]).then(([resComunidades, resMembresias, resMedicos]) => {
        const comunidadesData = resComunidades.data;
        const membresiasData = resMembresias.data;
        const medicosData = resMedicos.data;

        setComunidades(comunidadesData.length);
        setMedicos(medicosData.length);

        let conTope = 0, sinTope = 0, totalGanancias = 0;

        const resumenMap: Record<number, number> = {}; // idComunidad -> Suma(usuarios * precio)

        membresiasData.forEach((m: any) => {
          const cant = m.cantUsuarios || 0;
          const precio = m.precio || 0;
          if (m.conTope) conTope += cant;
          else sinTope += cant;
          totalGanancias += cant * precio;

          if (m.comunidad?.idComunidad) {
            if (!resumenMap[m.comunidad.idComunidad]) resumenMap[m.comunidad.idComunidad] = 0;
            resumenMap[m.comunidad.idComunidad] += cant * precio;
          }
        });

        const inactivos = Math.max(usuariosTotalTemp - (conTope + sinTope), 0);
        setMembresiasDonaData([conTope, sinTope, inactivos]);
        setGananciasTotales(totalGanancias);

        // Generar resumen combinado
        const top10 = comunidadesData.map((c: any) => ({
          nombre: c.nombre,
          cantMiembros: c.cantMiembros || 0,
          recaudado: resumenMap[c.idComunidad] || 0
        })).sort((a, b) => b.cantMiembros - a.cantMiembros)
          .slice(0, 10);

        setTopComunidades(top10);
      });
    }).catch(err => console.error("Error cargando usuarios", err));
  }, []);


  const urlGraficoUsuarios = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
    type: "line",
    data: {
      labels: labelsMeses,
      datasets: [{
        label: "Usuarios",
        data: usuariosPorMes,
        fill: true,
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.5)"
      }]
    },
    options: {
      scales: { y: { ticks: { precision: 0 } } },
      plugins: { legend: { display: true }, tooltip: { enabled: true } }
    }
  }))}`;

  const urlGraficoMembresias = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
    type: "doughnut",
    data: {
      labels: ["Con Tope", "Sin Tope", "Inactivos"],
      datasets: [{
        data: membresiasDonaData,
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"]
      }]
    },
    options: {
      layout: { padding: 0 },
      plugins: { legend: { position: "top", align: "center" }, tooltip: { enabled: true } }
    }
  }))}`;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <title>Dashboard</title>
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl text-black font-semibold">Usuarios</p>
          <p className="text-2xl font-bold">{usuarios}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl text-black font-semibold">Comunidades</p>
          <p className="text-2xl font-bold">{comunidades}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl text-black font-semibold">Médicos</p>
          <p className="text-2xl font-bold">{medicos}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl text-black font-semibold">Ganancias</p>
          <p className="text-2xl font-bold">
            S/. {gananciasTotales.toLocaleString("es-PE", { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="col-span-7 bg-white p-1 rounded shadow h-[660px] flex flex-col items-center justify-start">
          <h2 className="text-2xl font-bold text-center mt-2 mb-2">Usuarios Nuevos por Mes</h2>
          <iframe
            title="Gráfico de usuarios"
            className={`w-[1050px] h-[650px] border-none transform origin-mid ${isLaptop ? 'scale-[0.55]' : 'scale-[0.75]'}`}
            src={urlGraficoUsuarios}
          />
        </div>

        <div className="col-span-5 bg-white p-1 rounded shadow h-[660px] flex flex-col items-center justify-start">
          <h2 className="text-2xl font-bold text-center mt-2 mb-2">Distribución de Membresías</h2>
          <iframe
            title="Distribución de membresías"
            className={`w-[1050px] h-[650px] border-none transform origin-mid ${isLaptop ? 'scale-[0.55]' : 'scale-[0.75]'}`}
            src={urlGraficoMembresias}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Resumen Comunidades</h3>
        <ul className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
          {topComunidades.map((comunidad, index) => (
            <li key={index} className="flex justify-between border-b pb-1">
              <div className="flex flex-col">
                <span>{comunidad.nombre}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-green-600 font-semibold">
                  {comunidad.cantMiembros === 0
                    ? "Sin miembros"
                    : `${comunidad.cantMiembros} miembros`}
                </span>
                <span className="text-blue-600 font-semibold text-sm">
                  <span className="text-black">Ganancias estimadas:</span> S/. {comunidad.recaudado.toLocaleString("es-PE", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>


        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Accesos Rápidos</h3>
          <ul className="space-y-2 text-left">
            {accesosRapidos.map((item, index) => (
              <li key={index} className="border-b pb-1">
                <a href={item.ruta} className="text-blue-600 hover:underline font-medium">
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
