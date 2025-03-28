package uni.ingsoft.maquinaria.utils;

import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class HandlerArchivos {
	public static String moverArchivoAPublicStorage(String source, String carpetaDestino, String filename) throws MaquinariaExcepcion {
		if(source == null || carpetaDestino == null) {
			return null;
		}

		File archivo = new File(source);
		File dest = new File(carpetaDestino);

		if(!archivo.isFile() || !archivo.canRead()) {
			throw new MaquinariaExcepcion(ErrorCodes.ARCHIVO_NO_ENCONTRADO);
		}

		if(!dest.exists()) {
			try {
				dest.mkdir();
			} catch(Exception e) {
				throw new MaquinariaExcepcion(ErrorCodes.ALGO_SALIO_MAL);
			}
		}

		if(!dest.isDirectory() || !dest.canWrite()) {
			throw new MaquinariaExcepcion(ErrorCodes.ALGO_SALIO_MAL);
		}

		String extension = archivo.getName().substring(archivo.getName().lastIndexOf("."));
		File archivoEnDestino = new File(carpetaDestino, filename + extension);

		try {
			Files.copy(archivo.getCanonicalFile().toPath(), archivoEnDestino.getCanonicalFile().toPath(), StandardCopyOption.COPY_ATTRIBUTES, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw new MaquinariaExcepcion(ErrorCodes.ALGO_SALIO_MAL);
		}

		return archivoEnDestino.getName();
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
