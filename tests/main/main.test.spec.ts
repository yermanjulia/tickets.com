import { expect, test } from "@playwright/test";
import { MainPage } from "../../pages/main/main.page";

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.open();
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
      expect(mainPage.page.url()).toBe("https://www.tickets.com/");
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
   * When user fills in "Los Angeles" in the address field
   * And user clicks on the address button
   * Then user should navigate to the search results page
   */
  test("Navigate to the Search bar and click Find", async () => {
    await test.step("Given user is on the main page", async () => {
      expect(mainPage.page.url()).toBe("https://www.tickets.com/");
    });
    await test.step("When user fills in 'Los Angeles' in the address field", async () => {
      await mainPage.searchInput.fill("Los Angeles");
    });
    await test.step("And user clicks on the address button", async () => {
      await mainPage.findButton.click();
    });
    await test.step("Then user should navigate to the search results page", async () => {
      await expect(mainPage.categoryDropdown).toBeVisible();
    });
  });
});
