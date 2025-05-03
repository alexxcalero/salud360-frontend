package pe.edu.pucp.salud360.comunidad.services;

import pe.edu.pucp.salud360.comunidad.dto.TestimonioDTO;

import java.util.List;

public interface TestimonioService {
    TestimonioDTO crearTestimonio(TestimonioDTO dto);
    TestimonioDTO actualizarTestimonio(Integer id, TestimonioDTO dto);
    boolean eliminarTestimonio(Integer id);
    List<TestimonioDTO> listarTestimonios();
    TestimonioDTO obtenerTestimonioPorId(Integer id);
}
