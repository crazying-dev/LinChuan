<script lang="ts" setup>
import CopyButton from '#/components/CopyButton.vue';
import Content from '#/layouts/Content.vue';
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core';
import { head, last } from 'es-toolkit/array';
import { ref, useTemplateRef } from 'vue';

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
    { registry: 'https://registry.npmjs.org/', name: 'npm 官方' },
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
const pipInstall = useTemplateRef('pipInstall')
const npmInstall = useTemplateRef('npmInstall')

function copyableText(
    key:
        'pip:install' | 'pip:config' | 'pip:show' | 'pip:clean' |
        'npm:install' | 'npm:config' | 'npm:show'
) {
    switch (key) {
        case 'pip:install':
            const parts = [
                'pip', 'install', pyPackage.value ? pyPackage.value : 'zeraora',
                '-i', pipSource.value,
                '--trusted-host', pipHost.value,
            ]
            switch (pipLayout.value) {
                case 3:
                    return parts[4]!
                case 2:
                    return parts.slice(3).join(' ')
                default:
                    return parts.join(' ')
            }
        case 'pip:config':
            return (
                `pip config set global.index-url ${pipSource.value}\n` +
                `pip config set global.trusted-host ${pipHost.value}\n`
            )
        case 'pip:show':
            return (
                'pip config get global.index-url\n' +
                'pip config get global.trusted-host\n'
            )
        case 'pip:clean':
            return (
                'pip config unset global.index-url\n' +
                'pip config unset global.trusted-host\n'
            )
        case 'npm:install':
            const parts2 = [
                'npm', 'install', nodePackage.value ? nodePackage.value : 'zeraora',
                '--registry', npmSource.value,
            ]
            switch (npmLayout.value) {
                case 3:
                    return parts2[4]!
                case 2:
                    return parts2.slice(3).join(' ')
                default:
                    return parts2.join(' ')
            }
        case 'npm:config':
            return `npm config set registry ${npmSource.value}`
        case 'npm:show':
            return 'npm config get registry'
        default:
            return ''
    }
}

onClickOutside(pipInstall, (() => pipLayout.value = 0), { ignore: [ '#pipInstallationCopy' ] })
onClickOutside(npmInstall, (() => npmLayout.value = 0), { ignore: [ '#npmInstallationCopy' ] })
</script>


