<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{ $t("dashboard.totalShipments") }}
                </h5>
                <h2 class="card-title">{{ $t("dashboard.performance") }} {{ cpu }} </h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle" :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories" :key="option"
                    class="btn btn-sm btn-primary btn-simple" :class="{ active: bigLineChart.activeIndex === index }"
                    :id="index">
                    <input type="radio" @click="initBigChart(index)" name="options" autocomplete="off"
                      :checked="bigLineChart.activeIndex === index" />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%" ref="bigChart" chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData" :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops" :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.totalShipments") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> RAM - {{ this.ram }}
            </h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%" chart-id="purple-line-chart" :chart-data="purpleLineChart.chartData"
              :gradient-colors="purpleLineChart.gradientColors" :gradient-stops="purpleLineChart.gradientStops"
              :extra-options="purpleLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.dailySales") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-info"></i> Total user
            </h3>
          </template>
          <div class="chart-area number">
            <h1 class="big-police">{{ countUser }}</h1>
            <!--
            <bar-chart style="height: 100%" chart-id="blue-bar-chart" :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops" :extra-options="blueBarChart.extraOptions">
            </bar-chart>

            -->
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.completedTasks") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-send text-success"></i> Connected user
              <button class="play" @click=""><i class="tim-icons icon-triangle-right-17"></i></button>
            </h3>
          </template>
          <div class="chart-area number">
            <h1 class="big-police connected">{{ this.connectedUser }}</h1>

            <!---
            <line-chart style="height: 100%" chart-id="green-line-chart" :chart-data="greenLineChart.chartData"
              :gradient-stops="greenLineChart.gradientStops" :extra-options="greenLineChart.extraOptions">
            </line-chart>
            -->
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{ 'text-right': isRTL }">
          <template slot="header">
            <h6 class="title d-inline">
              {{ $t("dashboard.tasks", { count: 5 }) }}
            </h6>
            <p class="card-category d-inline">{{ $t("dashboard.today") }}</p>
          </template>
          <task-list></task-list>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{ 'text-right': isRTL }">
          <h4 slot="header" class="card-title">
            {{ $t("dashboard.simpleTable") }}
          </h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";

import {API_URL} from "../variable/variable.ts"

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
  },
  data() {
    return {
      socket: io("http://localhost:4000", { path: "/wbcp/socket"}),
      connectedUser: 0,
      countUser: 0,
      ram: 0,
      cpu: 0,
      bigLineChart: {
        allData: [
          [],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: Array(20).fill('.'),
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: Array(10).fill('.'),
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT",   "NOV"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    },
  },
  methods: {
    async fetchUptime(){
      await this.socket.emit("uptime")
    }
    ,
    async fetchUserCount() {
      const url = `${API_URL}/users/count`;
      console.log("user ", url)
      const request = await fetch(url);
      this.countUser = (await request.json()).count;
    },
    async getCpuUsage() {
      let cpuUsage = await fetch(`${API_URL}/server/cpu-usage`, { method: "GET" });
      let mem = await cpuUsage.json()
      //console.log("memoryUsage ", mem);
      const percentage = mem.cpuPercentage * 10;
      if (this.bigLineChart.allData[0].length > 20) {
        this.bigLineChart.allData[0] = [];
      }
      this.cpu = percentage
      this.bigLineChart.allData[0].push(percentage);
    },
    async getMemoryUsage() {
      let memoryUsage = await fetch(`${API_URL}/server/memory-usage`);
      let mem = await memoryUsage.json();
      this.ram = mem.memoryUsage;
      if (this.purpleLineChart.chartData.datasets[0].data.length > 8) {
        this.purpleLineChart.chartData.datasets[0].data = []
      }
      this.purpleLineChart.chartData.datasets[0].data.push(this.ram);
    },
    initRamUsage() {
      let ram = {
        datasets: [
          {
            label: "Data",
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.purpleLineChart.chartData.datasets[0].data,
          },
        ],
        labels: Array(10).fill('.'),
      }
      this.purpleLineChart.chartData = ram

    }
    ,
    initBigChart(index) {
      /*if(data.length > 7){
        data = this.subArray(data, 3, 7)
        console.log("data ", data)
      }*/
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: Array(20).fill('.'),
      };
      //  this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    subArray(array, start, end) {
      let newArray = [];
      for (let i = start; i < end; i++) {
        newArray.push(array[i]);
      }
      return newArray;
    }
  },
  mounted() {
    //this.fetchUptime()
    /*
    this.socket.emit("uptime")
    this.socket.on("uptime-recall", (data) =>{
      console.log("uptime",data);
    
      this.socket.emit("uptime");
    })


    this.socket.emit("memory-usage")
    this.socket.on("memory-usage-recall", (data) =>{
      console.log("memory-usage ",data);
      this.ram = data.memoryUsage;
      if (this.purpleLineChart.chartData.datasets[0].data.length > 8) {
        this.purpleLineChart.chartData.datasets[0].data = []
      }
      this.purpleLineChart.chartData.datasets[0].data.push(this.ram);
      this.initRamUsage()
      this.socket.emit("memory-usage")
    })

    this.socket.emit("cpu-usage")
    this.socket.on("cpu-usage-recall", (data) =>{
      console.log("cpu-usage ",data);  
      const percentage = data.cpuPercentage * 10;
      if (this.bigLineChart.allData[0].length > 20) {
        this.bigLineChart.allData[0] = [];
      }
      this.cpu = percentage
      this.bigLineChart.allData[0].push(percentage);
      this.initBigChart(0);
      this.socket.emit("cpu-usage")
    })

    //running-processes


    this.socket.emit("running-processes")
    this.socket.on("running-processes-recall", (data) =>{
      console.log("running ",data);

      this.socket.emit("running-processes")
    })
*/
    if(localStorage.getItem("token") == "" || localStorage.getItem("token") == null){
        window.location.replace("/login")
    }
    this.userFetchInterval = setInterval(() => {
      this.fetchUserCount();
    }, 2000);
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }

    this.intervalId = setInterval(() => {
      this.getMemoryUsage();
      this.initRamUsage()
      this.getCpuUsage();
      this.initBigChart(0);
    }, 3000);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style>
.number {
  text-align: center;

  .big-police {
    font-size: 200px;
  }

  .connected {
    color: rgb(29, 209, 29);
  }
}

.play {
  text-align: center;
  border: 0.5px solid white;
  border-radius: 5px;
  background-color: transparent;
  color: white;
  float: right;
}
</style>
