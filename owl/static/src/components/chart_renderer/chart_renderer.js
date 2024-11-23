/** @odoo-module */

import { registry } from "@web/core/registry"
import { loadJS } from "@web/core/assets"
const { Component, onWillStart, useRef, onMounted } = owl

export class ChartRenderer extends Component {
    setup(){
        this.chartRef = useRef("chart")
        onWillStart(async ()=>{
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js")
        })

        onMounted(()=>this.renderChart())
    }

    renderChart(){
        new Chart(
            this.chartRef.el,
            {
                type: 'bar',
                data: {
                    labels: [
                        'January',
                        'February',
                        'March',
                        'April'
                    ],
                    datasets: [{
                        type: 'bar',
                        label: 'Bar Dataset',
                        data: [10, 20, 50, 30],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)'
                    }, {
                        type: 'line',
                        label: 'Line Dataset',
                        data: [10, 20, 50, 30],
                        fill: false,
                        borderColor: 'rgb(54, 162, 235)'
                    }]
                }
            }
        );
    }
}

ChartRenderer.template = "owl.ChartRenderer"