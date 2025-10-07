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

  const lastMovie = page.getByTestId("movie-card").last();
  const favBtn = lastMovie.getByTestId("fav-btn");
  await favBtn.scrollIntoViewIfNeeded();

  await expect(favBtn).toHaveText(/^(Add to favorites|Remove from favorites)$/);

  const initial = (await favBtn.innerText()).trim();

  if (initial === "Add to favorites") {
    await favBtn.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await expect(favBtn).toHaveText("Remove from favorites");
  } else if (initial === "Remove from favorites") {
    await favBtn.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await expect(favBtn).toHaveText("Add to favorites");
  } else {
    throw new Error(`Unexpected favorites button text: "${initial}"`);
  }

  await lastMovie.click();

  await page.waitForLoadState("networkidle");
}
