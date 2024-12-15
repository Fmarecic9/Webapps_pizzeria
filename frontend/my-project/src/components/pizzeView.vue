<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div v-if="pizze" class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="p in pizze" :key="p.id" class="group relative">
          <img 
            :src="p.slika" 
            alt="Product Image"
            class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
          <div class="mt-4 flex justify-between">
            <div >
              <h3 class="text-sm text-gray-700">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                    {{ p.naziv }}  
              </h3>
            </div>
            <p class="text-sm font-medium text-gray-900">${{ p.cijena }}</p>
          </div>
          Sastojci:
            <span v-for="sastojak in p.sastojci" :key="sastojak"> {{sastojak}},  </span>
        </div>
        <!--
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
         Naruči pizzu
        </button>
         -->
      </div>

      <div v-else class="text-center">
        <p class="text-gray-500">No products available.</p>
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios'
import {ref, onMounted} from 'vue'

let pizze = ref(null)



export default {
    setup() {
        onMounted(async()=>{
            try{
                const response =  await axios.get ('http://localhost:3000/pizze')
                pizze.value = response.data
            }
            catch (e){
                console.error("Nije moguće dobiti do pizza", e)
            }
        });
        return{
            pizze
        }
    },
}
</script>
