<template>
    <ClientOnly>
        <div>【关键词条】</div>
        <div ref="chartRef" class="w-full h-full"></div>
    </ClientOnly>
</template>
<script setup lang="ts">
const { chartRef, initChart, setOptions } = useEcharts()
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
})
const randomRGB = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r},${g},${b})`

}

const getOption = () => (
    {
        series: [
            {
                type: 'wordCloud',
                // 文字大小范围
                sizeRange: [8, 46],
                // 文字旋转
                rotationRange: [0, 0],
                gridSize: 0,
                layoutAnimation: true,
                textStyle: {
                    color: randomRGB
                },
                // 高亮字体
                emphasis: {
                    textStyle: {
                        fontWeight: 'bold',
                        color: '#000'
                    }
                },
                data: props.data.datas
            }
        ]
    }
)

const renderChart = async () => {
    await nextTick() // 确保 DOM 已挂载
    await initChart('wordcloud')
    setOptions(getOption())
}

onMounted(() => {
  renderChart()
})

watch(() => props.data, renderChart)
</script>
<style scoped land="css"></style>