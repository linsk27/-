<template>
    <div>
        <div>【服务资源占用比】</div>
        <div ref='target' class='w-full h-full'></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
})
let myChart = null
const target = ref(null)
// 构建option配置对象
const renderChart = () => {
    const option = {
        // X轴展示数据
        xAxis: {
            type: 'category',
            show: true,
            data: props.data.servers?.map((item) => item.name),
            // 展示列名并且label颜色设置
            axisLabel: { color: '#9eb1cd' },
        },
        // Y轴展示数据
        yAxis: {
            type: 'value',
            show: false,
            // 设置最大值的配置
            max: function (value) {
                // 动态最大值设置为所有数据中的最大值1.2倍，防止样式问题
                return parseInt(value.max * 1.2)
            }
        },
        // 图标绘制位置，对应上下左右
        grid: {
            top: 16,
            right: 0,
            left: -26,
            bottom: 26,
            // 标签包含进去
            containLabel: true
        },
        // 核心配置
        series: [
            {
                type: 'bar',
                // 展示的数据
                data: props.data.servers?.map((item) => ({
                    name: item.name,
                    value: item.value
                })),
                // 每个轴的样式
                itemStyle: {
                    color: '#5d98CE',
                    barBorderRadius: 10,
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowBlur: 5,
                },
                // 柱子宽度
                barWidth: 12,
                // 字体的显示
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#fff',
                    },
                    formatter:'{c}%'
                }
            }
        ]
    }
    myChart.setOption(option)
}
onMounted(() => {
    myChart = echarts.init(target.value)
    renderChart()
})
watch(() => props.data, () => {
    renderChart()
})
</script>
<style scoped land="css"></style>