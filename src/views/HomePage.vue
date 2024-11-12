<template> 
 <div class="relative">
  <div>
   <img class="h-img-home-sm w-full object-cover sm:h-img-home" :src="homePageImage" alt="home-page-image">
  </div>
  <div class="absolute inset-0 flex items-center justify-center">
   <p class="text-2xl font-bold text-white font-sans sm:text-6xl">The Truecaller Blog</p>
  </div>
 </div>
 <div class="bg-light-lavender px-10 pt-10 sm:pt-24 sm:pl-24">
  <h1 class="mb-5 text-2xl font-bold font-sans sm:text-6xl sm:mb-10">Latest articles </h1>
  <div class="mb-4">
    <DropDown :categories="categories" v-if="!!categories.length" @category="getCategoryBasedPosts"></DropDown>
  </div>
  <div class="flex flex-wrap">
   <div v-for="post in posts" :key="post.post_thumbnail.ID"
    class="w-full sm:w-cw h-ch rounded-lg shadow-lg sm:mr-8 mb-8">
    <Card :cardInfo="post" :color="colorPicker"></Card>
   </div>
  </div>
  <div v-if="page.total > 1" class="w-full flex justify-center pb-6 sm:p-10">
    <Pagination :totalPages="page.total" :initialPage="1" @page-change="onPageChange" />
  </div>
 </div>
</template>

<script setup>
// vue imports
import { ref, onMounted } from 'vue'

// images
import homePageImage from '@/assets/header.jpg'

// components
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
import DropDown from '@/components/DropDown.vue'

// other imports
import axios from 'axios'
import { computed } from 'vue'

// variables
let posts = ref([])
const counter = ref(0)
const page = ref({
  current: 1,
  total: 0
})

const categories = ref([])
const category = ref('')
const loaderFlag = ref(false)

const getPosts = async () => {
 await axios.get(`https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?fields=slug,categories,post_thumbnail,title,date&number=20&page=${page.value.current}&category=${category.value}`)
  .then(response => {
   posts.value = response.data.posts
   page.value.total = Math.ceil(response.data.found/20)
  }).catch(err => {
   console.log('error in getPosts: ', err)
  })
}

const getCategories = async () => {
 await axios.get('https://public-api.wordpress.com/rest/v1.1/sites/107403796/categories')
  .then(response => {
   categories.value = response.data.categories
  }).catch(err => {
   console.log('error in getCategories: ', err)
  })
}

const getCategoryBasedPosts = (value) => {
  category.value = value.slug
  page.value = {
    current: 1,
    total: 0
  }
  getPosts()
}

const colorPicker = computed(() => {
  counter.value++
 if(counter.value === 4) {
  counter.value = 0
 }
  return counter.value
})

const onPageChange = ((pageNo) => {
  page.value.current = pageNo
  getPosts()
})

onMounted(() => {
 getPosts()
 getCategories()
})

defineExpose({
 posts
})
</script>