package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.NotificacionDTO;
import pe.edu.pucp.salud360.usuario.repositories.NotificacionRepository;
import pe.edu.pucp.salud360.usuario.services.NotificacionService;

import java.util.List;

@Service
public class NotificacionServiceImp implements NotificacionService {
    @Autowired
    private NotificacionRepository notificacionRepository;

    @Override
    public NotificacionDTO crearNotificacion(NotificacionDTO notificacionDTO) {
        return null;
    }

    @Override
    public NotificacionDTO actualizarNotificacion(Integer idNotificacion, NotificacionDTO notificacionDTO) {
        return null;
    }

    @Override
    public void eliminarNotificacion(Integer idNotificacion) {

    }

    @Override
    public List<NotificacionDTO> listarNotificacionesTodas() {
        return List.of();
    }

    @Override
    public NotificacionDTO buscarNotificacionPorId(Integer idNotificacion) {
        return null;
    }
}
