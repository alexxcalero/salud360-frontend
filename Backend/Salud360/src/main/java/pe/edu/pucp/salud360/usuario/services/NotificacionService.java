package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dto.NotificacionDTO;

import java.util.List;

public interface NotificacionService {
    NotificacionDTO crearNotificacion(NotificacionDTO notificacionDTO);
    NotificacionDTO actualizarNotificacion(Integer idNotificacion, NotificacionDTO notificacionDTO);
    void eliminarNotificacion(Integer idNotificacion);
    List<NotificacionDTO> listarNotificacionesTodas();
    NotificacionDTO buscarNotificacionPorId(Integer idNotificacion);
}
