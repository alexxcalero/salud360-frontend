package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.RolDTO;
import pe.edu.pucp.salud360.usuario.mappers.RolMapper;
import pe.edu.pucp.salud360.usuario.models.Rol;
import pe.edu.pucp.salud360.usuario.repositories.RolRepository;
import pe.edu.pucp.salud360.usuario.services.RolService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RolServiceImp implements RolService {
    @Autowired
    private RolRepository rolRepository;

    @Override
    public RolDTO crearRol(RolDTO rolDTO) {
        Rol rol = RolMapper.mapToModel(rolDTO);
        rol.setActivo(true);
        rol.setFechaCreacion(LocalDateTime.now());
        Rol rolCreado = rolRepository.save(rol);
        return RolMapper.mapToDTO(rolCreado);
    }

    @Override
    public RolDTO actualizarRol(Integer idRol, RolDTO rolDTO) {
        if(rolRepository.findById(idRol).isPresent()){
            Rol rol = rolRepository.findById(idRol).get();
            rol.setNombre(rolDTO.getNombre());
            rol.setDescripcion(rolDTO.getDescripcion());
            rol.setUsuarios(rolDTO.getUsuarios());
            rol.setPermisos(rolDTO.getPermisos());
            Rol rolActualizado = rolRepository.save(rol);
            return RolMapper.mapToDTO(rolActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarRol(Integer idRol) {
        Optional<Rol> rol = rolRepository.findById(idRol);
        if (rol.isPresent()) {
            Rol rolEliminar = rol.get();
            rolEliminar.setActivo(false);
            rolEliminar.setFechaDesactivacion(LocalDateTime.now());
            rolRepository.save(rolEliminar);
        }
    }

    @Override
    public List<RolDTO> listarRolesTodos() {
        List<Rol> roles = rolRepository.findAll();
        if (roles.isEmpty()) {
            return null;
        } else {
            return roles.stream().map(RolMapper::mapToDTO).toList();
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
}
