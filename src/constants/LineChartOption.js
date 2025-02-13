import 'chartjs-adapter-date-fns';

  // 차트 옵션
  export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
        type: 'time',  // 시간 축으로 변경
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:00'
          },
          parser: 'HH:mm',  
        },
        ticks: {
          stepSize: 1,
          color: 'rgba(0, 0, 0, 0.4)',
          font: {
            size: 10
          },
        },
        grid: {
          display: false,
          drawBorder: true,
          drawTicks: false,
          borderDash: [4, 4]
        }
      },
    },
  };
