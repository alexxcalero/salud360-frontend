import React from 'react';
import Button from '../Button';

interface DetallePagoModalProps {
  pago: any;
  onClick: () => void;
}

const DetallePagoModal: React.FC<DetallePagoModalProps> = ({ pago, onClick }) => {
  const fecha = new Date(pago.fechaPago).toLocaleDateString();
  const membresia = pago.afiliacion.membresia;
  const comunidad = pago.afiliacion.comunidad;
  const medio = pago.medioDePago;

  const ocultarCuenta = (n: string) =>
    n.length > 4 ? `**** **** **** ${n.slice(-4)}` : n;

  const formatearTipo = (tipo: string) => {
  const map: Record<string, string> = {
    tarjeta_credito: "Tarjeta de Crédito",
    tarjeta_debito: "Tarjeta de Débito",
    efectivo: "Efectivo",
    yape: "Yape",
    plin: "Plin",
    visa: "Visa",
    mastercard: "Mastercard",

    //Estoy agregando estos porseaca
  };

  return map[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('_', ' ');
};

  return (
      <div className="flex flex-col gap-8 bg-white p-6 rounded-xl w-[500px] shadow-xl relative">
        <h1 className="">Detalle del Pago</h1>
        <div className="space-y-2">
          <p><span className="font-semibold">Monto pagado:</span> S/. {pago.monto.toFixed(2)}</p>
          <p><span className="font-semibold">Fecha de pago:</span> {fecha}</p>
          <p><span className="font-semibold">Método de pago:</span> {formatearTipo(medio.tipo)}</p>
          <p><span className="font-semibold">N° cuenta o tarjeta:</span> {ocultarCuenta(medio.ncuenta)}</p>
          <hr />
          <p><span className="font-semibold">Comunidad:</span> {comunidad.nombre}</p>
          <p><span className="font-semibold">Membresía:</span> {membresia.nombre}</p>
        </div>
        <small>Para ver más detalles de la membresía, ir al apartado de <span className="text-[#2A86FF] italic hover:underline"><a href="/usuario/configuracion/membresias">Membresías.</a></span> </small>
        <div><Button size='lg' variant='outline' onClick={onClick}>Volver</Button></div>
      </div>
  );
};

export default DetallePagoModal;
