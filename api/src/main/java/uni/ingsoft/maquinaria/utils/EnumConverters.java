package uni.ingsoft.maquinaria.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import uni.ingsoft.maquinaria.model.EstadoTarea;

@Configuration
public class EnumConverters implements WebMvcConfigurer {
  @Override
  public void addFormatters(FormatterRegistry registry) {
    registry.addConverter(new ConvertirTipoMaquina());
  }

  private static class ConvertirTipoMaquina implements Converter<String, EstadoTarea> {
    @Override
    public EstadoTarea convert(String source) {
      return EstadoTarea.valueOf(source.toUpperCase());
    }
  }
}
