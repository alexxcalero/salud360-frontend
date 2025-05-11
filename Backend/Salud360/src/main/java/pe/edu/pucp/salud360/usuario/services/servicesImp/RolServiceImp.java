package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.mappers.PermisoMapper;
import pe.edu.pucp.salud360.usuario.mappers.RolMapper;
import pe.edu.pucp.salud360.usuario.models.Permiso;
import pe.edu.pucp.salud360.usuario.models.Rol;
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
    private RolMapper rolMapper;

    @Autowired
    private PermisoMapper permisoMapper;

    @Override
    public RolVistaAdminDTO crearRol(RolVistaAdminDTO rolDTO) {
        Rol rol = rolMapper.mapToModel(rolDTO);
        rol.setActivo(true);
        rol.setFechaCreacion(LocalDateTime.now());
        rol.setFechaDesactivacion(null);
        Rol rolCreado = rolRepository.save(rol);
        return rolMapper.mapToVistaAdminDTO(rolCreado);
    }

    @Override
    public RolVistaAdminDTO actualizarRol(Integer idRol, RolVistaAdminDTO rolDTO) {
        if(rolRepository.findById(idRol).isPresent()) {
            Rol rol = rolRepository.findById(idRol).get();
            rol.setNombre(rolDTO.getNombre());
            rol.setDescripcion(rolDTO.getDescripcion());

            rol.getUsuarios().clear();



            // Limpio la lista de permisos asignados a un rol
            rol.getPermisos().clear();

            // Creo una lista temporal
            List<Permiso> nuevosPermisos = permisoMapper.mapToModelList(rolDTO.getPermisos());
            if(nuevosPermisos != null)
                rol.getPermisos().addAll(nuevosPermisos);

            Rol rolActualizado = rolRepository.save(rol);
            return rolMapper.mapToVistaAdminDTO(rolActualizado);
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
    public List<RolVistaAdminDTO> listarRolesTodos() {
        List<Rol> roles = rolRepository.findAll();
        if(!(roles.isEmpty())) {
            return roles.stream().map(rolMapper::mapToVistaAdminDTO).toList();
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public RolVistaAdminDTO buscarRolPorId(Integer idRol) {
        if(rolRepository.findById(idRol).isPresent()) {
            Rol rolBuscado = rolRepository.findById(idRol).get();
            return rolMapper.mapToVistaAdminDTO(rolBuscado);
        } else {
            return null;
        }
    }
}
