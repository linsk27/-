<template>
    <ClientOnly>
        <div>【大区异常处理】</div>
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
const getSeriesData = () => {
    const series: { name: any; type: string; clockWise: boolean; hoverAnimation: boolean; radius: string[]; center: string[]; label: { show: boolean; } | { show: boolean; }; data: ({ value: any; name: any; } | { value: number; itemStyle: { color: string; borderWidth: number; }; tooltip: { show: boolean; }; hoverAnimation: boolean; })[] | ({ value: number; name: any; itemStyle: { color: string; borderWidth: number; }; tooltip: { show: boolean; }; hoverAnimation: boolean; } | { value: number; itemStyle: { color: string; borderWidth: number; }; tooltip: { show: boolean; }; hoverAnimation: boolean; })[]; silent?: boolean; z?: number; }[] = []
    props.data.abnormals.forEach((item: { name: any; value: any; }, index: number) => {
        // 上层
        series.push({
            name: item.name,
            type: 'pie',
            // 逆时针排列
            clockWise: false,
            // 取消悬浮动画
            hoverAnimation: false,
            // 实现半径依次递减
            radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
            center: ['50%', '50%'],
            label: {
                show: false
            },
            data: [
                {
                    value: item.value,
                    name: item.name
                },
                {
                    value: 1000,
                    itemStyle: {
                        color: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                    },
                    tooltip: {
                        show: false
                    },
                    hoverAnimation: false
                }
            ]
        })
        // 底层
        series.push({
            name: item.name,
            type: 'pie',
            // 不希望收到任何事件
            silent: true,
            z: 1,
            // 逆时针排列
            clockWise: false,
            // 取消悬浮动画
            hoverAnimation: false,
            // 实现半径依次递减
            radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
            center: ['50%', '50%'],
            label: {
                show: false
            },
            data: [
                {
                    value: 7.5,
                    name: item.name,
                    itemStyle: {
                        color: 'rgba(3,31,62)',
                        borderWidth: 0,
                    },
                    tooltip: {
                        show: false,
                    },
                    hoverAnimation: false
                },
                {
                    value: 2.5,
                    itemStyle: {
                        color: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                    },
                    tooltip: {
                        show: false,
                    },
                    hoverAnimation: false
                }
            ]
        })
    });
    return series
}
const getOption = () => (
    {
        // 图例配置
        legend: {
            show: true,
            // 图例颜色块形状
            icon: 'circle',
            top: '14%',
            left: '52%',
            // 图例数据文本
            data: props.data.abnormals.map((item: { name: any; }) => item.name),
            // 负数以列展示
            width: -5,
            // 色块宽高
            itemWidth: 10,
            itemHeight: 10,
            // 图例间距
            itemGap: 6,
            textStyle: {
                fontSize: 12,
                lineHeight: 5,
                color: '#fff'
            }
        },
        // 悬浮提示层
        tooltip: {
            show: true,
            // 触发器
            trigger: 'item',
            // 展示内容,a代表系列名，b代表数据名，c代表数据值,d代表百分比比例
            formatter: '{a}<br>{b}:{c}({d}%)'
        },
        yAxis: [
            {
                type: 'category',
                // 反向展示
                inverse: true,
                axisLine: {
                    show: false
                }
            }
        ],
        xAxis: [
            {
                show: false
            }
        ],
        // 由于饼图过多，通过方法进行配置
        series: getSeriesData()
    }
)

const renderChart = async () => {
    await initChart('wordcloud')
    setOptions(getOption())
}

onMounted(renderChart)

watch(() => props.data, renderChart)

</script>
<style scoped land="css"></style>