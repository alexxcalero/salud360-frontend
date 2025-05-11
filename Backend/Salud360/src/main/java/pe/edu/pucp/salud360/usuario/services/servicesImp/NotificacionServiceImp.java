package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dtos.NotificacionDTO;
import pe.edu.pucp.salud360.usuario.mappers.NotificacionMapper;
import pe.edu.pucp.salud360.usuario.models.Notificacion;
import pe.edu.pucp.salud360.usuario.repositories.NotificacionRepository;
import pe.edu.pucp.salud360.usuario.services.NotificacionService;

import java.util.List;

@Service
public class NotificacionServiceImp implements NotificacionService {
    @Autowired
    private NotificacionRepository notificacionRepository;

    @Override
    public NotificacionDTO crearNotificacion(NotificacionDTO notificacionDTO) {
        Notificacion notificacion = NotificacionMapper.mapToModel(notificacionDTO);
        Notificacion notificacionCreada = notificacionRepository.save(notificacion);
        return NotificacionMapper.mapToDTO(notificacionCreada);
    }

    @Override
    public NotificacionDTO actualizarNotificacion(Integer idNotificacion, NotificacionDTO notificacionDTO) {
        if(notificacionRepository.findById(idNotificacion).isPresent()){
            Notificacion notificacion = notificacionRepository.findById(idNotificacion).get();
            notificacion.setMensaje(notificacionDTO.getMensaje());
            notificacion.setFecha(notificacionDTO.getFecha());
            notificacion.setTipo(notificacionDTO.getTipo());
            Notificacion notificacionActualizada = notificacionRepository.save(notificacion);
            return NotificacionMapper.mapToDTO(notificacionActualizada);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarNotificacion(Integer idNotificacion) {
        if(notificacionRepository.findById(idNotificacion).isPresent()) {
            notificacionRepository.deleteById(idNotificacion);
        }
    }

    @Override
    public List<NotificacionDTO> listarNotificacionesTodas() {
        List<Notificacion> notificaciones = notificacionRepository.findAll();
        if(notificaciones.isEmpty()) {
            return null;
        } else {
            return notificaciones.stream().map(NotificacionMapper::mapToDTO).toList();
        }
    }

    @Override
    public NotificacionDTO buscarNotificacionPorId(Integer idNotificacion) {
        if(notificacionRepository.findById(idNotificacion).isPresent()) {
            Notificacion notificacion = notificacionRepository.findById(idNotificacion).get();
            return NotificacionMapper.mapToDTO(notificacion);
        } else {
            return null;
        }
    }
}
