package pe.edu.pucp.salud360.membresia.services;


import pe.edu.pucp.salud360.membresia.dto.MedioDePagoDTO;

import java.util.List;

public interface MedioDePagoService {
    List<MedioDePagoDTO> listar();
    MedioDePagoDTO crear(MedioDePagoDTO dto);
    MedioDePagoDTO obtenerPorId(Integer id);
    boolean eliminar(Integer id);
    MedioDePagoDTO actualizar(Integer id, MedioDePagoDTO dto);
}

