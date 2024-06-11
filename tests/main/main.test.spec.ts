import { expect, test } from "@playwright/test";
import { MainPage } from "../../pages/main/main.page";

let mainPage: MainPage;
let searchTeam: string;
let searchTeamAddress: string;
let URL = "https://www.tickets.com/";

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.open();
  await page.getByRole("button", { name: "Accept Cookies" }).click();
});

test.describe("Main Page Test Suite", () => {
  /*
   * Scenario 1 -  Main page should have a logo and a search input
   * Given user is on the main page
   * Then user should see a logo
   * And user should see a search input
   */
  test("Scenario 1 -  Main page should have a logo and a search input", async () => {
    await test.step("Given user is on the main page", async () => {
      expect(mainPage.page.url()).toBe(URL);
    });
    await test.step("Then user should see a logo", async () => {
      await expect(mainPage.companyLogo).toBeVisible();
    });
    await test.step("And user should see a search input", async () => {
      await expect(mainPage.searchInput).toBeVisible();
    });
  });

  /*
   * Scenario 2 - Navigate to the Search bar and click Find
   * Given user is on the main page
   * When user fills out search value in the search input
   * Then results should be displayed in the dropdown
   */
  test("Scenario 2 - Navigate to the Search bar and click Find", async () => {
    searchTeam = "Los Angeles Angels of Anaheim";
    searchTeamAddress = "Angel Stadium, 2000 E Gene";
    await test.step("Given user is on the main page", async () => {
      expect(mainPage.page.url()).toBe(URL);
      await mainPage.page.waitForLoadState();
    });
    await test.step("When user fills out search value in the search input", async () => {
      await mainPage.searchInput.fill(searchTeam);
    });
    await test.step("Then results should be displayed in the dropdown", async () => {
      await expect(
        mainPage.selectSearchValueByTeamAddress(searchTeamAddress)
      ).toBeVisible();
    });
  });

  /*
   * Scenario 3 - End 2 End - Navigate to Single Game Tickets
   * Given user is on the main page
   * When user fills out search value in the search input
   * Then results should be displayed in the dropdown
   * When user clicks on the founded team and related address
   * Then user should see the full team name and address
   * When user click Tickets link in the map for the team
   * Then user should be redirected to the team ticket page
   * When user clicks "Buy Single Game tickets" in the team ticket page
   * Then user should see the schedule page
   */

  test("Scenario 3 - End 2 End - Buy a ticket", async () => {
    searchTeam = "Los Angeles Angels";
    searchTeamAddress = "Angel Stadium, 2000 E Gene";
    let teamMainPage;
    await test.step("Given user is on the main page", async () => {
      expect(mainPage.page.url()).toBe(URL);
      await mainPage.page.waitForLoadState();
    });
    await test.step("When user fills out search value in the search input", async () => {
      await mainPage.searchInput.fill(searchTeam);
    });
    await test.step("Then results should be displayed in the dropdown", async () => {
      await expect(mainPage.categoryDropdown).toBeVisible();
    });
    await test.step("When user clicks on the founded team and related address", async () => {
      await mainPage.selectSearchValueByTeamAddress(searchTeamAddress).click();
    });
    await test.step("Then user should see the full team name and address", async () => {
      await expect(mainPage.mapTeamInfoWindow).toBeVisible();
    });
    await test.step("When user click Tickets link in the map for the team", async () => {
      [teamMainPage] = await Promise.all([
        mainPage.page.waitForEvent("popup"),
        mainPage.mapTicketsLink.click(),
      ]);
    });
    await test.step("Then user should be redirected to the team ticket page", async () => {
      await teamMainPage.waitForLoadState();
      expect(await teamMainPage.title()).toContain(searchTeam);
      await teamMainPage.locator("#onetrust-accept-btn-handler").click();
    });
    await test.step("When user clicks 'Buy Single Game tickets' in the team ticket page", async () => {
      await teamMainPage.locator("a:has-text('Buy Tickets') >> nth=0").click();
    });
    await test.step("Then user should see the schedule page", async () => {
      await expect(
        teamMainPage.locator("//h1[normalize-space()='Single Game Tickets']")
      ).toBeVisible();
    });
  });
});
