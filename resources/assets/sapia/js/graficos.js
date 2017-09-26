$.widget.bridge('uibutton', $.ui.button);

let parameter01 = {
  namePanel: 'llamadas_abandonadas',
  title: 'Abandoned Calls',
  subTitle: 'Proyect: Sapia',
  titleSeriesY: 'Minutes',
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
  seriesData: [{
        name: 'Aban > 5',
        data: [7, 14,21, 31, 41, 60,55, 12, 23.3, 18.3, 13.9, 9.6]
    },{
        name: 'Aban > 10',
        data: [70, 4,11, 21, 21, 66,45, 12, 23.3, 18.3, 13.9, 9.6]
    }
  ]

}

let parameter02 = {
  namePanel: 'promedio_atencion',
  title: 'Average Time for Online Attention',
  subTitle: 'Proyect: Sapia',
  titleSeriesY: 'Minutes',
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
  seriesData: [{
        name: 'Aban > 5',
        data: [7, 14,21, 31, 41, 60,55, 12, 23.3, 18.3, 13.9, 9.6]
    },{
        name: 'Aban > 10',
        data: [70, 4,11, 21, 21, 66,45, 12, 23.3, 18.3, 13.9, 9.6]
    },
    {
        name: 'Aban > 20',
        data: [22, 30,40,50,60,70,45,59,62,75,39,25]
    }
  ]

}

let generateHighCharts = (namePanel, parameter) => {
  Highcharts.chart(namePanel, parameter);
}

let generateLineGraph = (data) => {
  const parameter = {
      chart: {
          type: 'line'
      },
      title: {
          text: data.title
      },
      subtitle: {
          text: data.subTitle
      },
      xAxis: {
          categories: data.categories
      },
      yAxis: {
          title: {
              text: data.titleSeriesY
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: true
          }
      },
      series: data.seriesData
  }

  generateHighCharts(data.namePanel, parameter)
}

generateLineGraph(parameter01)
generateLineGraph(parameter02)
