import { defineStore } from 'pinia';
import axios from 'axios';

export const useCardStore = defineStore('card', {
  state: () => ({
    cardInfo: null as ICard | null,
    cardBalance: null as IBalance | null,
  }),
  actions: {
    async fetchCardInfo(serial: string) {
      try {
        const response = await axios.get(`http://localhost:8080/api/tarjeta/informacion/${serial}`);
        this.cardInfo = response.data;
      } catch (error) {
        console.error('Error fetching card info:', error);
        throw error;
      }
    },
    async fetchCardbalance(serial: string) {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/api/tarjeta/saldo/${serial}`);
        this.cardBalance = response.data;
      } catch (error) {
        console.error('Error fetching card info:', error);
        throw error;
      }
    },
  },
});


export interface ICard {
    cardNumber:   string;
    profileCode:  string;
    profile:      string;
    profile_es:   string;
    bankCode:     string;
    bankName:     string;
    userName:     string;
    userLastName: string;
}

export interface IBalance {
    card:               string;
    balance:            number;
    balanceDate:        Date;
    virtualBalance:     number;
    virtualBalanceDate: Date;
}