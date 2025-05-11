package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dtos.usuarioDTO.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.mappers.UsuarioMapper;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;
import pe.edu.pucp.salud360.usuario.models.Usuario;
import pe.edu.pucp.salud360.usuario.repositories.TipoDocumentoRepository;
import pe.edu.pucp.salud360.usuario.repositories.UsuarioRepository;
import pe.edu.pucp.salud360.usuario.services.UsuarioService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioServiceImp implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = UsuarioMapper.mapToModel(usuarioDTO);

        // Cifro la contrasenha antes de guardarla en BD
        String contrasenhaCifrada = passwordEncoder.encode(usuario.getContrasenha());
        usuario.setContrasenha(contrasenhaCifrada);

        usuario.setActivo(true);
        usuario.setFechaCreacion(LocalDateTime.now());
        usuario.setFechaDesactivacion(null);
        Usuario usuarioCreado = usuarioRepository.save(usuario);
        return UsuarioMapper.mapToDTO(usuarioCreado);
    }

    @Override
    public UsuarioDTO actualizarUsuario(Integer idUsuario, UsuarioDTO usuarioDTO) {
        if(usuarioRepository.findById(idUsuario).isPresent()){
            Usuario usuario = usuarioRepository.findById(idUsuario).get();
            usuario.setNombres(usuarioDTO.getNombres());
            usuario.setApellidos(usuarioDTO.getApellidos());
            usuario.setCorreo(usuarioDTO.getCorreo());
            usuario.setTelefono(usuarioDTO.getTelefono());
            usuario.setSexo(usuarioDTO.getSexo());
            usuario.setFechaNacimiento(usuarioDTO.getFechaNacimiento());
            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            return UsuarioMapper.mapToDTO(usuarioActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarUsuario(Integer idUsuario) {
        if(usuarioRepository.findById(idUsuario).isPresent()) {
            Usuario usuarioEliminar = usuarioRepository.findById(idUsuario).get();
            usuarioEliminar.setActivo(false);
            usuarioEliminar.setFechaDesactivacion(LocalDateTime.now());
            usuarioRepository.save(usuarioEliminar);
        }
    }

    @Override
    public List<UsuarioDTO> listarUsuariosTodos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        if(!(usuarios.isEmpty())) {
            return usuarios.stream().map(UsuarioMapper::mapToDTO).toList();
        } else {
            return new ArrayList<>();
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

    @Override
    public UsuarioDTO actualizarNumeroDocumento(Integer idUsuario, Integer idTipoDocumento, String numeroDocumento) {
        if(usuarioRepository.findById(idUsuario).isPresent()){
            Usuario usuario = usuarioRepository.findById(idUsuario).get();

            if(tipoDocumentoRepository.findById(idTipoDocumento).isPresent()){
                TipoDocumento tipoDocumento = tipoDocumentoRepository.findById(idTipoDocumento).get();
                usuario.setTipoDocumento(tipoDocumento);
            }

            usuario.setNumeroDocumento(numeroDocumento);
            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            return UsuarioMapper.mapToDTO(usuarioActualizado);
        } else {
            return null;
        }
    }

    @Override
    public UsuarioDTO actualizarFotoPerfil(Integer idUsuario, String fotoPerfil) {
        if(usuarioRepository.findById(idUsuario).isPresent()){
            Usuario usuario = usuarioRepository.findById(idUsuario).get();
            usuario.setFotoPerfil(fotoPerfil);
            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            return UsuarioMapper.mapToDTO(usuarioActualizado);
        } else {
            return null;
        }
    }

    @Override
    public UsuarioDTO actualizarContrasenha(Integer idUsuario, String contrasenhaNueva) {
        if(usuarioRepository.findById(idUsuario).isPresent()){
            Usuario usuario = usuarioRepository.findById(idUsuario).get();
            String contrasenhaCifrada = passwordEncoder.encode(contrasenhaNueva);
            usuario.setContrasenha(contrasenhaCifrada);
            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            return UsuarioMapper.mapToDTO(usuarioActualizado);
        } else {
            return null;
        }
    }

    @Override
    public UsuarioDTO buscarUsuarioPorCorreo(String correo) {
        if(usuarioRepository.findByCorreo(correo).isPresent()) {
            Usuario usuarioBuscado = usuarioRepository.findByCorreo(correo).get();
            return UsuarioMapper.mapToDTO(usuarioBuscado);
        } else {
            return null;
        }
    }
}
