package uni.progweb.porkycakes;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import uni.ingsoft.maquinaria.MaquinariaApplication;

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.MOCK,
    classes = MaquinariaApplication.class)
class AlavTests {
  @Test
  void contextLoads() {}
}
