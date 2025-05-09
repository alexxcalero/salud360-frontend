package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.PermisoDTO;
import pe.edu.pucp.salud360.usuario.mappers.PermisoMapper;
import pe.edu.pucp.salud360.usuario.models.Permiso;
import pe.edu.pucp.salud360.usuario.models.Rol;
import pe.edu.pucp.salud360.usuario.repositories.PermisoRepository;
import pe.edu.pucp.salud360.usuario.repositories.RolRepository;
import pe.edu.pucp.salud360.usuario.services.PermisoService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PermisoServiceImp implements PermisoService {
    @Autowired
    private PermisoRepository permisoRepository;

    @Autowired
    private RolRepository rolRepository;

    @Override
    public PermisoDTO crearPermiso(PermisoDTO permisoDTO) {
        Permiso permiso = PermisoMapper.mapToModel(permisoDTO);
        permiso.setActivo(true);
        permiso.setFechaCreacion(LocalDateTime.now());
        permiso.setFechaDesactivacion(null);
        Permiso permisoCreado = permisoRepository.save(permiso);
        return PermisoMapper.mapToDTO(permisoCreado);
    }

    @Override
    public PermisoDTO actualizarPermiso(Integer idPermiso, PermisoDTO permisoDTO) {
        if(permisoRepository.findById(idPermiso).isPresent()){
            Permiso permiso = permisoRepository.findById(idPermiso).get();
            permiso.setNombre(permisoDTO.getNombre());
            permiso.setDescripcion(permisoDTO.getDescripcion());
            Permiso permisoActualizado = permisoRepository.save(permiso);
            return PermisoMapper.mapToDTO(permisoActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarPermiso(Integer idPermiso) {
        if(permisoRepository.findById(idPermiso).isPresent()) {
            Permiso permisoEliminar = permisoRepository.findById(idPermiso).get();

            // Busco los roles que contengan al permiso que voy a eliminar
            List<Rol> rolesConPermiso = rolRepository.findAllByPermisoId(idPermiso);

            for(Rol rol : rolesConPermiso) {
                rol.getPermisos().remove(permisoEliminar);  // Elimino al permiso de la lista del rol
                rolRepository.save(rol);  // Actualizo la lista de permisos de ese rol
            }

            permisoEliminar.setActivo(false);
            permisoEliminar.setFechaDesactivacion(LocalDateTime.now());
            permisoRepository.save(permisoEliminar);
        }
    }

    @Override
    public List<PermisoDTO> listarPermisosTodos() {
        List<Permiso> permisos = permisoRepository.findAll();
        if(!(permisos.isEmpty())) {
            return permisos.stream().map(PermisoMapper::mapToDTO).toList();
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public PermisoDTO buscarPermisoPorId(Integer idPermiso) {
        if(permisoRepository.findById(idPermiso).isPresent()) {
            Permiso permisoBuscado = permisoRepository.findById(idPermiso).get();
            return PermisoMapper.mapToDTO(permisoBuscado);
        } else {
            return null;
        }
    }
}
