package pe.edu.pucp.salud360.membresia.services;

import pe.edu.pucp.salud360.membresia.dto.SolicitudDTO;

import java.util.List;

public interface SolicitudService {
    List<SolicitudDTO> listarSolicitudes();
    SolicitudDTO obtenerSolicitudPorId(Integer id);
    SolicitudDTO crearSolicitud(SolicitudDTO solicitudDTO);
    SolicitudDTO actualizarSolicitud(Integer id, SolicitudDTO solicitudDTO);
    void eliminarSolicitud(Integer id);
}