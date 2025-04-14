<template>
  <div class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden" v-if="data">
    <!-- 左 -->
    <div class="flex-1 mr-5 bg-slate-800/50 p-3 flex flex-col">
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data?.regionData ?? {}" />
      <RadarBar class="h-1/3 box-border pb-4" :data="data?.riskData ?? {}" />
      <Relation class="h-1/3 box-border pb-4" :data="data?.relationData ?? {}" />
    </div>
    <!-- 中 -->
    <div class="w-1/2 mr-5 flex flex-col">
      <TotalData class="p-3" :data="data?.totalData ?? {}" />
      <MapChart class="bg-slate-800/50 p-3  mt-[10px] flex-1" />
    </div>
    <!-- 右 -->
    <div class="flex-1 bg-slate-800/50 p-3 flex flex-col">
      <VerticalBar class="h-1/3 box-border pb-4" :data="data?.serverData ?? {}" />
      <RingBar class="h-1/3 box-border pb-4" :data="data?.abnormalData ?? {}" />
      <WordCloud class="h-1/3 box-border pb-4" :data="data?.wordCloudData ?? {}" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

</script>
