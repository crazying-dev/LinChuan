<script lang="ts" setup>
import BodyPage from '#/BodyPage.vue';
import { darkTheme, NConfigProvider } from 'naive-ui';
</script>


<template>
<n-config-provider :theme="darkTheme">
    <BodyPage />
</n-config-provider>
</template>
