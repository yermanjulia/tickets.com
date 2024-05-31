import { expect, Locator, Page } from "@playwright/test";

export class MainPage {
  page: Page;
  readonly companyLogo: Locator;
  readonly provenueLink: Locator;
  readonly searchInput: Locator;
  readonly findButton: Locator;
  readonly categoryDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyLogo = this.page.locator(".logo__link");
    this.provenueLink = this.page.locator(".header__nav-top__nav-item__link");
    this.searchInput = this.page
      .frameLocator("#iFrameResizer0")
      .locator("#address");
    this.findButton = this.page
      .frameLocator("#iFrameResizer0")
      .locator("#addressBtn");
    this.categoryDropdown = this.page
      .frameLocator("#iFrameResizer0")
      .locator("[data-operator='ILIKE'] select");
  }

  async open() {
    await this.page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await expect(this.companyLogo).toBeVisible();
  }
}
