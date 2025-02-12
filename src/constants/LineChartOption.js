import { callback } from "chart.js/helpers";

  // 차트 옵션
  export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        // position: 'top',
        // align: 'end',
        // labels: {
        //   color: 'rgba(0, 0, 0, 0.5)',
        //   font: {
        //     size: 12,
        //   },
        //   usePointStyle: true,
        //   pointStyle: 'circle',
        //   boxWidth: 8,
        //   boxHeight: 8,
        //   padding: 16,
        // }
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 85,
        max: 125,
        ticks: {
          stepSize: 5,
          color: 'rgba(0, 0, 0, 0.4)',
          font: {
            size: 14
          },
          callback: function(value) {
            return value + ' dB';
          }
        },
        grid: {
          drawBorder: true,
          color: '#E5E5E5'
        }
      },
      x: {
        ticks: {
          stepSize: 1,
          color: 'rgba(0, 0, 0, 0.4)',
          font: {
            size: 10
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
    },
  };
