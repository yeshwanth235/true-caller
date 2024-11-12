<template>
  <div class="flex items-center space-x-2">
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="text-gray-400 hover:text-blue-600 disabled:text-gray-300"
    >
      <span class="text-base sm:text-xl">&lt;</span>
    </button>

    <!-- Page Numbers -->
    <span
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      :class="[
        'px-4 py-2 sm:px-4 sm:py-2 rounded-full cursor-pointer',
        currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-600',
      ]"
    >
      {{ page }}
    </span>

    <!-- Dots and Last Page -->
    <span v-if="showEllipsis && currentPage < totalPages - 3">...</span>
    <span
      v-if="showEllipsis && currentPage < totalPages - 3"
      @click="goToPage(totalPages)"
      class="px-4 py-2 sm:px-4 sm:py-2 text-gray-600 cursor-pointer"
    >
      {{ totalPages }}
    </span>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="text-gray-400 hover:text-blue-600 disabled:text-gray-300"
    >
      <span class="text-base sm:text-xl">&gt;</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps(['totalPages', 'initialPage'])
const emit = defineEmits(['page-change'])

const currentPage = ref(props.initialPage)

watch(props.initialPage, newPage => {
  currentPage.value = newPage
})

const pages = computed(() => {
  const range = 2 // Show 4 pages before and after the current page
  const start = Math.max(currentPage.value - range, 1)
  const end = Math.min(currentPage.value + range, props.totalPages)

  const pageList = []
  for (let i = start; i <= end; i++) {
    pageList.push(i)
  }
  return pageList
})

const showEllipsis = computed(() => props.totalPages > 5)

const goToPage = page => {
  if (page > 0 && page <= props.totalPages) {
    currentPage.value = page
    emit('page-change', page)
  }
}

</script>
