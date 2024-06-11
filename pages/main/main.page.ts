import { expect, Locator, Page } from "@playwright/test";

export class MainPage {
  page: Page;
  readonly companyLogo: Locator;
  readonly provenueLink: Locator;
  readonly searchInput: Locator;
  readonly findButton: Locator;
  readonly categoryDropdown: Locator;
  readonly selectSearchValueByTeamAddress = (teamAddress: string) =>
    this.page.frameLocator("#iFrameResizer0").getByText(teamAddress);
  readonly mapTeamInfoWindow: Locator;
  readonly mapTicketsLink: Locator;

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
    this.mapTeamInfoWindow = this.page
      .frameLocator("#iFrameResizer0")
      .locator(".cartodb-infowindow");
    this.mapTicketsLink = this.page
      .frameLocator("#iFrameResizer0")
      .locator('//a[contains(text(),"Tickets")]');
  }

  async open() {
    await this.page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await expect(this.companyLogo).toBeVisible();
  }
}
