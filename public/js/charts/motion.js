function m(){


document.getElementById("5").style.pointerEvents="none";
document.getElementById("1").style.cursor="pointer";
document.getElementById("2").style.pointerEvents="auto";
document.getElementById("3").style.pointerEvents="auto";
document.getElementById("4").style.pointerEvents="auto";
document.getElementById("1").style.pointerEvents="auto";
    var pubnub5 = PUBNUB.init({
        publish_key: 'pub-c-923938f1-a4c1-4253-b15a-9c24087904c9',
        subscribe_key: 'sub-c-bd9ab0d6-6e02-11e5-8d3b-0619f8945a4f'
      });

      var channel5 = "c3-spline" + Math.random();

      eon.chart({
        channel: channel5,
        history: true,
        flow: true,
        rate:3000,
        pubnub: pubnub5,
        generate: {
          bindto: '#chart1',
          data: {
            type: 'spline',
            labels: false
          },

        }

      });
  
      setInterval(function(){

        pubnub5.publish({
          channel: channel5,
          message: {
            eon: {
              'Motion-senstivity': motion[motion.length-1]
            }
          }
        });

      }, 1000);
      var chart = AmCharts.makeChart( "chart2", {
  "theme": "light",
  "type": "gauge",
  "axes": [ {
    "axisColor": "red",
    "axisThickness": 3,
    "endValue": 240,
    "gridInside": false,
    "inside": false,
    "radius": "100%",
    "valueInterval": 20,
    "tickColor": "#67b7dc"
  }, {
    "axisColor": "#fdd400",
    "axisThickness": 3,
    "endValue": 160,
    "radius": "80%",
    "valueInterval": 20,
    "tickColor": "#fdd400"
  } ],
  "arrows": [ {
    "color": "#67b7dc",
    "innerRadius": "20%",
    "nailRadius": 0,
    "radius": "85%"
  } ],
  "export": {
    "enabled": true
  }
} );

setInterval( randomValue, 2000 );

// set random value
function randomValue() {
  var value = motion[motion.length-1];
  chart.arrows[ 0 ].setValue( value );
}
    }
