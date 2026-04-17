<script lang="ts" setup>
import { Markdown } from '@navifox/ui';

defineProps<{ color: string; color2?: string; last?: boolean; date?: string; markdown?: boolean }>();
</script>

<template>
    <li class="relative pb-6">
        <div
            :style="{
                backgroundImage: `linear-gradient(to bottom, ${color}, ${color2 ?? (last ? 'transparent' : color)})`,
            }"
            class="absolute top-2.5 left-2.5 h-full w-0.75"
        />
        <div class="absolute">
            <div :style="{ backgroundColor: color }" class="absolute top-1.5 left-1.5 z-1 size-2.75 rounded-[50%]" />
            <div :style="{ backgroundColor: color }" class="absolute size-5.5 rounded-[50%] opacity-50" />
        </div>
        <div class="relative pl-8">
            <Markdown v-if="markdown">
                <slot></slot>
            </Markdown>
            <div v-else>
                <slot></slot>
            </div>
            <div v-if="date" class="mt-1 text-sm text-slate-300 dark:text-slate-600" v-html="date" />
        </div>
    </li>
</template>