<template>
<Content>
    <div class="MaxContainer flex flex-col space-y-8 text-black dark:text-white">
        <div class="p-6 md:p-12 bg-white dark:bg-slate-800 rounded-lg">
            <h3 class="text-xl flex items-center gap-2 pb-2">
                <Icon class="min-w-6" height="24" icon="logos:pypi" />
                <span class="cursor-default text-nowrap">临时安装</span>
                <input v-model="pyPackage"
                       class="selection:bg-amber-300 selection:text-[#366E9D] dark:selection:bg-[#366E9D] dark:selection:text-amber-200"
                       placeholder="zeraora" />
            </h3>
            <div>
                <p ref="pipInstall" class="mb-2 **:cursor-pointer">
                    <code :class="pipLayout===1 ? 'text-pink-500 dark:text-pink-400' : ''"
                          @click.stop="pipLayout = pipLayout===1 ? 0 : 1">
                        <span class="pl-0">pip</span>
                        <span class="pl-2">install</span>
                        <span class="pl-2">{{ pyPackage ? pyPackage : 'zeraora' }}</span>
                        <code :class="pipLayout===2 ? 'text-pink-500 dark:text-pink-400' : ''"
                              @click.stop="pipLayout = pipLayout===2 ? 0 : 2">
                            <span class="pl-2">-i</span>
                            <code :class="pipLayout===3 ? 'text-pink-500 dark:text-pink-400' : ''"
                                  @click.stop="pipLayout = pipLayout===3 ? 0 : 3">
                                <span class="pl-2">{{ pipSource }}</span>
                            </code>
                            <span class="pl-2">--trusted-host</span>
                            <span class="pl-2">{{ pipHost }}</span>
                        </code>
                    </code>
                </p>
                <div class="flex flex-wrap gap-x-4">
                    <CopyButton id="pipInstallationCopy"
                                :plaintext="copyableText('pip:install')"
                                class="my-2 px-4 py-1.5 bg-amber-300 text-[#366E9D] hover:text-amber-200 hover:bg-[#366E9D] dark:bg-[#366E9D] dark:text-amber-200 dark:hover:text-[#366E9D] dark:hover:bg-amber-300">
                        <span class="">复制{{ [ '本段', '本段', '关键参数', '源地址' ][pipLayout] }}</span>
                    </CopyButton>
                    <button
                        v-for="{indexUrl, name, host} in pipSources"
                        class="my-2 px-4 py-1.5 cursor-pointer rounded-md bg-slate-200 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-800"
                        @click="pipSource = indexUrl; pipHost = host">
                        <span>{{ name }}</span>
                    </button>
                </div>
            </div>
            <h3 class="text-xl flex items-center gap-2 py-2 mt-8">
                <Icon class="min-w-6" height="24" icon="logos:pypi" />
                <span class="cursor-default text-nowrap">全局设置</span>
            </h3>
            <div>
                <p class="mb-2"><code>pip config set global.index-url {{ pipSource }}</code></p>
                <p class="mb-2"><code>pip config set global.trusted-host {{ pipHost }}</code></p>
                <div class="flex flex-wrap gap-x-4">
                    <CopyButton id="pipInstallationCopy"
                                :plaintext="copyableText('pip:config')"
                                class="my-2 px-4 py-1.5 bg-amber-300 text-[#366E9D] hover:text-amber-200 hover:bg-[#366E9D] dark:bg-[#366E9D] dark:text-amber-200 dark:hover:text-[#366E9D] dark:hover:bg-amber-300">
                        <span class="">复制本段</span>
                    </CopyButton>
                    <button
                        v-for="{indexUrl, name} in pipSources"
                        class="my-2 px-4 py-1.5 cursor-pointer rounded-md bg-slate-200 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-800"
                        @click="pipSource = indexUrl">
                        <span>{{ name }}</span>
                    </button>
                </div>
            </div>
            <h3 class="text-xl flex items-center gap-2 py-2 mt-8">
                <Icon class="min-w-6" height="24" icon="logos:pypi" />
                <span class="cursor-default text-nowrap">查看全局设置</span>
            </h3>
            <div>
                <p class="mb-2"><code>pip config get global.index-url</code></p>
                <p class="mb-2"><code>pip config get global.trusted-host</code></p>
                <CopyButton :plaintext="copyableText('pip:show')"
                            class="my-2 px-4 py-1.5 bg-amber-300 text-[#366E9D] hover:text-amber-200 hover:bg-[#366E9D] dark:bg-[#366E9D] dark:text-amber-200 dark:hover:text-[#366E9D] dark:hover:bg-amber-300">
                    <span>复制本段</span>
                </CopyButton>
            </div>
            <h3 class="text-xl flex items-center gap-2 py-2 mt-8">
                <Icon class="min-w-6" height="24" icon="logos:pypi" />
                <span class="cursor-default text-nowrap">清除全局设置</span>
            </h3>
            <div>
                <p class="mb-2"><code>pip config unset global.index-url</code></p>
                <p class="mb-2"><code>pip config unset global.trusted-host</code></p>
                <CopyButton :plaintext="copyableText('pip:clean')"
                            class="my-2 px-4 py-1.5 bg-amber-300 text-[#366E9D] hover:text-amber-200 hover:bg-[#366E9D] dark:bg-[#366E9D] dark:text-amber-200 dark:hover:text-[#366E9D] dark:hover:bg-amber-300">
                    <span>复制本段</span>
                </CopyButton>
            </div>
        </div>

        <div class="p-6 md:p-12 bg-white dark:bg-slate-800 rounded-lg">
            <h3 class="text-xl flex items-center gap-2 pb-2">
                <Icon class="min-w-6" height="24" icon="logos:npm-icon" />
                <span class="cursor-default text-nowrap">临时安装</span>
                <input v-model="nodePackage"
                       class="selection:bg-red-500 dark:selection:bg-red-700 selection:text-white"
                       placeholder="zeraora" />
            </h3>
            <div>
                <p ref="npmInstall" class="mb-2 **:cursor-pointer">
                    <code :class="npmLayout===1 ? 'text-pink-500 dark:text-pink-400' : ''"
                          @click.stop="npmLayout = npmLayout===1 ? 0 : 1">
                        <span class="pl-0">npm</span>
                        <span class="pl-2">install</span>
                        <span class="pl-2">{{ nodePackage ? nodePackage : 'zeraora' }}</span>
                        <code :class="npmLayout===2 ? 'text-pink-500 dark:text-pink-400' : ''"
                              @click.stop="npmLayout = npmLayout===2 ? 0 : 2">
                            <span class="pl-2">--registry</span>
                            <code :class="npmLayout===3 ? 'text-pink-500 dark:text-pink-400' : ''"
                                  @click.stop="npmLayout = npmLayout===3 ? 0 : 3">
                                <span class="pl-2">{{ npmSource }}</span>
                            </code>
                        </code>
                    </code>
                </p>
                <div class="flex flex-wrap gap-x-4">
                    <CopyButton id="npmInstallationCopy"
                                :plaintext="copyableText('npm:install')"
                                class="my-2 px-4 py-1.5 bg-red-500 dark:bg-red-700 text-white hover:text-red-500 dark:hover:text-red-600 hover:bg-white">
                        <span class="">复制{{ [ '本段', '本段', '关键参数', '源地址' ][npmLayout] }}</span>
                    </CopyButton>
                    <button
                        v-for="{registry, name} in npmSources"
                        class="my-2 px-4 py-1.5 cursor-pointer rounded-md bg-slate-200 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-800"
                        @click="npmSource = registry">
                        <span>{{ name }}</span>
                    </button>
                </div>
            </div>
            <h3 class="text-xl flex items-center gap-2 py-2 mt-8">
                <Icon class="min-w-6" height="24" icon="logos:npm-icon" />
                <span class="cursor-default text-nowrap">
                {{ npmSource === last(npmSources)!.registry ? '重置设置' : '设置' }}</span>
            </h3>
            <div>
                <p class="mb-2"><code>npm config set registry {{ npmSource }}</code></p>
                <div class="flex flex-wrap gap-x-4">
                    <CopyButton id="npmInstallationCopy"
                                :plaintext="copyableText('npm:config')"
                                class="my-2 px-4 py-1.5 bg-red-500 dark:bg-red-700 text-white hover:text-red-500 dark:hover:text-red-600 hover:bg-white">
                        <span class="">复制本段</span>
                    </CopyButton>
                    <button
                        v-for="{registry, name} in npmSources"
                        class="my-2 px-4 py-1.5 cursor-pointer rounded-md bg-slate-200 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-800"
                        @click="npmSource = registry">
                        <span>{{ name }}</span>
                    </button>
                </div>
            </div>
            <h3 class="text-xl flex items-center gap-2 py-2 mt-8">
                <Icon class="min-w-6" height="24" icon="logos:npm-icon" />
                <span class="cursor-default text-nowrap">查看设置</span>
            </h3>
            <div>
                <p class="mb-2"><code>npm config get registry</code></p>
                <CopyButton :plaintext="copyableText('npm:show')"
                            class="my-2 px-4 py-1.5 bg-red-500 dark:bg-red-700 text-white hover:text-red-500 dark:hover:text-red-600 hover:bg-white">
                    <span>复制本段</span>
                </CopyButton>
            </div>
        </div>
    </div>
    <div class="MaxContainer grow" />
</Content>
</template>


<style scoped>
</style>
