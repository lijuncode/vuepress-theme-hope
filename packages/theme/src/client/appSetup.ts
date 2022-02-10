import { defineClientAppSetup } from "@vuepress/client";

import { setupDarkMode } from "@theme-hope/composables";

export default defineClientAppSetup(() => {
  setupDarkMode();
});
