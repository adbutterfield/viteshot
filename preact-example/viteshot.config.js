const playwrightShooter = require("viteshot/shooters/playwright");
const playwright = require("playwright");

module.exports = {
  framework: "preact",
  browser: playwrightShooter(
    playwright.chromium,
    playwright.devices["Pixel 2"]
  ),
  wrapper: {
    path: "__reactpreview__/Wrapper",
    componentName: "Wrapper",
  },
};
