import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Testing para formularios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("Registro", async ({ page }) => {
    const registrarBtn = page.getByRole("link", { name: "Registrate" });
    await expect(registrarBtn).toBeVisible();
    registrarBtn.click();

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

    await nombresInput.fill(faker.person.firstName("female"));
    await apellidosInput.fill(faker.person.lastName("female"));
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
    await genero.selectOption({ label: "Femenino" });
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

    await expect(nombresInput).toBeVisible();
    await expect(apellidosInput).toBeVisible();
    await expect(fechaNacimiento).toBeVisible();
    await expect(tipoDocumento).toBeVisible();
    await expect(numeroDocumento).toBeVisible();
    await expect(genero).toBeVisible();
    await expect(telefono).toBeVisible();
    await expect(lugarResidencia).toBeVisible();
    await expect(correo).toBeVisible();
    await expect(contrasenia).toBeVisible();
    await expect(confirmarContrasenia).toBeVisible();

    const submitBtn = page.getByRole("button", {
      name: "Registrarse",
      exact: true,
    });
    await submitBtn.click();

    await expect(
      page.getByRole("heading", { name: "¡Felicidades!" })
    ).toBeVisible();
  });
});
