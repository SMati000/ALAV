package uni.ingsoft.maquinaria.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import uni.ingsoft.maquinaria.model.Maquina;
import uni.ingsoft.maquinaria.model.mapper.MaquinaMapper;
import uni.ingsoft.maquinaria.model.request.MaquinaReqDto;
import uni.ingsoft.maquinaria.repository.MaquinaRepo;
import uni.ingsoft.maquinaria.utils.HandlerArchivos;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Validated
@RestController
@RequestMapping("/maquinas")
@CrossOrigin(origins = "*")
public class MaquinaController {
	@Autowired MaquinaRepo maquinaRepo;
	@Autowired MaquinaMapper maquinaMapper;
	@Value("${alav.public-storage.imagenes}") String imagenesStorage;
	@Value("${alav.public-url.imagenes}") String imagenesUrl;

	@PostMapping
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public Maquina crearMaquinas(
			@RequestPart(value = "maquina") @Valid MaquinaReqDto MaquinasDto,
			@RequestPart(value = "imagen", required = false) MultipartFile imagen) throws MaquinariaExcepcion {
		if(MaquinasDto == null) {
			throw new MaquinariaExcepcion(ErrorCodes.MAQUINAS_VACIAS);
		}

		if(MaquinasDto.getModelo() == null || MaquinasDto.getModelo().isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.MODELO_NULO);
		}

		Maquina maquina = maquinaMapper.fromRequestDto(MaquinasDto);

		if(imagen != null) {
			String filename = HandlerArchivos.moverArchivoAPublicStorage(imagen, imagenesStorage, MaquinasDto.getNroSerie());
			maquina.setImagenDirec(imagenesUrl + filename);
		}

		maquinaRepo.save(maquina);

		return maquina;
	}

	@GetMapping("/{mid}")
	@ResponseBody
	public Maquina getMaquina(@PathVariable Integer mid) throws MaquinariaExcepcion {
		Optional<Maquina> opMaquina = maquinaRepo.findById(mid);

		if(opMaquina.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.MAQUINA_NO_ENCONTRADA);
		}

		return opMaquina.get();
	}

	@GetMapping
	@ResponseBody
	public List<Maquina> getMaquinas(
//		@RequestParam(name = "nombre", required = false) String nombre,
//		@RequestParam(name = "tipo", required = false) TipoMaquina tipo
	) throws MaquinariaExcepcion {
		List<Maquina> maquinas = new ArrayList<>();
		boolean noFilters = true;

//		if(nombre != null && !nombre.isEmpty()) {
//			noFilters = false;
//			maquinas = maquinaRepo.searchByName(nombre);
//		}

		if(noFilters) {
			maquinaRepo.findAll().forEach(maquinas::add);
		}

		return maquinas;
	}

	@PatchMapping("/{mid}")
	@ResponseBody
	public Maquina actualizarMaquina(@PathVariable Integer mid,
									 @RequestPart(value = "maquina", required = false) @Valid MaquinaReqDto maquinaReqDto,
									 @RequestPart(value = "imagen", required = false) MultipartFile imagen)
			throws MaquinariaExcepcion {
		Optional<Maquina> opMaquina = maquinaRepo.findById(mid);

		if(opMaquina.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.MAQUINA_NO_ENCONTRADA);
		}

		Maquina maquina = opMaquina.get();
		maquinaMapper.fromUpdateReqDTO(maquinaReqDto, maquina);

		if(imagen != null) {
			String filename = HandlerArchivos.moverArchivoAPublicStorage(imagen, imagenesStorage, maquina.getNroSerie());
			maquina.setImagenDirec(imagenesUrl + filename);
		}

		maquina = maquinaRepo.save(maquina);
		return maquina;
	}

	@DeleteMapping("/{mid}")
	@ResponseBody
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteMaquina(@PathVariable Integer mid) throws MaquinariaExcepcion {
		Optional<Maquina> opMaquina = maquinaRepo.findById(mid);

		if(opMaquina.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.MAQUINA_NO_ENCONTRADA);
		}

		HandlerArchivos.eliminarArchivo(new File(imagenesStorage, new File(opMaquina.get().getImagenDirec()).getName()).getPath());
		maquinaRepo.deleteById(mid);
	}
}
