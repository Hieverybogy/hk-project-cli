<template>
  <div ref="a">
    <el-button>123412</el-button>
  </div>
  <test></test>
</template>

<script setup >
import test from '@/components/test.vue'
import utils from '@/utils/utils'
import { ref } from 'vue'
import {fetchShopPageData} from '@/api/aaa'
fetchShopPageData({})
console.log(utils.isNull(123))

const a = ref(null)
</script>

<style lang="less" scoped>

</style>