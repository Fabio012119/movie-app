import { expect, test } from "@playwright/test";
import Login from "./login";
import MoviePage from "./moviePage";
import MovieDetailsPage from "./movieDetails";

test("Test the flow of the app", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("/login");

  await test.step("Testing login...", async () => {
    await Login(page, false);
  });

  await test.step("Testing movies...", async () => {
    await MoviePage(page);
  });

  await test.step("Testing movie description page...", async () => {
    await MovieDetailsPage(page);
  });
});
