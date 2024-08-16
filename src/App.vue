<template>
      
      <div class="browser-content">
        <h2>Ingresa el serial de tu tarjeta tullave</h2>
        <input v-model="serial" placeholder="Ingrese el serial" />
        <button @click="fetchCardInfo">Consultar</button>

        <div v-if="cardInfo">
          <h3>Nombre de propietario</h3>
          <p>{{  `${cardInfo.userName} ${cardInfo.userLastName}`  }}</p>
          
          <h3>Perfil</h3>
          <p>{{  cardInfo.profile  }}</p>


          <!-- <input v-model="cardInfo.profile" placeholder="Perfil de la tarjeta" /> -->

          <div class="balance-section">
            <div>
              <h3>Saldo</h3>
              <p> {{ cardBalance?.balance }} </p>
              <!-- <input v-model="" placeholder="$10,000" /> -->
            </div>
            <div>
              <h3>Saldo virtual</h3>
              <p>{{ cardBalance?.virtualBalance }}</p>
              <!-- <input v-model="cardBalance?.virtualBalance" placeholder="$20,000" /> -->
            </div>
          </div>
        </div>
      </div>

</template>

<script setup lang="ts" >
import { ref } from 'vue';
import { useCardStore } from './stores/cardStore';
import { storeToRefs } from 'pinia';

const cardStore = useCardStore();

const { cardBalance, cardInfo } = storeToRefs(cardStore)


const serial = ref('');

const fetchCardInfo = async () => {
  try {
    await cardStore.fetchCardInfo(serial.value);
    await cardStore.fetchCardbalance(serial.value);
  } catch (error) {
    console.error('Error fetching card info:', error);
  }
};
</script>

<style scoped>
.tullave-app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

.browser-frame {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.browser-header {
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.browser-controls span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 5px;
  background-color: #ccc;
}

.browser-address-bar {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.browser-content {
  padding: 20px;
}

input, button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.balance-section {
  display: flex;
  justify-content: space-between;
}

.balance-section > div {
  width: 48%;
}
</style>