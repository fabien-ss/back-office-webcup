<template>
  <div class="card">
    <div class="card-header">
      <h5 class="title">100 Awesome Nucleo Icons</h5>
      <p class="category">
        Handcrafted by our friends from
        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
      </p>
    </div>
    <div class="card-body all-icons">
      <div class="row" v-if="tables && tables.length > 0">
        <div v-for="(table, index) in tables" :key="index"
        class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
            <div class="font-icon-detail">
              <i class="tim-icons icon-alert-circle-exc"></i>
              <p>
                <a href="/#/crud/chapitre">

                  {{ table }}
                </a>
              </p> <!-- Assuming each table has a 'name' property -->
            </div>
         
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../variable/variable.ts';

export default {
  data() {
    return {
      tables: []
    }
  },
  mounted() {
    this.fetchTable();
  },
  methods: {
    async fetchTable() {
      try {
        const url = API_URL + "/database";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.tables = await response.json();
        console.log("Received tables:", this.tables);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
