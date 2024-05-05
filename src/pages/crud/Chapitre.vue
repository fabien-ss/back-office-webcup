<template>

<div class="row">
    <div class="col-md-6">
      <h1>Chapitre CRUD</h1>
      <!-- Form for creating a new Chapitre -->
      <form @submit.prevent="createChapitre">
        <input class="form-control" v-model="newChapitre.chapitre" placeholder="Chapitre Name" required />
        <base-button slot="footer" type="primary" @click="createChapitre" fill>Save</base-button>
      </form>
      </div>
      <div class="col-md-6">
      <!-- List of Chapitres -->
      <table class="table">
        <th>
            <tr>Titre</tr>
        </th>
        <tr v-for="chapitre in chapitres" :key="chapitre.idChapitre">
           <td>
               {{ chapitre.chapitre }}
           </td> 
           <td style="width: 40%;">
                <a>
                   <base-button slot="footer" type="primary" @click="ajouterQuestion(chapitre)" fill>Ajouter Question</base-button>
                </a>
                <a>
                   <base-button slot="footer" type="primary" @click="ajouterLecon(chapitre)" fill>Ajouter leçon</base-button>
                </a>
           </td>

        </tr>
      </table>
    </div>
</div>
  </template>
  
  <script>
  import axios from 'axios';
    import { API_URL } from '../../variable/variable.ts';
  
  export default {
    name: "Chapitre",
    data() {
      return {
        newChapitre: { chapitre: '' },
        chapitres: [],
      };
    },
    methods: {
        ajouterQuestion(chapitre){
            localStorage.setItem("currentChapitre", JSON.stringify(chapitre))
            window.location.replace(process.env.BASE_URL+"#/crud/ajouterQuizz")  
        },
        ajouterLecon(chapitre){
            localStorage.setItem("currentChapitre", JSON.stringify(chapitre))
            window.location.replace(process.env.BASE_URL+"#/crud/ajouterLecon");
        },
      async fetchChapitres() {
        try {
          const response = await axios.get(API_URL + '/chapitres');
          this.chapitres = response.data;
        } catch (error) {
          console.error('Failed to fetch chapitres:', error);
        }
      },
      async createChapitre() {
        try {
          await axios.post(API_URL +  '/chapitres', this.newChapitre);
          this.newChapitre.chapitre = '';
          this.fetchChapitres();
        } catch (error) {
          console.error('Failed to create chapitre:', error);
        }
      },
      async editChapitre(chapitre) {
        // Implement editing logic here
      },
      async deleteChapitre(id) {
        try {
          await axios.delete(`${API_URL}/api/chapitres/${id}`);
          this.fetchChapitres();
        } catch (error) {
          console.error('Failed to delete chapitre:', error);
        }
      },
    },
    mounted() {
      this.fetchChapitres();
    },
  };
  </script>
  