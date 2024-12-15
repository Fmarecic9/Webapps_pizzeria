<template>
<div>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center"> Pizzeria - LAČAN SAN</h1>
   <pizzeView />
  <naruci-pizzu />
 
</div>
</template>

<script>
import naruciPizzu from './components/naruciPizzu.vue';
import pizzeView from './components/pizzeView.vue'


export default {
  name: "App",
  components: {
    pizzeView, naruciPizzu
  },
};

</script>


