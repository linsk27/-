<template>
    <div class="p-6  bg-slate-800/50">
        <div class="text-slate-300 text-center">
            数据总量：
            <span ref="totalCountTarget" class="text-gradient text-7xl ml-2 mr-2 font-bold font-[Electronic]">
                {{ data.total }}
            </span>
            条记录
        </div>
        <div class="mt-3 flex flex-wrap">
            <div class="w-1/3 text-center text-slate-400 text-sm">
                华北：
                <span ref="city1" class="text-[#5DC5EF] text-3xl font-[Electronic]"> {{ data.hb }} </span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                东北：<span ref="city2" class="text-[#5DC5EF] text-3xl font-[Electronic]">{{ data.db }}</span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                华东：<span ref="city3" class="text-[#5DC5EF] text-3xl font-[Electronic]">{{ data.hd }}</span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                中南：<span ref="city4" class="text-[#5DC5EF] text-3xl font-[Electronic]">{{ data.zn }}</span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                西南：<span ref="city5" class="text-[#5DC5EF] text-3xl font-[Electronic]">{{ data.xn }}</span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                西北：<span ref="city6" class="text-[#5DC5EF] text-3xl font-[Electronic]">{{ data.xb }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CountUp } from 'countup.js';
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
})

const totalCountTarget = ref<HTMLElement | null>(null)
const city1 = ref<HTMLElement | null>(null)
const city2 = ref<HTMLElement | null>(null)
const city3 = ref<HTMLElement | null>(null)
const city4 = ref<HTMLElement | null>(null)
const city5 = ref<HTMLElement | null>(null)
const city6 = ref<HTMLElement | null>(null)
// 初始化 CountUp 实例
onMounted(() => {
    const initializeCountUp = (target: HTMLElement | null, value: number) => {
        if (target) {
            new CountUp(target, value, { duration: 1 }).start() // 动画持续时间设置为 2 秒
        }
    }

    // 初始化总数
    initializeCountUp(totalCountTarget.value, props.data.total)
    // 初始化各城市数据
    initializeCountUp(city1.value, props.data.hb)
    initializeCountUp(city2.value, props.data.db)
    initializeCountUp(city3.value, props.data.hd)
    initializeCountUp(city4.value, props.data.zn)
    initializeCountUp(city5.value, props.data.xn)
    initializeCountUp(city6.value, props.data.xb)
})
</script>
<style scoped land="css"></style>