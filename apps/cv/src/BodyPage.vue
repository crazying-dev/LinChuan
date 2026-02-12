<script lang="ts" setup>
import AiTimeline from '#/components/AiTimeline.vue';
import ExperiencePanel from '#/components/ExperiencePanel.vue';
import ProgrammerPanel from '#/components/ProgrammerPanel.vue';
import SkillsPanel from '#/components/SkillsPanel.vue';
import { Icon } from '@iconify/vue';
import { curriculumVitae, tighnari } from '@navifox/constants';
import type { Badge } from '@navifox/types';
import { useFavicon, useTitle, useWindowScroll, useWindowSize } from '@vueuse/core';
import { NBackTop, NFloatButton } from 'naive-ui';
import { useTemplateRef } from 'vue';

function* getStates(): Generator<Badge> {
    if (tighnari.location)
        yield { icon: 'zondicons:location', text: tighnari.location }
    if (tighnari.age)
        yield { icon: 'material-symbols:schedule', text: `${tighnari.age}岁` }
    if (tighnari.wxid)
        yield { icon: 'bi:wechat', text: tighnari.wxid }
    if (cvLastUpdateTime)
        yield { icon: 'stash:last-updates-solid', text: cvLastUpdateTime }
}

useTitle().value = curriculumVitae.name
useFavicon().value = curriculumVitae.icon

const cvLastUpdateTime = '2026.2'
const egoStates = [ ...getStates() ]
const experiencePanel = useTemplateRef('experiencePanel')
const programmerPanel = useTemplateRef('programmerPanel')
const skillsPanel = useTemplateRef('skillsPanel')
const timeline = useTemplateRef('timeline')
const { width } = useWindowSize()
const { y } = useWindowScroll({ behavior: 'smooth' })
</script>


<template>
<article class="mt-4 py-8 rounded-xl bg-gray-800 flex flex-col gap-8"
         style="--tick-stroke: var(--color-gray-700)">
    <div class="mx-8 flex flex-col gap-3 text-center items-center">
        <!-- 头部信息 -->
        <h1 class="text-4xl"><b class="text-gray-50!">阿羽</b></h1>
        <h3 class="text-lg">项目经历 ・ 技能树 ・ 大事年表</h3>
        <div class="inline-flex flex-nowrap gap-1 items-center">
            <template v-for="state in egoStates">
                <Icon :icon="state.icon" height="16" />
                <span class="mr-3">{{ state.text }}</span>
            </template>
        </div>
        <span class="text-center text-gray-600 tracking-[.5em]">・{{ curriculumVitae.desc }}・</span>
    </div>
    <div ref="experiencePanel" class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <div class="mx-8">
        <ExperiencePanel />  <!-- 项目经历 -->
    </div>
    <div ref="programmerPanel" class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <div class="mx-8">
        <span class="mr-2"><b class="text-gray-50!">技能评估等级</b></span>
        <span class="ml-2 float-end"><code>{{ cvLastUpdateTime }}</code></span>
        <span>
            <a class="not-hover:text-gray-500!"
               href="https://github.com/bennyhuo/programmer-levels"
               target="_blank">霍丙乾 Programmer Levels v0.4</a>
        </span>
        <ProgrammerPanel class="mt-8" />  <!-- 技能评级 -->
    </div>
    <div ref="skillsPanel" class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <div class="mx-8">
        <SkillsPanel />  <!-- 技能面板 -->
    </div>
    <div ref="timeline" class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <div class="mx-8">
        <b class="text-gray-50!">风带来了故事的种子</b>
        <section class="mt-8">
            <AiTimeline />  <!-- 大事年表 -->
        </section>
    </div>
</article>

<!-- 页尾 -->
<div class="my-12">
    <Icon class="max-md:size-12 size-18 mx-auto" icon="fluent-emoji:fox" />
</div>

<!-- 浮动工具 -->
<div>
    <n-float-button :bottom="40"
                    :height="44"
                    :menu-trigger="width >= 768 ? 'hover' : 'click'"
                    :right="40"
                    :width="44">
        <template #description>
            <Icon height="24" icon="carbon:catalog-publish" />
        </template>
        <template #menu>
            <n-float-button :right="0"
                            class="w-auto! text-nowrap px-4"
                            @click="y += experiencePanel!.getBoundingClientRect().top">
                <template #description>项目经历</template>
            </n-float-button>
            <n-float-button :right="0"
                            class="w-auto! text-nowrap px-4"
                            @click="y += programmerPanel!.getBoundingClientRect().top">
                <template #description>技能评估等级</template>
            </n-float-button>
            <n-float-button :right="0"
                            class="w-auto! text-nowrap px-4"
                            @click="y += skillsPanel!.getBoundingClientRect().top">
                <template #description>技能面板</template>
            </n-float-button>
            <n-float-button :right="0"
                            class="w-auto! text-nowrap px-4"
                            @click="y += timeline!.getBoundingClientRect().top">
                <template #description>时间线</template>
            </n-float-button>
        </template>
    </n-float-button>
    <n-back-top :right="100"
                :visibility-height="y + (experiencePanel?.getBoundingClientRect().top ?? 0)"
                class="bg-cyan-900! hover:bg-cyan-600! transition-colors duration-300"
                to="#app">
        <Icon height="24" icon="tdesign:backtop" />
    </n-back-top>
</div>
</template>


<!--suppress CssUnusedSymbol -->
<style scoped>
:deep(.n-float-button) {
    transition: all .3s;
    background-color: var(--color-cyan-900);
}

:deep(.n-float-button):hover {
    color: white;
    background-color: var(--color-cyan-600);
}

.n-float-button :deep(.n-float-button__menu) {
    right: 0;
    align-items: end;
}

.tick-right::after {
    content: "";
    border-top: 5px solid #0000;
    border-right: 5px solid var(--tick-stroke);
    border-bottom: 5px solid #0000;
    border-left: 5px solid #0000;
    width: 0;
    height: 0;
    position: absolute;
    top: -5px;
    right: 0;
}

.tick-left::before {
    content: "";
    border-top: 5px solid #0000;
    border-bottom: 5px solid #0000;
    border-right: 5px solid #0000;
    border-left: 5px solid var(--tick-stroke);
    width: 0;
    height: 0;
    position: absolute;
    top: -5px;
    left: 0;
}
</style>
