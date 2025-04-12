// 导入 echarts 主库
import * as echarts from "echarts"
// 声明 process.client（为了让 TypeScript 不报错）
// 在 Nuxt 中，process.client 表示是否处于客户端运行环境
declare const process: {
  client: boolean;
}

// 导出一个 composable，用于封装 echarts 的初始化和操作逻辑
export const useEcharts = () => {
  // 图表容器的 DOM 引用（挂载到页面上的 <div ref="chartRef">）
  const chartRef = ref<HTMLElement | null>(null)

  // 图表实例对象（echarts.init 的返回值）
  let chartInstance: echarts.ECharts | null = null

  // 初始化图表，支持普通图表或词云（wordcloud）
  const initChart = async (type?: "wordcloud") => {
    if (!chartRef.value) return // 容器还没挂载，跳过

    // 如果是词云图表，并且是在客户端环境下，动态加载 echarts-wordcloud 插件
    if (type === "wordcloud" && process.client) {
      await import("echarts-wordcloud")
    }

    // 初始化 echarts 实例，绑定到 DOM 容器上
    chartInstance = echarts.init(chartRef.value)
  }

  // 设置图表的配置项（option）
  const setOptions = (options: any) => {
    chartInstance?.setOption(options)
  }

  // 响应窗口大小变化，重置图表大小
  const resize = () => {
    chartInstance?.resize()
  }

  // 组件挂载时绑定 resize 事件监听
  onMounted(() => {
    if (process.client) {
      window.addEventListener("resize", resize)
    }
  })

  // 组件销毁前解绑事件监听，并销毁 echarts 实例释放资源
  onBeforeUnmount(() => {
    if (process.client) {
      window.removeEventListener("resize", resize)
      chartInstance?.dispose()
    }
  })

  // 返回方法和 DOM 引用，供组件内使用
  return {
    chartRef,     // DOM 引用，组件中通过 ref="chartRef" 绑定
    initChart,    // 初始化图表方法
    setOptions,   // 设置图表配置项方法
    resize        // 手动触发图表 resize
  }
}
