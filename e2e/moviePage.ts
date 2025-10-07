import { expect, type Page } from "@playwright/test";
import { expectVisibleInView } from "./utils/expectVisibleInView";
import login from "./login";
import { validateMoviesList } from "./utils/validateMoviesList";

export default async function MoviePage(page: Page) {
  await expect(page).toHaveURL("/movies");
  await expectVisibleInView(
    page,
    "app-menu",
    "app-title",
    "signed-in-username",
    "log-out-btn",
  );

  await page.getByTestId("log-out-btn").click();
  await login(page, true);
  await expect(page).toHaveURL("/movies");

  const pagerLinks = page.getByTestId("paginating-links");
  const pages = await pagerLinks.count();
  await expect(pagerLinks).toHaveCount(2);

  for (let i = 0; i < pages; i++) {
    const link = pagerLinks.nth(i);
    await link.scrollIntoViewIfNeeded();

    const targetHref = await link.getAttribute("href");
    await Promise.all([
      page.waitForURL((url) => {
        if (targetHref) return url.toString().includes(targetHref);
        return url.pathname === "/movies" && url.searchParams.has("page");
      }),
      link.click(),
    ]);

    await validateMoviesList(page);
  }

  const firstMovie = page.getByTestId("movie-card").first();

  const anyFavBtn = firstMovie.getByTestId("fav-btn");
  await anyFavBtn.scrollIntoViewIfNeeded();

  await anyFavBtn.click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  await expect(anyFavBtn).toHaveText(/Remove from favorites/i);

  await anyFavBtn.click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  await expect(anyFavBtn).toHaveText(/Add to favorites/i);

  await firstMovie.click();

  await page.waitForLoadState("networkidle");
}
