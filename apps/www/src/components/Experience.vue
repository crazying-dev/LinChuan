<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type { Project } from '@navifox/types';

/**
 * 项目经历。
 */
interface ExperienceDetail {

    /** 岗位／担任／职能。 */
    title: string

    /** 开始时间。 */
    start: string

    /** 结束时间。 */
    stop?: string

    /** 所在组织／团队／公司。 */
    team?: string

    /** 负责项目。 */
    project?: Project
}

defineProps<ExperienceDetail>()
</script>


<template>
<section class="flex flex-col gap-2">
    <div>
        <span class="mr-2"><b>{{ project?.name ?? team }}</b></span>
        <span class="ml-2 float-end">
            <code>{{ start }}</code>
            <code v-if="stop"> - {{ stop }}</code>
            <span v-else> 至今</span>
        </span>
        <span class="text-slate-500">
            <span v-if="project?.description">{{ project.description }}・</span>
            <span v-if="team">{{ team }}・</span>
            <span>{{ title }}</span>
        </span>
    </div>
    <div v-if="project?.stack" class="text-slate-500 text-sm flex flex-wrap gap-x-3 gap-y-1">
        <div v-for="skill in project.stack" class="flex flex-nowrap gap-1 items-center">
            <Icon :icon="skill.logo" height="16" />
            <span v-if="skill.text">{{ skill.text }}</span>
        </div>
    </div>
    <slot></slot>
</section>
</template>


<style scoped>
@reference '#/style.css';

:deep(u) {
    text-decoration: underline 3px var(--color-orange-500);
    text-underline-offset: 3px;
}

:deep(a) {
    @apply transition-colors duration-200 text-slate-200;
    @apply hover:text-orange-500 dark:hover:text-orange-300;
}

:deep(b) {
    @apply text-slate-300;
}

:deep(p) {
    @apply mt-2 indent-8;
}

:deep(ol), :deep(ul) {
    @apply mt-2;
}
</style>
