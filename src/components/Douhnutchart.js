import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['labels', 'dataDou'],
  mounted () {
    if(this.dataDou){
    this.renderChart({

      labels: this.labels,
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
            '#00D8FF',
            '#DD1B16',
            '#846c10',
            '#c02b8d',
            '#c02b8d',
            '#5ef5c6',
            '#5ef5c6',
            '#143048',
            '#143048',
            '#78236d',
            '#78236d',
            '#c56ce4',
            '#c56ce4',
            '#f5df34'
          ],

          data: this.dataDou
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})}
  }
}
