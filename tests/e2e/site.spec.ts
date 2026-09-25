import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/projects", "/projects/neupc", "/experience", "/cp", "/about", "/writing", "/contact", "/resume"];

for (const path of pages) {
  test(`${path} renders with one h1, no console errors and no serious a11y violations`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      // Prefetches of routes are fine; real errors (hydration, runtime) are not.
      if (m.type() === "error" && !m.text().includes("Failed to load resource")) errors.push(m.text());
    });
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("home proves fit in the first screen", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Eyasir");
  await expect(page.getByText("Junior Software Engineer").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "View work" })).toBeVisible();
});

test("CV is reachable in two clicks from a project page", async ({ page, isMobile }) => {
  await page.goto("/projects/neupc");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  else await page.getByRole("link", { name: "CV", exact: true }).last().scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: "CV", exact: true }).first().click();
  await expect(page).toHaveURL(/\/resume$/);
  await expect(page.getByRole("button", { name: /print/i })).toBeVisible();
});

test("CP page shows the rating chart and its table twin", async ({ page }) => {
  await page.goto("/cp");
  await expect(page.getByRole("img", { name: /Codeforces rating after each/ })).toBeVisible();
  await page.getByText(/View as table/).click();
  await expect(page.getByRole("table")).toBeVisible();
});

test("contact form validates inline and falls back to email when not connected", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name *").fill("Rina");
  await page.getByLabel("Email *").fill("not-an-email");
  await page.getByLabel("Message *").fill("hi");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "need fixing" })).toBeVisible();
  await page.getByLabel("Email *").fill("rina@example.com");
  await page.getByLabel("Message *").fill("Hello! I would like to talk about a junior role.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("link", { name: "Open in my email app" })).toHaveAttribute("href", /^mailto:/);
});

test("theme toggle persists across reloads", async ({ page }) => {
  await page.goto("/about");
  const toggle = page.getByRole("button", { name: /Theme:/ });
  await toggle.click(); // system -> light
  await toggle.click(); // light -> dark
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("unknown pages return a helpful 404", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("isn’t here");
});
