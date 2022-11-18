import type { LocaleConfig, Page } from "@vuepress/core";
import type { SearchProLocaleData } from "./locales.js";

export type SearchProCustomFieldFormatter = string | Record<string, string>;

export interface SearchProHotKeyOptions {
  /**
   * Value of `event.key` to trigger the hot key
   *
   * 热键的 `event.key` 值
   */
  key: string;

  /**
   * Whether to press `event.altKey` at the same time
   *
   * 是否同时按下 `event.altKey`
   *
   * @default false
   */
  alt?: boolean;

  /**
   * Whether to press `event.ctrlKey` at the same time
   *
   * 是否同时按下 `event.ctrlKey`
   *
   * @default false
   */
  ctrl?: boolean;

  /**
   * Whether to press `event.shiftKey` at the same time
   *
   * 是否同时按下 `event.shiftKey`
   *
   * @default false
   */
  shift?: boolean;
}

export interface SearchProCustomFieldOptions {
  /**
   * Name of the custom field
   *
   * 自定义项目的名称
   */
  name: string;

  /**
   * Custom field getter
   *
   * 自定义项目的获取器
   */
  getter: (page: Page) => string | string[] | null;

  /**
   * Display content
   *
   * @description `$content` will be replaced by the content returned by `getter`
   *
   * 展示的内容
   *
   * @description `$content` 会被 `getter` 返回的内容替换
   *
   * @default `$content`
   */
  formatter?: SearchProCustomFieldFormatter;
}

export type SearchProClientCustomFiledConfig = Record<
  string,
  SearchProCustomFieldFormatter
>;

export interface SearchProOptions {
  /**
   * Whether index page content
   *
   * @description By default only the title and excerpt of the page will be indexed, and the content of the page will not be indexed. If you need to index the content of the page, you can set this option to `true`
   *
   * 是否索引正文内容
   *
   * @description 默认情况下，只会索引页面的标题和摘要，不会索引页面的正文内容。如果需要索引页面的正文内容，可以将该选项设置为 `true`
   *
   * @default false
   */
  indexContent?: boolean;

  /**
   * Whether enable hmr
   *
   * 是否启用 hmr
   *
   * @default false
   */
  hotReload?: boolean;

  /**
   * Custom field for search
   */
  customFields?: SearchProCustomFieldOptions[];

  /**
   * Specify the [event.key](http://keycode.info/) of the hotkeys
   *
   * @description When hotkeys are pressed, the search box input will be focused. Set to an empty array to disable hotkeys
   *
   * 指定热键的 [event.key](http://keycode.info/)
   *
   * @description 当热键被按下时，搜索框的输入框会被聚焦，设置为空数组以禁用热键
   *
   * @default [{key:'k',ctrl:true}]
   */
  hotKeys?: SearchProHotKeyOptions[];

  /**
   * Locales config
   *
   * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/search-pro/src/node/locales.ts)
   *
   * 多语言选项
   *
   * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/search-pro/src/node/locales.ts)
   */
  locales?: LocaleConfig<SearchProLocaleData>;
}
