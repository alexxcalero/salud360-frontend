import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Testing de crear comunidad", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Iniciar Sesion" }).click();
  await page.locator('input[name="correo"]').click();
  await page.locator('input[name="correo"]').fill("fabianmr2806@hotmail.com");
  await page.locator('input[name="contraseña"]').click();
  await page.locator('input[name="contraseña"]').fill("admin123");
  await page
    .getByRole("button", { name: "Iniciar Sesión", exact: true })
    .click();
  const title = faker.commerce.productName();
  await expect(page).toHaveTitle("Administración");
  await page.getByText("Comunidades").click();
  await page.getByRole("button", { name: "Agregar comunidad" }).click();
  await page.getByRole("textbox").first().click();
  await page.getByRole("textbox").first().fill(title);
  await page.getByRole("textbox").nth(1).click();
  await page
    .getByRole("textbox")
    .nth(1)
    .fill(faker.commerce.productDescription());
  await page.getByRole("textbox").nth(2).click();
  await page.getByRole("textbox").nth(2).fill(faker.commerce.productMaterial());
  await page.getByRole("checkbox", { name: "Terapia Psicológica" }).check();
  await page.getByRole("checkbox", { name: "Consulta Médica General" }).check();
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
  await page
    .locator("input[name'imagen-comunidad']")
    .setInputFiles(
      "https://preview.redd.it/tener-una-imagen-random-hace-que-la-publicaci%C3%B3n-tenga-m%C3%A1s-v0-6frn21rqrtoc1.jpeg?width=640&crop=smart&auto=webp&s=e109a6ff409c369a7be16d3b7d8c885fa69c8abf"
    );
  await page.getByRole("button", { name: "Crear comunidad" }).click();
  await page.getByRole("button", { name: "Aceptar" }).click();

  await page.getByRole("button", { name: "Cerrar sesión" }).click();
  await page.getByRole("button", { name: "Iniciar Sesion" }).click();
  await page.locator('input[name="correo"]').click();
  await page.locator('input[name="correo"]').fill("usuario@hotmail.com");
  await page.locator('input[name="correo"]').press("Tab");
  await page.locator('input[name="contraseña"]').fill("usuario123");
  await page
    .getByRole("button", { name: "Iniciar Sesión", exact: true })
    .click();
  await page.getByRole("link", { name: "Comunidades" }).click();
  await page.getByRole("button", { name: "Explorar Más" }).click();
  await page.getByLabel(`card-${title}`).click();
  await page.getByRole("heading", { name: "ComunidadX" }).click();
});
