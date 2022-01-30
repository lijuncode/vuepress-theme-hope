import { addViteOptimizeDeps, useGitPlugin } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { getAlias } from "./alias";
import { assignDefaultLocaleOptions } from "./defaultLocaleAssign";
import { resolveEncrypt } from "./encrypt";
import { extendsPage } from "./extends";
import { getPluginConfig } from "./plugins";

import type { Page, Theme } from "@vuepress/core";
import type { HopeThemeOptions, HopeThemePageData } from "../shared";

export const themeHope: Theme<HopeThemeOptions> = (
  { plugins = {}, ...themeOptions },
  app
) => {
  addViteOptimizeDeps(app, ["@vueuse/core", "lodash.throttle"]);

  if (app.env.isDev)
    addViteOptimizeDeps(app, "@mr-hope/vuepress-shared/lib/client");

  if (themeOptions.encrypt) addViteOptimizeDeps(app, "bcryptjs");

  assignDefaultLocaleOptions(app, themeOptions);

  useGitPlugin(app, {
    createdTime: true,
    contributors: true,
    updatedTime: true,
  });
  useReadingTimePlugin(app, { wordPerminute: themeOptions.wordPerminute });

  useSassPalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: path.resolve(__dirname, "../../templates/config.scss"),
    defaultPalette: path.resolve(__dirname, "../../templates/palette.scss"),
    palette: ".vuepress/styles/palette.scss",
    style: ".vuepress/styles/index.scss",
  });

  resolveEncrypt(themeOptions.encrypt || {});

  return {
    name: "vuepress-theme-hope",

    alias: getAlias(),

    layouts: path.resolve(__dirname, "../client/layouts"),

    templateBuild: path.resolve(__dirname, "../../templates/index.build.html"),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    extendsPage: (page) => extendsPage(app, page as Page<HopeThemePageData>),

    plugins: getPluginConfig(plugins, themeOptions),
  };
};
