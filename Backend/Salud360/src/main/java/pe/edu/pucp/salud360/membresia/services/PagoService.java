package pe.edu.pucp.salud360.membresia.services;

import java.util.List;

import pe.edu.pucp.salud360.membresia.dto.PagoDTO;

public interface PagoService {
    List<PagoDTO> listarPagos();
    PagoDTO obtenerPagoPorId(Integer id);
    PagoDTO crearPago(PagoDTO pagoDTO);
    PagoDTO actualizarPago(Integer id, PagoDTO pagoDTO);
    void eliminarPago(Integer id);
}