package uni.ingsoft.maquinaria.utils;

import org.springframework.web.multipart.MultipartFile;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class HandlerArchivos {
	public static String moverArchivoAPublicStorage(MultipartFile archivo, String carpetaDestino, String filename) throws MaquinariaExcepcion {
		if(archivo == null || carpetaDestino == null) {
			return null;
		}

		File dest = new File(carpetaDestino);

		if(!dest.exists()) {
			try {
				dest.mkdirs();
			} catch(Exception e) {
				throw new MaquinariaExcepcion(ErrorCodes.ALGO_SALIO_MAL);
			}
		}

		if(!dest.isDirectory() || !dest.canWrite()) {
			throw new MaquinariaExcepcion(ErrorCodes.ALGO_SALIO_MAL);
		}

		String extension = "";
		try {
			extension = archivo.getOriginalFilename().substring(archivo.getOriginalFilename().lastIndexOf("."));
		} catch(Exception e) {}

		filename += extension;

		Path path = Paths.get(carpetaDestino + File.separator + filename);
		try {
			archivo.transferTo(path);
		} catch (IOException e) {
			throw new MaquinariaExcepcion(ErrorCodes.ALGO_SALIO_MAL);
		}

		return filename;
	}

	public static boolean eliminarArchivo(String source) throws MaquinariaExcepcion {
		if(source == null) {
			return true;
		}

		File archivo = new File(source);

		if(!archivo.isFile() || !archivo.canWrite()) {
			throw new MaquinariaExcepcion(ErrorCodes.ARCHIVO_NO_ENCONTRADO);
		}

		try {
			return archivo.delete();
		} catch(Exception e) {
			return false;
		}
	}
}
