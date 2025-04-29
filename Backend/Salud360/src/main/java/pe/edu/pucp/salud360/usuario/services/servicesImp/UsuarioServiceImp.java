package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.repositories.UsuarioRepository;
import pe.edu.pucp.salud360.usuario.services.UsuarioService;

import java.util.List;

@Service
public class UsuarioServiceImp implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO) {
        return null;
    }

    @Override
    public UsuarioDTO actualizarUsuario(Integer idUsuario, UsuarioDTO usuarioDTO) {
        return null;
    }

    @Override
    public void eliminarUsuario(Integer idUsuario) {

    }

    @Override
    public List<UsuarioDTO> listarUsuariosTodos() {
        return List.of();
    }

    @Override
    public UsuarioDTO buscarUsuarioPorId(Integer idUsuario) {
        return null;
    }
}
