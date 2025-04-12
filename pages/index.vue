<template>
  <div v-if="data">
    <Dashboard :data="data" />
  </div>
  <div v-else class="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
    <!-- 全屏模糊背景 -->
    <div class="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 
              opacity-30 blur-xl animate-pulse"></div>

    <!-- 主要内容 -->
    <div class="relative z-10 text-center space-y-8">
      <!-- 放大的旋转动画 -->
      <svg class="animate-spin h-20 w-20 mx-auto text-blue-600" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
        <path fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.418 0 8-3.582 8-8 0-.729-.117-1.433-.337-2.091L8.337 12.909A7.93 7.93 0 006 17.291z"
          class="opacity-75" />
      </svg>

      <!-- 放大的文字 -->
      <p class="text-gray-800 text-3xl font-bold tracking-wide animate-pulse">
        数据加载中...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getVisualization } from '~/api/visualization'
const data = ref()

const loadData = async () => {
  try {
    const response = await getVisualization()
    console.log('接口返回的数据:', response)
    data.value = response
  } catch (err) {
    console.error('接口获取错误', err)
  }
}

onMounted(async () => {
  await loadData()
  const interval = setInterval(loadData, 3000)
  onUnmounted(() => clearInterval(interval))
})

</script>