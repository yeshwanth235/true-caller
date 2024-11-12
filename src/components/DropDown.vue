<template>
 <div class="relative inline-block text-left w-full sm:w-cw">
   <button
     @click="toggleDropdown"
     class="inline-flex justify-between w-full px-4 py-4 focus:outline-none text-sm font-medium bg-white rounded-md shadow-sm hover:bg-gray-50"
   >
    <div class="flex items-center justify-between w-full">
     <span class="font-semibold text-base">
      All categories
     </span>
     <span :class="`ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`">
       <img :src="chervonDown" alt="" class="w-6 h-6">
     </span>
    </div>
   </button>
   <div
     v-if="isOpen"
     class="absolute z-10 mt-2 w-cw bg-white rounded-md shadow-lg overflow-hidden"
     @blur="closeDropdown"
   >
     <ul class="max-h-40 overflow-y-auto">
       <li
         v-for="(item, index) in categories"
         :key="index"
         class="px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
         @click="selectItem(item)"
       >
         {{ item.name }}
       </li>
     </ul>
   </div>
 </div>
</template>

<script setup>
// icons
import chervonDown from '@/assets/chervon.svg'

import { ref } from 'vue';

const props = defineProps(['categories'])
const emit = defineEmits(['category'])

const isOpen = ref(false);

function toggleDropdown() {
 isOpen.value = !isOpen.value;
}

function closeDropdown() {
 isOpen.value = false;
}

function selectItem(item) {
 emit('category', item)
 closeDropdown();
}
</script>

<style>
/* Custom directive to handle click outside */
</style>
