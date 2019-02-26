
<template>

  <div class="justify-center row col-xl-12 col-lg-12 " >
    <div class="justify-center row col-xl-12 col-lg-12 bg-color  " >
      <div class="m-5 ">
        <q-input
          class="text-black"
          placeholder="First name "
          v-model="first_name"
          color="white"
          inverted>
        </q-input>
      </div>
      <div class="m-5 ">
        <q-input
          class="text-black"
          placeholder="Last name "
          v-model="last_name"
          color="white"
          inverted>
        </q-input>
      </div>
      <div class="m-5">
        <q-input
          class="text-black"
          placeholder="Participation"
          v-model="participation"
          color="white"
          inverted>
        </q-input>
      </div>
      <q-btn
        class="btn-fixed-width m-5 "
        outline
        @click="submitPayload"
        color="white"
        label="SEND"
        size="15px"
        />
    </div>
    <div class="justify-center row col-xl-12 col-lg-12 m-50">

       <q-table
        :data="table"
        :columns="columns">
        <template slot="col-message" slot-scope="cell">
          <span class="light-paragraph">{{cell.data}}</span>
        </template>
      </q-table>

      <div style="margin-left: 30px;">
        <doughnutchart :labels="chartLabel" :dataDou="chartData"></doughnutchart>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { QInput, QTable } from 'quasar'
import Doughnutchart from './../components/Douhnutchart'

export default {
  name: 'PageIndex',
  data: () => ({
    first_name: '',
    last_name: '',
    participation: '',
    table: {},
    chartData: [],
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
    resetData () {
      this.first_name = ''
      this.last_name = ''
      this.participation = ''
    },
    submitPayload () {
      const firstName = 'first_name'
      const lastName = 'last_name'
      const participation = 'participation'
      const payLoad = {
        [firstName]: this.first_name,
        [lastName]: this.last_name,
        [participation]: this.participation
      }
      this.$axios.post('/employee/save', payLoad)
        .then(this.findData)
        .then(this.resetData)
    },
    findData () {
      this.$axios.get('http://localhost:3000/employee/getAll')
        .then(({ data }) => {
          this.table = data
          this.chartLabel = data.map(el => `${el.first_name} ${el.last_name}`)
          this.chartData = data.map(el => el.participation)
        })
    }

  },
  mounted () {
    this.findData()
  }
}
</script>

<style>
.m-5 {
  margin: 10px;
}
.m-50 {
  margin: 50px;
}

.btn-fixed-width {
  width: 150px;
  height: 38px;
}
.bg-color{
   background-color: #01b8e2;
}

.fixed-height {
  height: 100px;
}

</style>
