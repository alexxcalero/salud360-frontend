package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dtos.NotificacionDTO;
import pe.edu.pucp.salud360.usuario.models.Notificacion;

public class NotificacionMapper {
    public static NotificacionDTO mapToDTO(Notificacion notificacion) {
        if(notificacion == null)
            return null;

        return new NotificacionDTO(notificacion.getIdNotificacion(), notificacion.getMensaje(), notificacion.getFecha(),
                                   notificacion.getTipo(), notificacion.getUsuario(), notificacion.getReserva());
    }

    public static Notificacion mapToModel(NotificacionDTO notificacionDTO) {
        if(notificacionDTO == null)
            return null;

        return new Notificacion(notificacionDTO.getIdNotificacion(), notificacionDTO.getMensaje(), notificacionDTO.getFecha(),
                                notificacionDTO.getTipo(), notificacionDTO.getUsuario(), notificacionDTO.getReserva());
    }
}
