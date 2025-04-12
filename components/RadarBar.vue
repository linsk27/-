<template>
    <ClientOnly>
        <div>【云端报警风险】</div>
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
const getOption = () => (
    {
        // 雷达坐标系配置
        radar: {
            // 坐标系（外部）名字配置
            name: {
                textStyle: {
                    color: '#05D5FF',
                    fontSize: 14
                }
            },
            // 雷达图形状
            shape: 'polygon',
            center: ['50%', '50%'],
            radius: '80%',
            // 起始位置(开始角度)
            startAngle: 120,
            // 轴线配置
            axisLine: {
                lineStyle: {
                    color: 'rgba(5,213,255,0.8)'
                }
            },
            // 网格线，为true才能形成闭环
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: 'rgba(5,213,255,0.8)'
                }
            },
            // 指示器,就是name部分的坐标系（外部）名字
            indicator: props.data.risks.map((item: { name: any }) => ({
                name: item.name,
                max: 100
            })),
            // 拆分区域，false网格内颜色区分更明显
            splitArea: {
                show: false
            }
        },
        // 坐标极点
        polar: {
            center: ['50%', '50%'],
            radius: '0%'
        },
        // 坐标角度
        angleAxis: {
            min: 0,
            // 分割线分割间隔
            interval: 5,
            // 刻度显示是否为逆时针增长,
            clockwise: false
        },
        // 径向轴
        radiusAxis: {
            min: 0,
            interval: 20,
            splitLine: {
                show: false
            }
        },
        // 图表核心配置
        series: [
            {
                type: 'radar',
                // 指定形状
                symbol: 'circle',
                // 内部数据拐角大小
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: '#05D5FF'
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#05D5FF',
                        opacity: 0.5
                    }
                },
                lineStyle: {
                    width: 2,
                    color: '#'
                },
                label: {
                    normal: {
                        // 内部数据文本
                        show: true,
                        color: '#fff'
                    }
                },
                data: [
                    {
                        value: props.data.risks.map((item: { value: any }) => item.value)
                    }
                ]
            }
        ]
    }
)

const renderChart = async () => {
    await initChart()
    setOptions(getOption())
}

onMounted(renderChart)

watch(() => props.data, renderChart)

</script>
<style scoped land="css"></style>