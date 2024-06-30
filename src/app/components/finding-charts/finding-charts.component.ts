
import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  Colors
} from "chart.js";
import { FindingsService } from '../../services/findings.service';
Chart.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  Colors
);

@Component({
  selector: 'app-finding-charts',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './finding-charts.component.html',
  styleUrl: './finding-charts.component.scss'
})
export class FindingChartsComponent implements OnInit {
  style = getComputedStyle(document.body);

  @Input() set pipelineId(value: number | undefined) {
    if (value === undefined) return;
    if (value === 0) {
      this.LineChart.data.labels = [];
      this.LineChart.data.datasets[0].data = [];
      this.LineChart.update();
      this.BarChart.data.labels = [];
      this.BarChart.data.datasets[0].data = [];
      this.BarChart.update();
      this.DonutChart.data.labels = [];
      this.DonutChart.data.datasets[0].data = [];
      this.DonutChart.update();
      return;
    }

    this.findingsService.getChartData(value).subscribe(data => {
      this.LineChart.data.labels = data.absoluteFindings.labels;
      this.LineChart.data.datasets[0].data = data.absoluteFindings.data;
      this.LineChart.update();
      this.BarChart.data.labels = data.lastRunByLevels.labels;
      this.BarChart.data.datasets[0].data = data.lastRunByLevels.data;
      this.BarChart.update();
      this.DonutChart.data.labels = data.lastRunByRules.labels;
      this.DonutChart.data.datasets[0].data = data.lastRunByRules.data;
      this.DonutChart.update();
    });
  }

  constructor(private findingsService: FindingsService) { }

  public DonutChart!: Chart<"doughnut", number[], string>;
  createDonutChart() {
    this.DonutChart = new Chart('donutChart', {
      type: 'doughnut', // This denotes the type of chart
      data: {
        labels: ["", "", "", "", "", "", ""],
        datasets: [{
          label: 'Number of Findings of the last Run cathegorized by the broken rule',
          data: [0, 0, 0, 0, 0, 0, 0],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          colors: {
            enabled: true
          },
          legend: {
            position: 'right' // Set the legend position to 'right'
          },
          title: {
            display: true,
            text: 'Number of Findings of the last Run cathegorized by the broken rule' // Set the title of the chart
          }
        },
        aspectRatio: 1.5, // Set the aspect ratio to 1 for equal height and width
        maintainAspectRatio: true, // Maintain the aspect ratio

      }

    });
  }


  public BarChart!: Chart;
  createBarChart() {
    this.BarChart = new Chart('barChart', {
      type: 'bar', //this denotes the type of chart

      data: {
        labels: [],
        datasets: [{
          label: 'Number of Findings of the last Run, cathegorized by the Level of Severity',
          data: [],
          borderWidth: 1
        }],
      },
      options: {
        aspectRatio: 1.5, // Set the aspect ratio to 1 for equal height and width
        maintainAspectRatio: true, // Maintain the aspect ratio
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Number of Findings of the last Run, cathegorized by the Level of Severity' // Set the title of the chart
          }
        }
      }
    });
  }

  public LineChart!: Chart;
  createLineChart() {
    this.LineChart = new Chart("lineChart", {
      type: 'line', //this denotes the type of chart

      data: {
        labels: [],
        datasets: [{
          label: `Absolute Findings in the last few Pipeline-Runs on ${this.findingsService.branch}`,
          data: [],
          borderColor: 'red',
          backgroundColor: 'transparent',
          borderWidth: 1
        }]
      },
      options: {
        aspectRatio: 1.5, // Set the aspect ratio to 1 for equal height and width
        maintainAspectRatio: true, // Maintain the aspect ratio
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: `Absolute Findings in the last few Pipeline-Runs on ${this.findingsService.branch}` // Set the title of the chart
          }
        },
        scales: {
          y: {
            min: 0
          }
        }
      }
    });
  }

  updateCharts(): void {
    this.style = getComputedStyle(document.body);
    this.BarChart.update();
    this.LineChart.update();
    this.DonutChart.update();
  }

  ngOnInit(): void {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', this.updateCharts.bind(this));

    Chart.defaults.color = () => {
      return this.style.getPropertyValue('--mat-app-text-color');
    }

    Chart.defaults.borderColor = () => {
      return this.style.getPropertyValue('--mat-app-text-color') + "1a";
    }

    this.createBarChart();
    this.createLineChart();
    this.createDonutChart();
  }
}
