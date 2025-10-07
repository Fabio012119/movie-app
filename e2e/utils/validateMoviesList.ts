import { expect, type Page } from "playwright/test";

const MOVIES_PER_PAGE = 8;

export async function validateMoviesList(page: Page) {
  const movies = page.getByTestId("movie-card");
  await expect(movies).toHaveCount(MOVIES_PER_PAGE);

  const count = await movies.count();
  for (let i = 0; i < count; i++) {
    const card = movies.nth(i);
    await expect(card).toBeVisible();
    await card.scrollIntoViewIfNeeded();
    await expect(card.getByTestId("movie-title")).toHaveText(/\S/);
    await expect(card.getByTestId("movie-image")).toBeVisible();
    await expect(card.getByTestId("movie-year-director")).toBeVisible();
    await expect(card.getByTestId("movie-genre-rating")).toBeVisible();
    await expect(card.getByTestId("movie-desc")).toBeVisible();
    await expect(card.getByTestId("fav-btn")).toBeVisible();
  }
}
