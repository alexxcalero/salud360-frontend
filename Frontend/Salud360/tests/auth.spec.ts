import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

/**
 * Guía primaria en `./landing.spec.ts`
 */
test.describe("Testing para formularios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("Registro", async ({ page }) => {
    const registrarBtn = page.getByRole("link", { name: "Registrate" });
    await expect(registrarBtn).toBeVisible();
    // Se hace click en el botón de registrar
    await registrarBtn.click();

    // Se verifica que exista el título h1 de registro
    await expect(page.getByRole("heading", { name: "REGISTRO" })).toBeVisible();

    // Se declaran variables para manejar el formulario
    const nombresInput = page.locator('[name="nombres"]');
    const apellidosInput = page.locator('[name="apellidos"]');
    const fechaNacimiento = page.locator('[name="fechaNacimiento"]');
    const tipoDocumento = page.locator('[name="tipoDocumento"]');
    const numeroDocumento = page.locator('[name="numeroDocumento"]');
    const genero = page.locator('[name="genero"]');
    const telefono = page.locator('[name="telefono"]');
    const lugarResidencia = page.locator('[name="lugarResidencia"]');
    const correo = page.locator('[name="correo"]');
    const confirmarCorreo = page.locator('[name="confirmarCorreo"]');
    const contrasenia = page.locator('[name="contraseña"]');
    const confirmarContrasenia = page.locator('[name="confirmarContraseña"]');

    // Se crea data falsa con faker.js (módulo aparte de playwright)
    const generoOpciones = faker.helpers.arrayElement(["male", "female"]);

    // Se escribe data falsa en los inputs
    // Y como son acciones, se tiene que esperar a que acabe con await
    // Es muy importante await aquí pq no usarlo, haría que se escriba el texto en otro input
    // Por desincronización
    await nombresInput.fill(faker.person.firstName(generoOpciones));
    await apellidosInput.fill(faker.person.lastName(generoOpciones));
    await fechaNacimiento.fill(
      faker.date
        .birthdate({ min: 18, max: 65, mode: "age" })
        .toISOString()
        .split("T")[0]
    );
    await tipoDocumento.selectOption({ label: "DNI" });
    await numeroDocumento.fill(
      faker.number.int({ min: 10000000, max: 99999999 }).toString()
    );
    await genero.click();
    await expect(genero).toBeVisible();
    await genero.selectOption({
      label: generoOpciones === "male" ? "Masculino" : "Femenino",
    });
    await telefono.fill(
      faker.number.int({ min: 100000000, max: 999999999 }).toString()
    );
    await lugarResidencia.fill("Av. Perú 669");
    const correoFakeData = faker.internet.email();
    await correo.fill(correoFakeData);
    await confirmarCorreo.fill(correoFakeData);
    const contraFakeData = faker.internet.password();
    await contrasenia.fill(contraFakeData);
    await confirmarContrasenia.fill(contraFakeData);

    // Permite tomar screenshots dentro de los resultados
    // Reescribe un screenshot si tiene el mismo nombre
    await page.screenshot({
      path: "test-image-results/registro.jpg", // Se guarda desde la carpeta src/,
      // pero especifiquen siempre que se guarde en test-image-results, pq no lo considerara git por .gitignore
      fullPage: true, // fullPage toma captura de toda la pantalla, pero puede tener problemas con el elemento sticky,
      // ya que playwright tmb scrollea
    });

    // Se clickea en el botón de registrar (No con google)
    const submitBtn = page.getByRole("button", {
      name: "Registrarse",
      exact: true,
    });
    await submitBtn.click();

    // Y se espera que uno se encuentre en la ventana de felicidades por el registro
    await expect(
      page.getByRole("heading", { name: "¡Felicidades!" })
    ).toBeVisible();
  });

  test("Login usuario", async ({ page }) => {
    // Se hace click en el botón de inciar sesión
    // Se obtiene el iniciar sesión por regexp
    const loginBtn = page.getByRole("link", { name: /Iniciar Sesi[oó]n/ });
    await expect(loginBtn).toBeVisible(); // Esto no es obligatorio siempre, solo es mi manía
    await loginBtn.click();

    // Se espera estar en la página correcta. También se puede usar
    // > await expect(page).toHaveTitle(...)
    await expect(
      page.getByRole("heading", { name: "INICIAR SESIÓN" })
    ).toBeVisible();

    // Declara y rellena los inputs de formulario
    const correo = page.locator('[name="correo"]');
    const contrasenia = page.locator('[name="contraseña"]');

    await correo.fill("usuario@hotmail.com");
    await contrasenia.fill("usuario123");

    await page.screenshot({
      path: "test-image-results/login_usuario.jpg",
      fullPage: true,
    });

    // Hace click en iniciar sesión
    const submitBtn = page.getByRole("button", {
      name: "Iniciar Sesión",
      exact: true,
    });
    await submitBtn.click();

    // Se espera que la bienvenida tenga el nombre del usuario
    await expect(page).toHaveTitle(/Bienvenido/);
  });

  // Lo mismo que el anterior, pero para admin
  test("Login admin", async ({ page }) => {
    const loginBtn = page.getByRole("link", { name: /Iniciar Sesi[oó]n/ });
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();

    await expect(
      page.getByRole("heading", { name: "INICIAR SESIÓN" })
    ).toBeVisible();

    const correo = page.locator('[name="correo"]');
    const contrasenia = page.locator('[name="contraseña"]');

    await correo.fill("fabianmr2806@hotmail.com");
    await contrasenia.fill("admin123");

    await page.screenshot({
      path: "test-image-results/login_admin.jpg",
      fullPage: true,
    });

    const submitBtn = page.getByRole("button", {
      name: "Iniciar Sesión",
      exact: true,
    });
    await submitBtn.click();

    await expect(page).toHaveTitle(/Administración/);
  });
});
