<template>
  <base-table
    :data="tableData"
    :columns="tableColumns"
    thead-classes="text-primary"
  >
  </base-table>
</template>
<script>
import { BaseTable } from "@/components";
import { API_URL } from "../../variable/variable.ts";
export default {
  data(){
    return {
      tableColumns: ["pid", "user", "cpu", "memory", "time", "command"],
      tableData: []
    }
  },
  components: {
    BaseTable,
  },
  async mounted(){
    this.table();
    this.inntervalId = setInterval(() => {
      this.table(); 
    }, 10000);
  },
  methods: {
    async table() {
      this.tableData = await (await fetch(`${API_URL}/server/running-processes`)).json();
    },
  },
};
</script>
<style></style>
