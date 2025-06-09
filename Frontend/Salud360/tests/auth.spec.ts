import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Testing para formularios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("Registro", async ({ page }) => {
    const registrarBtn = page.getByRole("link", { name: "Registrate" });
    await expect(registrarBtn).toBeVisible();
    await registrarBtn.click();

    await expect(page.getByRole("heading", { name: "REGISTRO" })).toBeVisible();

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

    const generoOpciones = faker.helpers.arrayElement(["male", "female"]);
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

    const submitBtn = page.getByRole("button", {
      name: "Registrarse",
      exact: true,
    });
    await submitBtn.click();

    await expect(
      page.getByRole("heading", { name: "¡Felicidades!" })
    ).toBeVisible();
  });

  test("Login usuario", async ({ page }) => {
    const loginBtn = page.getByRole("link", { name: /Iniciar Sesi[oó]n/ });
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();

    await expect(
      page.getByRole("heading", { name: "INICIAR SESIÓN" })
    ).toBeVisible();

    const correo = page.locator('[name="correo"]');
    const contrasenia = page.locator('[name="contraseña"]');

    await correo.fill("usuario@hotmail.com");
    await contrasenia.fill("usuario123");

    const submitBtn = page.getByRole("button", {
      name: "Iniciar Sesión",
      exact: true,
    });
    await submitBtn.click();

    await expect(page).toHaveTitle(/Bienvenido/);
  });

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

    const submitBtn = page.getByRole("button", {
      name: "Iniciar Sesión",
      exact: true,
    });
    await submitBtn.click();

    await expect(page).toHaveTitle(/Administración/);
  });
});
