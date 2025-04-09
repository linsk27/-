<template>
  <div class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden"
    v-if="data">
    <!--左-->
    <div class="flex-1 mr-5 bg-slate-800/50 p-3 flex flex-col">
      <!--横行柱状图-->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data?.regionData ?? {}" />
      <!--雷达图-->
      <RadarBar class="h-1/3 box-border pb-4"  :data="data?.riskData?? {}"/>
      <!--关系图-->
      <Relation class="h-1/3 box-border pb-4" :data="data?.relationData?? {}" />
    </div>
    <!--中-->
    <div class="w-1/2 mr-5 flex flex-col">
      <!--数据总览图-->
      <TotalData class="bg-slate-800/50 p-3  flex-1" />
      <!--地图可视化-->
      <MapChart class="bg-slate-800/50 p-3 flex-1" />
    </div>
    <!--右-->
    <div class="flex-1  bg-slate-800/50 p-3 flex flex-col">
      <!--竖向柱状图-->
      <VerticalBar class="h-1/3 box-border pb-4" :data="data?.serverData?? {}"  />
      <!--环形图-->
      <RingBar class="h-1/3 box-border pb-4"  :data="data?.abnormalData?? {}"  />
      <!--文档云图-->
      <WordCloud class="h-1/3 box-border pb-4"  :data="data?.wordCloudData?? {}" />
    </div>
  </div>
</template>
<script setup>
import { getVisualization } from './api/visualization'
const data = ref()
const loadData = async () => {
  try {
    data.value = await getVisualization()
    console.log(data.value);
  } catch(err) {
    console.log("接口获取错误",err);
  }
}
onMounted(async() => {
  await loadData()
})
// 确保 setInterval 只在客户端运行
if (process.client) {
  const intervalId = setInterval(() => {
    loadData()
  }, 3000)

  // 组件销毁时清除计时器，防止内存泄漏
  onUnmounted(() => {
    clearInterval(intervalId)
  })
}
</script>
<style scoped land="css"></style>