<script lang="ts" setup>
import Content from '#/layouts/Content.vue';
import { Icon } from '@iconify/vue';
import { AiButton } from '@navifox/ui';
import { head } from 'es-toolkit';
import { isRef, type Ref, ref } from 'vue';

const pipSources = [
    { indexUrl: `https://mirrors.ustc.edu.cn/pypi/simple`, name: '中科大' },
    { indexUrl: 'https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple', name: '清华' },
    { indexUrl: 'https://pypi.tuna.tsinghua.edu.cn/simple', name: '清华 TUNA' },
    { indexUrl: 'https://mirrors.sustech.edu.cn/pypi/web/simple', name: '南科大' },
    { indexUrl: 'https://mirrors.cloud.aliyuncs.com/pypi/simple', name: '阿里云' },
    { indexUrl: 'https://mirrors.huaweicloud.com/repository/pypi/simple', name: '华为云' },
    { indexUrl: 'https://mirrors.163.com/pypi/simple', name: '网易' },
    { indexUrl: 'https://pypi.douban.com/simple', name: '豆瓣' },
].map(
    item => ({ ...item, host: new URL(item.indexUrl).hostname })
)
const npmSources = [
    { registry: 'https://npmreg.proxy.ustclug.org/', name: '中科大' },
    { registry: 'https://registry.npmmirror.com/', name: '淘宝' },
    { registry: 'https://npm.aliyun.com/', name: '阿里云' },
    { registry: 'https://mirrors.cloud.tencent.com/npm/', name: '腾讯云' },
    { registry: 'https://mirrors.huaweicloud.com/repository/npm/', name: '华为云' },
    { registry: 'https://mirrors.163.com/npm/', name: '网易' },
    // { registry: 'https://registry.npmjs.org/', name: 'npm 官方' },
].map(
    item => ({ ...item, host: new URL(item.registry).hostname })
)
const pipLayout = ref(0)
const npmLayout = ref(0)
const pipHost = ref(head(pipSources)!.host)
const pipSource = ref(head(pipSources)!.indexUrl)
const pyPackage = ref('django')
const npmSource = ref(head(npmSources)!.registry)
const nodePackage = ref('vue')
const nodeManager = ref<'npm' | 'pnpm' | 'yarn'>('npm')
const thePackage = (p: string | Ref<string>) => isRef(p) ? (p.value ? p.value : 'zeraora') : (p ? p : 'zeraora')
const cli = () => ({
    pip: {
        show: (
            'pip config get global.index-url\n' +
            'pip config get global.trusted-host'
        ),
        clean: (
            'pip config unset global.index-url\n' +
            'pip config unset global.trusted-host'
        ),
        config: (
            `pip config set global.index-url ${pipSource.value}\n` +
            `pip config set global.trusted-host ${pipHost.value}`
        ),
        install: [
            // @formatter:off
            `pip install ${thePackage(pyPackage)} -i ${pipSource.value} --trusted-host ${pipHost.value}`,
            `pip install ${thePackage(pyPackage)} -i ${pipSource.value} --trusted-host ${pipHost.value}`,
                        `${thePackage(pyPackage)} -i ${pipSource.value} --trusted-host ${pipHost.value}`,
                                                 `-i ${pipSource.value} --trusted-host ${pipHost.value}`,
                                                       pipSource.value,
            // @formatter:on
        ]
    },
    npm: {
        show: 'npm config get --global registry',
        clean: 'npm config delete --global registry',
        config: `npm config set --global registry=${npmSource.value}`,
        install: [
            // @formatter:off
            `npm install ${thePackage(nodePackage)} --registry ${npmSource.value}`,
            `npm install ${thePackage(nodePackage)} --registry ${npmSource.value}`,
                        `${thePackage(nodePackage)} --registry ${npmSource.value}`,
                                                   `--registry ${npmSource.value}`,
                                                                 npmSource.value,
            // @formatter:on
        ]
    },
    pnpm: {
        show: 'pnpm config get --global registry',
        clean: 'pnpm config delete --global registry',
        config: `pnpm config set --global registry ${npmSource.value}`,
        install: [
            // @formatter:off
            `pnpm add ${thePackage(nodePackage)} --registry ${npmSource.value}`,
            `pnpm add ${thePackage(nodePackage)} --registry ${npmSource.value}`,
                     `${thePackage(nodePackage)} --registry ${npmSource.value}`,
                                                `--registry ${npmSource.value}`,
                                                              npmSource.value,
            // @formatter:on
        ]
    },
    yarn: {
        show: 'yarn config get --global registry',
        clean: 'yarn config unset --global registry',
        config: `yarn config set --global registry ${npmSource.value}`,
        install: [
            // @formatter:off
            `yarn add ${thePackage(nodePackage)} --registry ${npmSource.value}`,
            `yarn add ${thePackage(nodePackage)} --registry ${npmSource.value}`,
                     `${thePackage(nodePackage)} --registry ${npmSource.value}`,
                                                `--registry ${npmSource.value}`,
                                                              npmSource.value,
            // @formatter:on
        ]
    },
})
</script>


