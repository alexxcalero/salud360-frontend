package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dtos.permisoDTO.PermisoVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolResumenDTO;
import pe.edu.pucp.salud360.usuario.mappers.PermisoMapper;
import pe.edu.pucp.salud360.usuario.mappers.RolMapper;
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
    private PermisoMapper permisoMapper;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private RolMapper rolMapper;

    @Override
    public PermisoVistaAdminDTO crearPermiso(PermisoVistaAdminDTO permisoDTO) {
        Permiso permiso = permisoMapper.mapToModel(permisoDTO);
        permiso.setActivo(true);
        permiso.setFechaCreacion(LocalDateTime.now());
        permiso.setFechaDesactivacion(null);
        Permiso permisoCreado = permisoRepository.save(permiso);
        return permisoMapper.mapToVistaAdminDTO(permisoCreado);
    }

    @Override
    public PermisoVistaAdminDTO actualizarPermiso(Integer idPermiso, PermisoVistaAdminDTO permisoDTO) {
        if(permisoRepository.findById(idPermiso).isPresent()){
            Permiso permiso = permisoRepository.findById(idPermiso).get();
            permiso.setNombre(permisoDTO.getNombre());
            permiso.setDescripcion(permisoDTO.getDescripcion());
            Permiso permisoActualizado = permisoRepository.save(permiso);
            return permisoMapper.mapToVistaAdminDTO(permisoActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarPermiso(Integer idPermiso) {
        if(permisoRepository.findById(idPermiso).isPresent()) {
            Permiso permisoEliminar = permisoRepository.findById(idPermiso).get();

            for(Rol rol : permisoEliminar.getRoles()) {
                rol.getPermisos().remove(permisoEliminar);  // Elimino al permiso de la lista del rol
                rolRepository.save(rol);  // Actualizo la lista de permisos de ese rol
            }

            permisoEliminar.getRoles().clear();  // Limpio la lista de roles asociados al permiso eliminado
            permisoEliminar.setActivo(false);
            permisoEliminar.setFechaDesactivacion(LocalDateTime.now());
            permisoRepository.save(permisoEliminar);
        }
    }

    @Override
    public List<PermisoVistaAdminDTO> listarPermisosTodos() {
        List<Permiso> permisos = permisoRepository.findAll();
        if(!(permisos.isEmpty())) {
            return permisos.stream().map(permisoMapper::mapToVistaAdminDTO).toList();
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public PermisoVistaAdminDTO buscarPermisoPorId(Integer idPermiso) {
        if(permisoRepository.findById(idPermiso).isPresent()) {
            Permiso permisoBuscado = permisoRepository.findById(idPermiso).get();
            return permisoMapper.mapToVistaAdminDTO(permisoBuscado);
        } else {
            return null;
        }
    }

    @Override
    public PermisoVistaAdminDTO editarRoles(Integer idPermiso, List<RolResumenDTO> roles) {
        if(permisoRepository.findById(idPermiso).isPresent()) {
            Permiso permiso = permisoRepository.findById(idPermiso).get();

            permiso.getRoles().clear();
            List<Rol> nuevosRoles = rolMapper.mapToModelList(roles);
            if(nuevosRoles != null) {
                permiso.getRoles().addAll(nuevosRoles);
            }

            Permiso permisoEditado = permisoRepository.save(permiso);
            return permisoMapper.mapToVistaAdminDTO(permisoEditado);
        } else {
            return null;
        }
    }
}
