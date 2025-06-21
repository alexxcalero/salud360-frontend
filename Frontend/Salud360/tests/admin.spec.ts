import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Comunidades", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/IniciarSesionUsuario");
    await page.locator('input[name="correo"]').fill("fabianmr2806@hotmail.com");
    await page.locator('input[name="contraseña"]').fill("admin123");
    await page
      .getByRole("button", { name: "Iniciar Sesión", exact: true })
      .click();
    await expect(page).toHaveTitle("Administración");
  });
  test("Crear comunidad", async ({ page }) => {
    const title = faker.commerce.productName();
    await page.getByText("Comunidades").click();
    await expect(page).toHaveURL(/.*\/comunidades/);
    await page.getByRole("button", { name: "Agregar comunidad" }).click();
    await expect(page).toHaveURL(/.*\/crear/);
    await page.getByRole("textbox").first().click();
    await page.getByRole("textbox").first().fill(title);
    await page.getByRole("textbox").nth(1).click();
    await page
      .getByRole("textbox")
      .nth(1)
      .fill("Descripcion: Somos una comunidad");
    await page.getByRole("textbox").nth(2).click();
    await page.getByRole("textbox").nth(2).fill("Proposito: Ganar dinero");
    await page.getByRole("checkbox", { name: "Terapia Psicológica" }).check();
    await page
      .getByRole("checkbox", { name: "Consulta Médica General" })
      .check();
    await page
      .getByRole("checkbox", { name: "Consulta Médica General" })
      .uncheck();
    await page
      .getByRole("checkbox", { name: "Estiramiento y Movilidad" })
      .check();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("textbox").nth(3).click();
    await page.getByRole("textbox").nth(3).fill("Mensual");
    await page.getByRole("textbox").nth(3).dblclick();
    await page.getByRole("textbox").nth(3).fill("VIP Mensual");
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").press("ArrowLeft");
    await page.getByRole("spinbutton").fill("40");
    await page.getByRole("spinbutton").press("ArrowRight");
    await page.getByRole("textbox").nth(4).click();
    await page.getByRole("textbox").nth(4).fill("Es una membresia");
    await page.getByText("Registro ComunidadComplete").click();
    // await page
    //   .locator("input[name'imagen-comunidad']")
    //   .setInputFiles(
    //     "https://preview.redd.it/tener-una-imagen-random-hace-que-la-publicaci%C3%B3n-tenga-m%C3%A1s-v0-6frn21rqrtoc1.jpeg?width=640&crop=smart&auto=webp&s=e109a6ff409c369a7be16d3b7d8c885fa69c8abf"
    //   );
    await page.getByRole("button", { name: "Crear comunidad" }).click();
    await expect(page).toHaveTitle("Comunidad creada exitosamente");
    await page.getByRole("button", { name: "Aceptar" }).click();
    await expect(page).toHaveURL(/.+\/admin\/comunidades/);

    await page.getByRole("button", { name: "Cerrar sesión" }).click();

    await expect(page).toHaveTitle("Salud 360");
    await page.getByRole("button", { name: "Iniciar Sesion" }).click();
    await page.locator('input[name="correo"]').click();
    await page.locator('input[name="correo"]').fill("usuario@hotmail.com");
    await page.locator('input[name="correo"]').press("Tab");
    await page.locator('input[name="contraseña"]').fill("usuario123");
    await page
      .getByRole("button", { name: "Iniciar Sesión", exact: true })
      .click();
    await expect(page).toHaveTitle("Bienvenido");
    await page.getByRole("link", { name: "Comunidades" }).click();
    await expect(page).toHaveTitle("Mis comunidades");
    await page.getByRole("button", { name: "Explorar Más" }).click();
    await expect(page).toHaveTitle("Explorar comunidades");
    await page.getByLabel(`card-${title}`).getByRole("link").click();
    await expect(page).toHaveTitle(`Detalle de la comunidad ${title}`);
  });
});

test.describe("Servicios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/IniciarSesionUsuario");
    await page.locator('input[name="correo"]').fill("fabianmr2806@hotmail.com");
    await page.locator('input[name="contraseña"]').fill("admin123");
    await page
      .getByRole("button", { name: "Iniciar Sesión", exact: true })
      .click();
    await expect(page).toHaveTitle("Administración");
  });

  test("Crear servicio", async ({ page }) => {
    await page.getByText("Servicios").click();
    await page.getByRole("button", { name: "Agregar servicio" }).click();
    await expect(page).toHaveURL(/.*\/crear/);
    await page.getByRole("textbox", { name: "Ingrese el nombre" }).click();
    await page
      .getByRole("textbox", { name: "Ingrese el nombre" })
      .fill(faker.animal.petName());
    await page.getByRole("textbox", { name: "Ingrese el nombre" }).press("Tab");
    await page
      .getByRole("textbox", { name: "Ingrese la descripción" })
      .fill(faker.animal.petName());
    await page
      .getByRole("textbox", { name: "Ingrese la descripción" })
      .press("Tab");
    await page
      .getByRole("textbox", { name: "Ingrese el tipo de servicio" })
      .fill(faker.animal.petName());
    await page.getByRole("button", { name: "Crear Servicio" }).click();
    await expect(page).toHaveURL(/.*admin\/servicios\/successCrear/);
  });
});

test.describe("Locales", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/IniciarSesionUsuario");
    await page.locator('input[name="correo"]').fill("fabianmr2806@hotmail.com");
    await page.locator('input[name="contraseña"]').fill("admin123");
    await page
      .getByRole("button", { name: "Iniciar Sesión", exact: true })
      .click();
    await expect(page).toHaveTitle("Administración");
  });

  test("Locales", async ({ page }) => {
    await page.getByText("Locales").click();
    await page.getByRole("button", { name: "Agregar local" }).click();
    await expect(page).toHaveURL(/.*\/crear/);
    await page.getByRole("textbox", { name: "Ingrese el nombre" }).click();
    await page
      .getByRole("textbox", { name: "Ingrese el nombre" })
      .fill(faker.location.city());
    await page.getByRole("textbox", { name: "Ingrese el nombre" }).press("Tab");
    await page
      .getByRole("textbox", { name: "Ingrese el telefono" })
      .fill("946960334");
    await page
      .getByRole("textbox", { name: "Ingrese el telefono" })
      .press("Tab");
    await page
      .getByRole("textbox", { name: "Ingrese la dirección" })
      .fill(faker.location.direction());
    await page
      .getByRole("textbox", { name: "Ingrese la dirección" })
      .press("Tab");
    await page
      .getByRole("textbox", { name: "Ingrese el tipo de servicio" })
      .fill("local");
    await page.getByRole("textbox", { name: "Ingrese la descripción" }).click();
    await page
      .getByRole("textbox", { name: "Ingrese la descripción" })
      .fill("Una descripción");
    await page.getByText("Terapia Psicológica").click();
    await page.getByRole("button", { name: "Crear Local" }).click();
    await expect(page).toHaveURL(/.*admin\/locales\/successCrear/);
  });
});
