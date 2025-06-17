import { useTheme } from 'styled-components'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { CustomChart } from '../types/customChart'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function CustomChart({ data, label, type }: CustomChart) {
    const theme = useTheme()    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false
                },
                ticks: {
                    color: theme.colors?.text
                }
            },
            y: {
                border: {
                    display: false
                },
                grid: {
                    color: theme.colors?.stroke || '#E1E1E1'
                },
                ticks: {
                    color: theme.colors?.text
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    const chartData = {
        labels: label,
        datasets: [
            {
                data: data,
                backgroundColor: 'rgba(12, 122, 242, 0.2)',
                borderColor: 'rgb(12, 122, 242)',
                tension: 0.4,
                borderWidth: 2
            }
        ]
    }
  return type === 'bar' ? (
    <Bar options={options} data={chartData} />
  ) : (
    <Line options={options} data={chartData} />
  )
}
export default CustomChart