package uni.ingsoft.maquinaria.model;

public enum Criticidad {
  ALTA(1),
  MEDIA(2),
  BAJA(3);

  private final int value;

  Criticidad(int value) {
    this.value = value;
  }

  public int getValue() {
    return value;
  }

  public static Criticidad fromValue(int value) {
    for (Criticidad c : Criticidad.values()) {
      if (c.getValue() == value) {
        return c;
      }
    }
    return null;
  }
}
