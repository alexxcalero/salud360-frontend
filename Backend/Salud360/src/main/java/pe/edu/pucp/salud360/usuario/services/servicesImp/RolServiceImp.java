package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.RolDTO;
import pe.edu.pucp.salud360.usuario.mappers.PermisoMapper;
import pe.edu.pucp.salud360.usuario.mappers.RolMapper;
import pe.edu.pucp.salud360.usuario.models.Permiso;
import pe.edu.pucp.salud360.usuario.models.Rol;
import pe.edu.pucp.salud360.usuario.repositories.PermisoRepository;
import pe.edu.pucp.salud360.usuario.repositories.RolRepository;
import pe.edu.pucp.salud360.usuario.services.RolService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RolServiceImp implements RolService {
    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PermisoRepository permisoRepository;

    @Override
    public RolDTO crearRol(RolDTO rolDTO) {
        Rol rol = RolMapper.mapToModel(rolDTO);
        rol.setActivo(true);
        rol.setFechaCreacion(LocalDateTime.now());
        rol.setFechaDesactivacion(null);
        Rol rolCreado = rolRepository.save(rol);
        return RolMapper.mapToDTO(rolCreado);
    }

    @Override
    public RolDTO actualizarRol(Integer idRol, RolDTO rolDTO) {
        if(rolRepository.findById(idRol).isPresent()){
            Rol rol = rolRepository.findById(idRol).get();
            rol.setNombre(rolDTO.getNombre());
            rol.setDescripcion(rolDTO.getDescripcion());

            // Limpio la lista de permisos asignados a un rol
            rol.getPermisos().clear();

            // Creo una lista temporal
            List<Permiso> nuevosPermisos = PermisoMapper.mapToModelList(rolDTO.getPermisos());
            if(nuevosPermisos != null)
                rol.getPermisos().addAll(nuevosPermisos);

            Rol rolActualizado = rolRepository.save(rol);
            return RolMapper.mapToDTO(rolActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarRol(Integer idRol) {
        if(rolRepository.findById(idRol).isPresent()) {
            Rol rolEliminar = rolRepository.findById(idRol).get();

            // Desasocio los permisos de un rol que se va a eliminar
            // de esta manera se eliminan los registros de la tabla intermedia
            rolEliminar.getPermisos().clear();

            rolEliminar.setActivo(false);
            rolEliminar.setFechaDesactivacion(LocalDateTime.now());
            rolRepository.save(rolEliminar);
        }
    }

    @Override
    public List<RolDTO> listarRolesTodos() {
        List<Rol> roles = rolRepository.findAll();
        if(!(roles.isEmpty())) {
            return roles.stream().map(RolMapper::mapToDTO).toList();
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public RolDTO buscarRolPorId(Integer idRol) {
        if(rolRepository.findById(idRol).isPresent()) {
            Rol rolBuscado = rolRepository.findById(idRol).get();
            return RolMapper.mapToDTO(rolBuscado);
        } else {
            return null;
        }
    }

    @Override
    public List<RolDTO> listarRolesPorPermisosId(Integer idPermiso) {
        if(permisoRepository.findById(idPermiso).isPresent()) {
            List<Rol> roles = rolRepository.findAllByPermisoId(idPermiso);
            return roles.stream().map(RolMapper::mapToDTO).toList();
        } else {
            return new ArrayList<>();
        }
    }
}
