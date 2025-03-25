package uni.ingsoft.maquinaria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MaquinariaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MaquinariaApplication.class, args);
	}

}
