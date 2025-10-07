import { expect, type Page } from "@playwright/test";

export default async function MovieDetailsPage(page: Page) {
  await expect(page.getByTestId("go-back-btn")).toBeVisible();
  await expect(page.getByTestId("movie-poster")).toBeVisible();
  await expect(page.getByTestId("movie-title")).toBeVisible();
  await expect(page.getByTestId("movie-year")).toBeVisible();
  await expect(page.getByTestId("movie-genre-director-rating")).toBeVisible();
  await expect(page.getByTestId("movie-description")).toBeVisible();

  const favBtn = page.getByTestId("fav-btn");
  await favBtn.scrollIntoViewIfNeeded();

  await favBtn.click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  await expect(favBtn).toHaveText(/Remove from favorites/i);

  await favBtn.click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  await expect(favBtn).toHaveText(/Add to favorites/i);

  await favBtn.click();

  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);

  await page.getByTestId("go-back-btn").click();

  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  await expect(page.getByTestId("movie-card")).toHaveCount(8);

  await page.getByTestId("log-out-btn").click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
}
