;(function(window, $){
    "use strict";    
 
    // Check to see if our global is available as a member of window; if it is, our namespace root exists; if not, we'll create it.
    var react = window.react = (typeof window.react !== "undefined") ? window.react : {};
 
    (react.dataviz = function(){
        return{
            _init : function(){
               /*
               Initial Canvas Demo
                */
               var ctx = document.getElementById("circle").getContext("2d");
               ctx.beginPath();
               ctx.arc(400, 150, 75, 0, Math.PI*2, true); 
               ctx.fillStyle = "#fe57a1";
               ctx.closePath();
               ctx.fill();
               /*
               Highstock demo
                */
               var seriesOptions = [],
                   yAxisOptions = [],
                   seriesCounter = 0,
                   names = ['AAPL', 'BBRY'],
                   colors = Highcharts.getOptions().colors;

               $.each(names, function(i, name) {
 
                 $.getJSON('../data/'+names[i].toLowerCase()+'.json', function(data) {
                
                   for (var j = 0, len = data.length; j < len; j++) {
                     data[j][0] = Date.parse( data[j][0] ).getTime();
                   }
                   data = data.reverse();
                   seriesOptions[i] = {
                     name: name,
                     data: data
                   };
                  seriesCounter++;
                  if (seriesCounter == names.length) {
                    createChart();
                  }
                });
              });
              function createChart() {
                var chart = new Highcharts.StockChart({
                    chart: {
                        renderTo: 'highstock'
                    },
                    yAxis: {
                      labels: {
                        formatter: function() {
                          return (this.value > 0 ? '+' : '') + this.value + '%';
                        }
                      },
                      plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                      }]
                    },
                    plotOptions: {
                      series: {
                        compare: 'percent'
                      }
                    },
                    tooltip: {
                      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                      valueDecimals: 2
                    },
                    series: seriesOptions
                });
              }

            }
        }
    }())._init();
}(window, jQuery));
