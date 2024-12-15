<template>
<body>
  <form @submit.prevent=addNarudzba class="w-full max-w-sm" >
    <br />
    <h2 class="font-bold tracking-tight text-gray-900 ">Naruči pizzu:</h2>
    
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label for="ime" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Ime</label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="narudzba.ime"
          id="ime"
          class="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Ime"
        />
      </div>
    </div>

    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label for="prezime" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Prezime</label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="narudzba.prezime"
          id="prezime"
          class="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Prezime"
        />
      </div>
    </div>

    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label for="telefon" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Telefon</label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="narudzba.telefon"
          id="telefon"
          class="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Telefon"
        />
      </div>
    </div>

    <div v-if="pizze" class="md:flex md:items-center mb-6">
      <label for="pizza" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Odaberite pizzu</label>
      <select
        v-model="narudzba.pizza_stavke[0].naziv"
        id="pizza"
        class="md:w-1/3 bg-gray-50 border border-gray-300 rounded-lg p-2.5"
      >
        <option v-for="p in pizze" :key="p.id" :value="p.naziv">
          {{ p.naziv }}
        </option>
      </select>
    </div>

    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label for="kolicina" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Količina</label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="narudzba.pizza_stavke[0].kolicina"
          id="kolicina"
          class="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
          type="number"
          placeholder="Količina"
        />
      </div>
    </div>

    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label for="velicina" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Veličina</label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="narudzba.pizza_stavke[0].velicina"
          id="velicina"
          class="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Veličina"
        />
      </div>
    </div>

    <div class="md:flex md:items-center mb-6">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  </form>
</body>

</template>

<script>
import axios from 'axios'
import {ref, onMounted} from 'vue'


const pizze = ref(null)
const narudzba = ref({
      ime: "",
      prezime: "",
      telefon: "",
      pizza_stavke: [
        {
          naziv: "",
          kolicina: "",
          velicina: "",
        },
      ],
      ukupnaCijena: 0,
    });


 
export default {
  setup() {
    const addNarudzba = async()=>{
        const novanarudzba = { 
            ime: narudzba.value.ime, 
            prezime: narudzba.value.prezime, 
            telefon: narudzba.value.telefon, 
            pizza_stavke:[ 
            {
              naziv: narudzba.value.pizza_stavke[0].naziv, 
              kolicina: narudzba.value.pizza_stavke[0].kolicina, 
              velicina: narudzba.value.pizza_stavke[0].velicina, 
            }, 
            ], 
          ukupnaCijena: 0, 
        };  
        try{
          await axios.post('http://localhost:3000/narudzba', novanarudzba)
          alert("Narudzba je uspjesna!")
        }
        catch(e){
          alert('Nesto nije u redu', e)
        }
}
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
        pizze, narudzba, addNarudzba
    }
} 
}
</script>
