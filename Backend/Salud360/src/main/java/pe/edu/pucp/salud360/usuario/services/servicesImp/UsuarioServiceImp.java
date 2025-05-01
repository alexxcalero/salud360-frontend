package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.mappers.UsuarioMapper;
import pe.edu.pucp.salud360.usuario.models.Usuario;
import pe.edu.pucp.salud360.usuario.repositories.UsuarioRepository;
import pe.edu.pucp.salud360.usuario.services.UsuarioService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImp implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = UsuarioMapper.mapToModel(usuarioDTO);
        usuario.setActivo(true);
        usuario.setFechaCreacion(LocalDateTime.now());
        Usuario usuarioCreado = usuarioRepository.save(usuario);
        return UsuarioMapper.mapToDTO(usuarioCreado);
    }

    @Override
    public UsuarioDTO actualizarUsuario(Integer idUsuario, UsuarioDTO usuarioDTO) {
        if(usuarioRepository.findById(idUsuario).isPresent()){
            Usuario usuario = usuarioRepository.findById(idUsuario).get();
            usuario.setNombres(usuarioDTO.getNombres());
            usuario.setApellidos(usuarioDTO.getApellidos());
            usuario.setNumeroDocumento(usuarioDTO.getNumeroDocumento());
            usuario.setTelefono(usuarioDTO.getTelefono());
            usuario.setFechaNacimiento(usuarioDTO.getFechaNacimiento());
            usuario.setTipoDocumento(usuarioDTO.getTipoDocumento());
            usuario.setRol(usuarioDTO.getRol());
            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            return UsuarioMapper.mapToDTO(usuarioActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarUsuario(Integer idUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
        if(usuario.isPresent()) {
            Usuario usuarioEliminar = usuario.get();
            usuarioEliminar.setActivo(false);  // Es una eliminacion logica
            usuarioEliminar.setFechaDesactivacion(LocalDateTime.now());
            usuarioRepository.save(usuarioEliminar);
        }
    }

    @Override
    public List<UsuarioDTO> listarUsuariosTodos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        if(usuarios.isEmpty()) {
            return null;
        } else {
            return usuarios.stream().map(UsuarioMapper::mapToDTO).toList();
        }
    }

    @Override
    public UsuarioDTO buscarUsuarioPorId(Integer idUsuario) {
        if(usuarioRepository.findById(idUsuario).isPresent()) {
            Usuario usuarioBuscado = usuarioRepository.findById(idUsuario).get();
            return UsuarioMapper.mapToDTO(usuarioBuscado);
        } else {
            return null;
        }
    }
}
