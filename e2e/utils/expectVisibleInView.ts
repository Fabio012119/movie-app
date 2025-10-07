import { expect, type Page } from "@playwright/test";

export async function expectVisibleInView(page: Page, ...ids: string[]) {
  for (const id of ids) {
    const el = page.getByTestId(id);
    await expect(el, `[data-testid="${id}"] should be visible`).toBeVisible();
    await expect(
      el,
      `[data-testid="${id}"] should be in viewport`,
    ).toBeInViewport();
  }
}
