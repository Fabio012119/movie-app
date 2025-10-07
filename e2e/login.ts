import { expect, type Page } from "@playwright/test";
import { expectVisibleInView } from "./utils/expectVisibleInView";

export default async function login(page: Page, skipElementCheck: boolean) {
  const userNameInput = page.getByTestId("login-username");
  const passwordInput = page.getByTestId("login-password");
  const signInBtn = page.getByTestId("sign-in-btn");
  if (!skipElementCheck) {
    await expectVisibleInView(
      page,
      "login-header",
      "login-form",
      "login-username",
      "login-password",
      "sign-in-btn",
    );
    await userNameInput.fill("xxxxx");
    await passwordInput.fill("xxxxx");
    await signInBtn.click();
    const error = page.getByTestId("login-error");
    await expect(error).toBeVisible();
    await expect(error).toBeInViewport();
  }

  await page.waitForLoadState("networkidle");

  await userNameInput.fill("diana");
  await passwordInput.fill("h6n1l4");

  await signInBtn.click();

  await page.waitForLoadState("networkidle");
}
