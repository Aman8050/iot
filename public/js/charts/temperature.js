function t(){

document.getElementById("1").style.pointerEvents="none";
document.getElementById("2").style.pointerEvents="auto";
document.getElementById("3").style.pointerEvents="auto";
document.getElementById("4").style.pointerEvents="auto";
document.getElementById("5").style.pointerEvents="auto";


    var pubnub1 = PUBNUB.init({
        publish_key: 'pub-c-923938f1-a4c1-4253-b15a-9c24087904c9',
        subscribe_key: 'sub-c-bd9ab0d6-6e02-11e5-8d3b-0619f8945a4f'
      });

      var channel1 = "c3-spline" + Math.random();

      eon.chart({
        channel: channel1,
        history: true,
        flow: true,
        rate:3000,
        pubnub: pubnub1,
        generate: {
          bindto: '#chart1',
          data: {
            type: 'spline',
            labels: false
          }
        }
      });
      setInterval(function(){

        pubnub1.publish({
          channel: channel1,
          message: {
            eon: {
              'Temperature': temp[temp.length-1]
            }
          }
        });

      }, 1000);



      var gaugeChart = AmCharts.makeChart( "chart2", {
  "type": "gauge",
  "theme": "light",
  "axes": [ {
    "axisThickness": 1,
    "axisAlpha": 0.2,
    "tickAlpha": 0.2,
    "valueInterval": 20,
    "bands": [ {
      "color": "#84b761",
      "endValue": 90,
      "startValue": 0
    }, {
      "color": "#fdd400",
      "endValue": 130,
      "startValue": 90
    }, {
      "color": "#cc4748",
      "endValue": 220,
      "innerRadius": "95%",
      "startValue": 130
    } ],
    "bottomText": "0 km/h",
    "bottomTextYOffset": -20,
    "endValue": 220
  } ],
  "arrows": [ {} ],
  "export": {
    "enabled": true
  }
} );

setInterval( randomValue, 2000 );

// set random value
function randomValue() {
  var value = temp[temp.length-1];
  if ( gaugeChart ) {
    if ( gaugeChart.arrows ) {
      if ( gaugeChart.arrows[ 0 ] ) {
        if ( gaugeChart.arrows[ 0 ].setValue ) {
          gaugeChart.arrows[ 0 ].setValue( value );
          gaugeChart.axes[ 0 ].setBottomText( value + " C" );
        }
      }
    }
  }
}

    }