
const { test, expect } = require("@playwright/test");
const { testCases } = require("./test-data");

const baseURL = "https://create-asana-like-pr-39y5.bolt.host/";

test.describe("Project Board - Data-driven task verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);

    await page.getByRole("textbox", { name: "Username" }).fill("admin");
    await page.getByRole("textbox", { name: "Password" }).fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByRole("button", { name: /Web Application/ }).first()
    ).toBeVisible();
  });

  for (const scenario of testCases) {
    test(`${scenario.project}: ${scenario.task}`, async ({ page }) => {
      // Open the requested project.
      const projectButton = page.getByRole("button", {
        name: scenario.project === "Web Application"
          ? /Web Application/
          : /Mobile Application/,
      }).first();

      await projectButton.click();

      // Find and verify the individual task.
      const taskHeading = page.getByRole("heading", {
        name: scenario.task,
        exact: true,
      });

      await expect(taskHeading).toBeVisible();

      // The heading's parent is the task card.
      const taskCard = taskHeading.locator("xpath=..");
      await expect(taskCard).toBeVisible();

      // Verify tags on this specific task card.
      for (const tag of scenario.tags) {
        await expect(
          taskCard.getByText(tag, { exact: true })
        ).toBeVisible();
      }

      // Find the status column containing this task card.
      const column = taskCard.locator("xpath=../..");

      // Verify the expected status heading.
      const escapedStatus = scenario.column.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      await expect(
        column.getByText(
          new RegExp(`^${escapedStatus}\\s*\\(\\d+\\)$`)
        )
      ).toBeVisible();

      // Confirm the correct task is inside that column.
      await expect(
        column.getByRole("heading", {
          name: scenario.task,
          exact: true,
        })
      ).toBeVisible();
    });
  }
});
