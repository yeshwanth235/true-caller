<template>
 <div class="bg-white" @click="redirectPage(cardInfo.slug)">
  <div class="flex items-center h-14 p-4">
   <span :class="`w-3 h-3 mr-2 rounded-full ${colors[color]}`"></span>
   <p class="font-semibold font-sans text-base">{{ cardCategory }}</p>
  </div>
  <div>
   <img class="w-full sm:w-cw h-img-card object-cover" :src="cardInfo.post_thumbnail.URL" :alt="cardInfo.slug">
  </div>
  <div class="p-4">
   <div class="font-sans h-16">
    <p class="truncate font-semibold text-lg text-gray-900">
     {{ cardInfo.title }}
    </p>
    <span class="text-slate-400 text-sm">
     {{ timeDifference }}
    </span>
   </div>
  </div>
 </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['cardInfo', 'color'])
const cardInfo = ref(props.cardInfo)
const cardCategory = ref('')
cardCategory.value = Object.keys(props.cardInfo.categories)[0]
const timeDifference = ref('')
const colors = ['bg-sky-blue', 'bg-purple', 'bg-teal', 'bg-coral-red']


const timeDifferenceFunc = () => {
 const givenDate = new Date(cardInfo.value.date)
 const presentDate = new Date()
 const diffMs = presentDate - givenDate;
 const minutes = Math.floor(diffMs / (1000 * 60));
 const hours = Math.floor(diffMs / (1000 * 60 * 60));
 const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
 const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
 let value = ''
 if (minutes < 60) {
    value = `${minutes} mins ago`;
  } else if (hours < 24) {
    value = `${hours} hours ago`;
  } else if (days < 30) {
    value = `${days} days ago`;
  } else {
    value = `${months} months ago`;
  }
  timeDifference.value = value
}

const redirectPage = (slug) => {
  const path = window.location.origin + `/about/${slug}`
  window.open(path)
}

timeDifferenceFunc()
</script>
