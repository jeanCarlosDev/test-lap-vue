import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['labels', 'dataDou'],
  mounted () {
    if (this.dataDou) {
      this.renderChart({

        labels: this.labels,
        datasets: [
          {
            backgroundColor: this.randomColors,
            data: this.dataDou
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      })
    }
  },
  computed: {
    randomColors () {
      return this.labels.map(el => '#' + ((1 << 24) * Math.random() | 0).toString(16))
    }
  },
  watch: {
    dataDou: {
      handler: function (newValue, oldValue) {
        this.renderChart({
          labels: this.labels,
          datasets: [
            {
              backgroundColor: this.randomColors,
              data: newValue
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false
        })
      },
      deep: true
    }
  }
}
