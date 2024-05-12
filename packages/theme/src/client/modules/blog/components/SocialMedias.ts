import { entries } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { icons } from "@temp/theme-hope/socialMedia.js";
import { usePure } from "@theme-hope/composables/index";
import { useBlogOptions } from "@theme-hope/modules/blog/composables/index";

import "../styles/social-medias.scss";

export default defineComponent({
  name: "SocialMedias",

  setup() {
    const blogOptions = useBlogOptions();
    const isPure = usePure();

    const mediaLinks = computed(() =>
      entries(blogOptions.value.medias ?? {}).map(([media, url]) => ({
        name: media,
        icon: icons[media],
        url,
      })),
    );

    return (): VNode | null =>
      mediaLinks.value.length
        ? h(
            "div",
            { class: "vp-social-medias" },
            mediaLinks.value.map(({ name, icon, url }) =>
              h("a", {
                class: "vp-social-media",
                href: url,
                rel: "noopener noreferrer",
                target: "_blank",
                "aria-label": name || "",
                ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
                innerHTML: icon,
              }),
            ),
          )
        : null;
  },
});