<template>
<Content>
    <div
        class="MaxContainer flex flex-col space-y-16 text-black dark:text-white **:[p]:border-b **:[p]:border-b-slate-200 dark:**:[p]:border-b-slate-700">

        <div class="p-6 md:p-12 space-y-2 bg-white dark:bg-slate-800 rounded-lg">
            <h2 class="mb-6 max-md:mt-6 text-2xl flex flex-nowrap items-center gap-2 justify-center">
                <Icon class="min-w-8" height="32" icon="logos:pypi" />
                <span>pip</span>
            </h2>
            <div class="mb-12 flex flex-wrap items-center justify-center gap-3">
                <AiButton
                    v-for="{indexUrl, name, host} in pipSources"
                    :text="name"
                    inner
                    @click="pipSource = indexUrl; pipHost = host" />
            </div>
            <h3 class="mb-3 text-xl flex gap-2">
                <span class="cursor-default text-nowrap">直接安装</span>
                <input v-model="pyPackage"
                       class="w-full selection:bg-amber-300 selection:text-[#366E9D] dark:selection:bg-[#366E9D] dark:selection:text-amber-200"
                       placeholder="zeraora" />
            </h3>
            <p>
                <code :class="pipLayout===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>pip install</span>
                    <code :class="pipLayout===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(pyPackage) }}</span>
                        <code :class="pipLayout===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span>&nbsp;-i</span>
                            <code :class="pipLayout===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span>&nbsp;{{ pipSource }}</span>
                            </code>
                            <span>&nbsp;--trusted-host {{ pipHost }}</span>
                        </code>
                    </code>
                </code>
            </p>
            <div class="mb-8 flex flex-wrap gap-3">
                <AiButton
                    :copytext="cli().pip.install[1]"
                    coffee
                    inner
                    text="复制所有"
                    @mouseleave="pipLayout = 0"
                    @mouseover="pipLayout = 1" />
                <AiButton
                    :copytext="cli().pip.install[2]"
                    inner
                    text="复制所有参数"
                    @mouseleave="pipLayout = 0"
                    @mouseover="pipLayout = 2" />
                <AiButton
                    :copytext="cli().pip.install[3]"
                    inner
                    text="复制可选参数"
                    @mouseleave="pipLayout = 0"
                    @mouseover="pipLayout = 3" />
                <AiButton
                    :copytext="cli().pip.install[4]"
                    inner
                    text="复制链接"
                    @mouseleave="pipLayout = 0"
                    @mouseover="pipLayout = 4" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">全局设置</span>
            </h3>
            <p v-for="line in cli().pip.config.split('\n')"><code>{{ line }}</code></p>
            <div class="mb-8 flex flex-wrap gap-3">
                <AiButton :copytext="cli().pip.config" coffee inner text="复制所有" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">查看全局设置</span>
            </h3>
            <p v-for="line in cli().pip.show.split('\n')"><code>{{ line }}</code></p>
            <div class="mb-8 flex flex-wrap gap-3">
                <AiButton :copytext="cli().pip.show" coffee inner text="复制所有" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">清除全局设置</span>
            </h3>
            <p v-for="line in cli().pip.clean.split('\n')"><code>{{ line }}</code></p>
            <div class="flex flex-wrap gap-3">
                <AiButton :copytext="cli().pip.clean" coffee inner text="复制所有" />
            </div>
        </div>

        <!-- ---------------------------------------------------------------- -->

        <div class="p-6 md:p-12 space-y-2 bg-white dark:bg-slate-800 rounded-lg">
            <div class="mb-6 max-md:mt-6 text-2xl flex flex-nowrap items-center justify-center overflow-x-hidden">
                <button :class="nodeManager === 'npm' ? 'opacity-100' : 'opacity-20'"
                        class="flex flex-nowrap gap-2 cursor-pointer"
                        type="button"
                        @click="nodeManager = 'npm'">
                    <Icon class="min-w-8" height="32" icon="logos:npm-icon" />
                    <span>npm</span>
                </button>
                <div class="ml-4 pr-4 h-full border-l border-l-slate-300 dark:border-l-slate-600">{{ '\x00' }}</div>
                <button :class="nodeManager === 'pnpm' ? 'opacity-100' : 'opacity-20'"
                        class="flex flex-nowrap gap-2 cursor-pointer"
                        type="button"
                        @click="nodeManager = 'pnpm'">
                    <Icon class="min-w-8" height="32" icon="logos:pnpm" />
                    <span>pnpm</span>
                </button>
                <div class="ml-4 pr-4 h-full border-l border-l-slate-300 dark:border-l-slate-600">{{ '\x00' }}</div>
                <button :class="nodeManager === 'yarn' ? 'opacity-100' : 'opacity-20'"
                        class="flex flex-nowrap gap-2 cursor-pointer"
                        type="button"
                        @click="nodeManager = 'yarn'">
                    <Icon class="min-w-8" height="32" icon="logos:yarn" />
                    <span>yarn</span>
                </button>
            </div>
            <div class="mb-12 flex flex-wrap items-center justify-center gap-3">
                <AiButton
                    v-for="{registry, name} in npmSources"
                    :text="name"
                    inner
                    @click="npmSource = registry" />
            </div>
            <h3 class="mb-3 text-xl flex items-center gap-2">
                <span class="cursor-default text-nowrap">直接安装</span>
                <input v-model="nodePackage"
                       class="w-full selection:bg-red-500 dark:selection:bg-red-700 selection:text-white"
                       placeholder="zeraora" />
            </h3>
            <p v-if="nodeManager === 'npm'">
                <code :class="npmLayout===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>npm install</span>
                    <code :class="npmLayout===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(nodePackage) }}</span>
                        <code :class="npmLayout===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span class="pl-2">--registry</span>
                            <code :class="npmLayout===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span class="pl-2">{{ npmSource }}</span>
                            </code>
                        </code>
                    </code>
                </code>
            </p>
            <p v-if="nodeManager === 'pnpm'">
                <code :class="npmLayout===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>pnpm add</span>
                    <code :class="npmLayout===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(nodePackage) }}</span>
                        <code :class="npmLayout===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span class="pl-2">--registry</span>
                            <code :class="npmLayout===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span class="pl-2">{{ npmSource }}</span>
                            </code>
                        </code>
                    </code>
                </code>
            </p>
            <p v-if="nodeManager === 'yarn'">
                <code :class="npmLayout===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>yarn add</span>
                    <code :class="npmLayout===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(nodePackage) }}</span>
                        <code :class="npmLayout===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span class="pl-2">--registry</span>
                            <code :class="npmLayout===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span class="pl-2">{{ npmSource }}</span>
                            </code>
                        </code>
                    </code>
                </code>
            </p>
            <div class="mb-8 flex flex-wrap gap-3">
                <AiButton
                    :copytext="cli()[nodeManager].install[1]"
                    coffee
                    inner
                    text="复制所有"
                    @mouseleave="npmLayout = 0"
                    @mouseover="npmLayout = 1" />
                <AiButton
                    :copytext="cli()[nodeManager].install[2]"
                    inner
                    text="复制所有参数"
                    @mouseleave="npmLayout = 0"
                    @mouseover="npmLayout = 2" />
                <AiButton
                    :copytext="cli()[nodeManager].install[3]"
                    inner
                    text="复制可选参数"
                    @mouseleave="npmLayout = 0"
                    @mouseover="npmLayout = 3" />
                <AiButton
                    :copytext="cli()[nodeManager].install[4]"
                    inner
                    text="复制链接"
                    @mouseleave="npmLayout = 0"
                    @mouseover="npmLayout = 4" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">全局设置</span>
            </h3>
            <p><code>{{ cli()[nodeManager].config }}</code></p>
            <div class="mb-8 flex flex-wrap gap-3">
                <AiButton :copytext="cli()[nodeManager].config" coffee inner text="复制所有" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">查看全局设置</span>
            </h3>
            <p><code>{{ cli()[nodeManager].show }}</code></p>
            <div class="mb-8 flex flex-wrap gap-3">
                <AiButton :copytext="cli()[nodeManager].show" coffee inner text="复制所有" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">清除全局设置</span>
            </h3>
            <p><code>{{ cli()[nodeManager].clean }}</code></p>
            <div class="flex flex-wrap gap-3">
                <AiButton :copytext="cli()[nodeManager].clean" coffee inner text="复制所有" />
            </div>
        </div>

    </div>
</Content>
</template>
