<template>
    <div>
        <div>【大区数据信息】</div>
        <div ref="target" class="w-full h-full"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
const props = defineProps({
    data: {
        type:Object,
        required:true
    },
})
let myChart = null
const target = ref(null)
// 构建option配置对象
const renderChart = () => {
    const option = {
        // X轴展示数据
        xAxis: {
            show: false,
            // x方向作为值展示
            type: 'value',
            // 设置最大值的配置
            max: function (value) {
                // 动态最大值设置为所有数据中的最大值1.2倍，防止样式问题
                return parseInt(value.max * 1.2)
            }
        },
        // Y轴展示数据
        yAxis: {
            // 作为列名展示
            type: 'category',
            // 列名数组，默认从下到上
            data: props.data.regions?.map((item) => item.name),
            // 反向展示
            inverse: true,
            // 不展示线
            axisLine: { show: false },
            // 不展示刻度
            axisTick: { show: false },
            // 展示列名并且label颜色设置
            axisLabel: { color: '#9eb1cd' },
        },
        // 图标绘制位置，对应上下左右
        grid: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            // 标签包含进去
            containLabel: true
        }, 
        // 核心配置
        series: [
            {
                // 柱形图
                type: 'bar',
                // 展示的数据
                data: props.data.regions?.map((item) => ({
                    name: item.name,
                    value: item.value
                })),
                // 柱状条背景开关
                showBackground: true,
                // 柱状条背景色
                backGroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                },
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
                    position: 'right',
                    textStyle: {
                        color: '#fff',
                    }
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
watch(() => props.data, () =>{
    renderChart()
})
</script>
<style scoped land="css"></style>