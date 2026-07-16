// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import '#/theme/style.css';
import '@catppuccin/vitepress/theme/mocha/mauve.css';
import SpiritCard from '#/theme/components/SpiritCard.vue';
import SpiritBanner from '#/theme/components/SpiritBanner.vue';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        });
    },
    enhanceApp({ app }) {
        app.component('SpiritCard', SpiritCard);
        app.component('SpiritBanner', SpiritBanner);
    },
} satisfies Theme;
