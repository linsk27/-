<template>
    <ClientOnly>
        <div>【大区数据信息】</div>
        <div ref="chartRef" class="w-full h-full"></div>
    </ClientOnly>
</template>
<script setup lang="ts">
const { chartRef, initChart, setOptions } = useEcharts()
interface Region {
  name: string
  value: number
}
const props = defineProps<{
  data: {
    regions: Region[]
  }
}>()

const getOption = () => (
    {
        xAxis: {
            show: false,
            type: 'value',
            max: (value: { max: number }) => Math.floor(value.max * 1.2),
        },
        yAxis: {
            type: 'category',
            data: props.data.regions?.map(item => item.name),
            inverse: true,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#9eb1cd' },
        },
        grid: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            containLabel: true
        },
        series: [
            {
                type: 'bar',
                data: props.data.regions?.map(item => ({
                    name: item.name,
                    value: item.value
                })),
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                },
                itemStyle: {
                    color: '#5d98CE',
                    barBorderRadius: 10,
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowBlur: 5,
                },
                barWidth: 12,
                label: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: '#fff',
                    }
                }
            }
        ]
    }
)

const renderChart = async () => {
    await nextTick() // 确保 DOM 已挂载
    await initChart()
    setOptions(getOption())
}
onMounted(() => {
  renderChart()
})

watch(() => props.data, renderChart)
</script>
<style scoped land="css"></style>