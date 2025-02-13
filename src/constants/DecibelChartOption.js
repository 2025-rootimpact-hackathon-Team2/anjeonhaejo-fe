export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      min: 75,
      max: 125,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        display: true,
        stepSize: 10,
      }
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      }
    }
  },
  animation: {
    duration: 0
  }
};
