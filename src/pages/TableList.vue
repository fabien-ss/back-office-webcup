<template>
  <div class="row">
    <div class="col-12">
      
      
      <card :title="table1.title">
        <button class="play"><i class="tim-icons icon-triangle-right-17" @click="fetchStandart"></i></button>
        <div class="table-responsive">
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            thead-classes="text-primary"
          >
          </base-table>
          
        </div>
      </card>
    </div>

    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <base-table
            :title="table2.title"
            :sub-title="table2.subTitle"
            :data="table2.data"
            :columns="table2.columns"
          >
          </base-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { API_URL } from "../variable/variable.ts";
import { BaseTable } from "@/components";
const tableColumns = ["id", "standart", "isNumeric"];
const tableData = [];

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        data: [],
      },
      table2: {
        title: "Table on Plain Background",
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
  methods: {
    async fetchStandart(){
      console.log("Fetch")
      const request = await fetch(`${API_URL}/standart`);
      const response = await request.json();
      console.log("Response: " + response[0])
      this.table1.data = response;
    }
  },
  mounted(){

    if(localStorage.getItem("token") == "" || localStorage.getItem("token") == null){
        window.location.replace("/login")
    }
  }
};
</script>
<style></style>
