package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.PermisoDTO;
import pe.edu.pucp.salud360.usuario.mappers.PermisoMapper;
import pe.edu.pucp.salud360.usuario.models.Permiso;
import pe.edu.pucp.salud360.usuario.repositories.PermisoRepository;
import pe.edu.pucp.salud360.usuario.services.PermisoService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PermisoServiceImp implements PermisoService {
    @Autowired
    private PermisoRepository permisoRepository;

    @Override
    public PermisoDTO crearPermiso(PermisoDTO permisoDTO) {
        Permiso permiso = PermisoMapper.mapToModel(permisoDTO);
        permiso.setActivo(true);
        permiso.setFechaCreacion(LocalDateTime.now());
        Permiso permisoCreado = permisoRepository.save(permiso);
        return PermisoMapper.mapToDTO(permisoCreado);
    }

    @Override
    public PermisoDTO actualizarPermiso(Integer idPermiso, PermisoDTO permisoDTO) {
        if(permisoRepository.findById(idPermiso).isPresent()){
            Permiso permiso = permisoRepository.findById(idPermiso).get();
            permiso.setNombre(permisoDTO.getNombre());
            permiso.setDescripcion(permisoDTO.getDescripcion());
            permiso.setRoles(permisoDTO.getRoles());
            Permiso permisoActualizado = permisoRepository.save(permiso);
            return PermisoMapper.mapToDTO(permisoActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarPermiso(Integer idPermiso) {
        Optional<Permiso> permiso = permisoRepository.findById(idPermiso);
        if(permiso.isPresent()) {
            Permiso permisoEliminar = permiso.get();
            permisoEliminar.setActivo(false);
            permisoEliminar.setFechaDesactivacion(LocalDateTime.now());
            permisoRepository.save(permisoEliminar);
        }
    }

    @Override
    public List<PermisoDTO> listarPermisosTodos() {
        List<Permiso> permisos = permisoRepository.findAll();
        if(permisos.isEmpty()) {
            return null;
        } else {
            return permisos.stream().map(PermisoMapper::mapToDTO).toList();
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
