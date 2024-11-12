<template>
 <div class="pb-8 sm:pb-20 bg-light-lavender">
  <img :src="mainImg" alt="feature-image" class="h-img-detail-sm w-full object-cover sm:h-img-detail">
 </div>
 <div class="bg-light-lavender">
  <div class="flex flex-col items-center">
    <div class="mb-4 sm:mb-8 px-10 sm:px-28 text-2xl sm:text-6xl font-bold font-sans sm:container">
     {{ title }}
    </div>
  </div>
  <div class="flex flex-col sm:items-center">
   <div v-if="author && author.avatar_URL" class="mb-4 sm:mb-8 px-10 sm:px-28 flex flex-row justify-start items-center sm:container">
    <div class="mr-4">
     <img :src="author.avatar_URL" alt="author" class="rounded-full w-12 h-12 sm:w-max sm:h-max">
    </div>
    <div>
     <p class="font-semibold">{{ author.name  }}</p>
     <p class="text-slate-400 text-sm font-medium">{{ date }}</p>
    </div>
   </div>
  </div>
  <div class="flex flex-col sm:items-center">
   <div class="rich-text-content">
    <div v-html="content" class="sm:container px-10 sm:px-28 pb-24">
    </div>
   </div>
  </div>
 </div>
</template>

<script setup>
// other imports
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const content = ref()
const title = ref()
const date = ref('')
const author = ref({})
const mainImg = ref()

const getDetails = async (slug) => {
 await axios.get(`https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/slug:${slug}?fields=featured_image,title,author,content,date`)
  .then(response => {
   console.log(response)
   content.value = response.data.content
   title.value = response.data.title
   author.value = response.data.author
   mainImg.value = response.data.featured_image.split('?')[0]
   date.value = getTime(response.data.date)
  }).catch(err => {
   console.log("error: ", err)
  })
}

const getTime = (timestamp) => {
   const newDate = new Date(timestamp)
   const year = newDate.getFullYear()
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
   const month = months[newDate.getMonth()].slice(0, 3)
   const date = newDate.getDate() === 2 || newDate.getDate() === 3 ? newDate.getDate() + 'nd' : newDate.getDate() === 1 ? newDate.getDate() + 'st' : newDate.getDate() + 'th'
   return month + ' ' + date + ', ' + year
}

const slug = route.path.split('/').slice(-1)[0]

onMounted(() => {
 getDetails(slug)
})
</script>

<style scoped>
.rich-text-content {
 ::v-deep .wp-block-heading {
  @apply mt-8 font-semibold font-sans;
  font-size: 26px;
 }
 ::v-deep p {
  @apply text-gray-600 my-2;
  font-size: 18px;
 }
 ::v-deep img {
  width: 100%;
  margin-top: 22px;
  object-fit: cover;
 }

 ::v-deep ul {
  @apply list-disc ml-4;
 }

 ::v-deep .wp-block-buttons {
  @apply bg-indigo-500 mt-6 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-center;
  ::v-deep .has-background {
   @apply bg-transparent;
  }
  ::v-deep a {
   @apply bg-transparent !important;
  }
 }
 
 ::v-deep .wp-block-embed {
  ::v-deep iframe {
    @apply w-min sm:w-full;
  } 
 }
}
</style>