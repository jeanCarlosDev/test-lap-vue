<template>
  <div class="justify-center row col-xl-12 col-lg-12">
    <div class="justify-center row col-xl-12 col-lg-12">
      <div class="m-5">
        <q-input
          stack-label="Stack label"
          v-model="first_name">
        </q-input>
      </div>
      <div class="m-5">
        <q-input
          stack-label="Stack label dois"
          v-model="last_name">
        </q-input>
      </div>
      <div class="m-5">
        <q-input
          stack-label="Stack label tres"
          v-model="participation">
        </q-input>
      </div>
      <q-btn
        class="btn-fixed-width"
        outline
        @click="submitPayload"
        :color="primaryColor"
        label="SEND"
        size="md"/>
    </div>
    <div class="justify-center row col-xl-12 col-lg-12">
      <div>
        <doughnutchart :labels="chartLabel" :data="chartData"></doughnutchart>
      </div>
      <q-table
        :data="table"
        :columns="columns"
      >
        <template slot="col-message" slot-scope="cell">
          <span class="light-paragraph">{{cell.data}}</span>
        </template>
        <template slot="col-source" slot-scope="cell">
          <div v-if="cell.data === 'Audit'" class="my-label text-white bg-primary">
            Audit
            <q-tooltip>Some data</q-tooltip>
          </div>
          <div v-else class="my-label text-white bg-negative">{{cell.data}}</div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { QInput, QTable } from 'quasar'
import Doughnutchart from './../components/Douhnutchart'
import axios from './../plugins/axios'

export default {
  name: 'PageIndex',
  data: () => ({
    first_name: '',
    last_name: '',
    participation: '',
    table: {},
    chartData: [85, 55, 45, 95, 65, 80, 20, 105, 10],
    chartLabel: [],
    config: {
        title: 'Data Table',
        refresh: true,
        noHeader: false,
        columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 2,
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: '50px',
        responsive: true,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500]
        },
        selection: 'multiple'
      },
    columns: [
       {
          label: 'ID',
          field: 'id',
          width: '80px',
          sort: true,
          type: 'string'
        },
        {
          label: 'First Name',
          field: 'first_name',
          width: '80px',
          sort: true,
          type: 'string'
        },
        {
          label: 'Last Name',
          field: 'last_name',
          width: '80px',
          sort: true,
          type: 'string'
        },
        {
          label: 'Participation',
          field: 'participation',
          width: '80px',
          sort: true,
          type: 'number'
        }
    ]
  }),
  components: {
    QInput,
    QTable,
    Doughnutchart
  },
  methods: {
    submitPayload () {
      let payLoad = {
        first_name: this.first_name,
        last_name: this.last_name,
        participation: this.participation
      }
      this.$axios.post('http://localhost:3000/employee/save',payLoad)
    },

    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  computed: {
    primaryColor () {
      return 'primary'
      // return this.firstInput + this.secondInput
    },
    emitEvent () {
      console.log('first input mudou')
      this.$emit('input mudou', this.firstInput)
      return this.firstInput
    }
  },
  mounted: function() {


    this.$nextTick(function() {
    this.chartData = [85, 55, 45, 95, 65, 80, 20, 105, 10]

    console.log("ENTROU PORRA");
      const employees = this.$axios.get('http://localhost:3000/employee/getAll')
      .then(response => {
        console.log(response.data)
        this.table = response.data;

        // response.data.forEach(data => {
        //   console.log(data.first_name)
        //   this.chartLabel.push(data.first_name + ' ' + data.last_name);
        //   this.chartData.push(data.participation);
        // })

        console.log(this.chartData)


      })
    })



  }
}
</script>

<style>
.m-5 {
  margin: 5px;
}
.btn-fixed-width {
  width: 150px;
  height: 60px;
}
</style>
