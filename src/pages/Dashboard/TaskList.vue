<template>
  <div class="server" v-html="renderSystemInfo(systemInfo)">
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import { API_URL } from "../../variable/variable.ts";

export default {
  data() {
    return {
      systemInfo: {
      }
    };
  },
  mounted(){
    this.fetchSysInfo();
  },
  methods: {
    async fetchSysInfo(){
      this.systemInfo = await (await fetch(`${API_URL}/server/system-info`)).json()
    },
    renderSystemInfo(systemInfo) {
      let html = '';
      for (const key in systemInfo) {
        if (typeof systemInfo[key] === 'object') {
          html += `<div class="details"><div class="key details_child">${key}</div><div class="value details_child">${this.renderSystemInfo(systemInfo[key])}</div></div>`;
        } else {
          html += `<div class="details"><div class="key details_child">${key}</div><div class="value details_child">${systemInfo[key]}</div></div>`;
        }
      }
      return html;
    }
  },
  components: {
    BaseTable,
  },
};
</script>

<style>
.server{

  width: 100%;
  height: 40%;
  display: block;
  overflow: scroll;

  .details{
    color: white;
    margin-top: 2%;
    width: 100%;
    display: flex;
    border-bottom: 1px solid white;
    min-height: 40px;

    .details_child{
    }

    .key{
      width: 40%;

    }
    .value{
      width: 100%;

      min-height: 40px;
    }
  }
}
</style>
