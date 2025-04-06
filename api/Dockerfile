FROM openjdk:17-alpine

RUN apk add gradle

WORKDIR /app

COPY build.gradle settings.gradle gradlew /app/
COPY gradle /app/gradle
RUN ./gradlew --version

COPY . /app/
RUN ./gradlew clean build

EXPOSE 8080
CMD ["java", "-jar", "/app/build/libs/maquinaria-0.0.1-SNAPSHOT.jar"]
