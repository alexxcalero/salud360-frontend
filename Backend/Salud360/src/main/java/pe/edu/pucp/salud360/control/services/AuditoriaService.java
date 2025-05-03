package pe.edu.pucp.salud360.control.services;

import pe.edu.pucp.salud360.control.dto.AuditoriaDTO;

import java.util.List;

public interface AuditoriaService {
    List<AuditoriaDTO> listarAuditorias();
    AuditoriaDTO crearAuditoria(AuditoriaDTO auditoriaDTO);
    AuditoriaDTO obtenerAuditoriaPorId(Integer id);
    boolean eliminarAuditoria(Integer id);
    AuditoriaDTO buscarAuditoriaPorId(Integer id);
    AuditoriaDTO actualizarAuditoria(Integer id, AuditoriaDTO auditoriaDTO);
}

