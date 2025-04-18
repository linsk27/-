<template>
    <ClientOnly>
        <div>【数据传递信息】</div>
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
        xAxis: {
            show: false,
            type: 'value'
        },
        yAxis: {
            show: false,
            type: 'value'
        },
        series: [
            {
                type: 'graph',
                // 表示不需要任何布局类型
                layout: 'none',
                // 该系列需要使用的坐标系：“二维直角坐标系”
                coordinateSystem: 'cartesian2d',
                // 节点大小
                symbolSize: 26,
                z: 3,
                // 边界的萧条标签文字
                edgeLabel: {
                    // 默认
                    normal: {
                        show: true,
                        color: '#fff',
                        testStyle: {
                            fontSize: 14
                        },
                        // 文本模拟内容
                        formatter: function (params: { data: { speed: any; }; }) {
                            return params.data.speed
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',
                        color: '#5E5E5E'
                    }
                },
                // 边两端的标记类型,数据流动图标类型
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: 8,
                data: props.data.relations.map((item: { id: number; name: any; speed: any; value: any }) => {
                    if (item.id !== 0) {
                        return {
                            name: item.name,
                            category: 0,
                            active: true,
                            speed: `${item.speed}kb/s`,
                            value: item.value,
                        }
                    } else {
                        return {
                            name: item.name,
                            value: item.value,
                            symbolSize: 100,
                            itemStyle: {
                                color: {
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#157eff'
                                        },
                                        {
                                            offset: 1,
                                            color: '#35c2ff'
                                        },
                                    ]
                                }
                            },
                            label: {
                                normal: {
                                    fontSize: 14
                                }
                            }
                        }
                    }
                }),
                // 节点间的数据关系
                links: props.data.relations.map((item: { source: any; target: any; speed: any }, index: any) => ({
                    source: item.source,
                    target: item.target,
                    speed: `${item.speed}kb/s`,
                    lineStyle: {
                        normal: {
                            color: '#12b5d0',
                            // 曲线率
                            curveness: 0.2
                        }
                    },
                    label: {
                        show: true,
                        position: 'middle',
                        // 是否对文字进行偏移
                        offset: [10, 0]
                    }
                }))
            }, {
                type: 'lines',
                // 该系列需要使用的坐标系：“二维直角坐标系”
                coordinateSystem: 'cartesian2d',
                z: 1,
                // 线条的特效配置
                effect: {
                    show: true,
                    smooth: false,
                    trailLength: 0,
                    symbol: 'arrow',
                    color: 'rgba(55,155,255,0.6)',
                    symbolSize: 12
                },
                lineStyle: {
                    normal: {
                        curveness: 0.2
                    }
                },
                data: [
                    [{ coord: [0, 300] }, { coord: [50, 200] }],
                    [{ coord: [0, 100] }, { coord: [50, 200] }],
                    [{ coord: [50, 200] }, { coord: [100, 100] }],
                    [{ coord: [50, 200] }, { coord: [100, 300] }]
                ]
            }
        ]
    }
)as echarts.EChartsOption

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