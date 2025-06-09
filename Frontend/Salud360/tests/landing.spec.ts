import { test, expect } from "@playwright/test";

test.describe("Testing sobre la página principal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });
  test("tiene título", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Salud 360/);
  });
  test("headings visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Calma tu mente y transforma tu vida" })
    ).toBeVisible();
    const headingComunidades = page.getByRole("heading", {
      name: "COMUNIDADES",
      exact: true,
    });
    await headingComunidades.waitFor();
    await expect(headingComunidades).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "LOCALES", exact: true })
    ).toBeVisible();
  });

  test("Navegar por el landing", async ({ page }) => {
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Comunidades" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Comunidades", exact: true })
    ).toBeVisible();

    page
      .getByRole("navigation")
      .getByRole("link", { name: "Sobre Nosotros" })
      .click();
    await expect(
      page.getByRole("heading", { name: "SALUD 360", exact: true })
    ).toBeVisible();
  });
});
