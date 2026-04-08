<script lang="ts" setup>
import { AiFooter } from '@navifox/ui';

const version = __APP_VERSION__
</script>


<template>
<RouterView />
<AiFooter>
    <template #additions>
        <p>
            <span>构建为 <code>{{ version }}</code></span>
        </p>
    </template>
</AiFooter>
</template>
