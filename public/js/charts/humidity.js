function h(){



document.getElementById("2").style.pointerEvents="none";
document.getElementById("1").style.pointerEvents="auto";
document.getElementById("3").style.pointerEvents="auto";
document.getElementById("4").style.pointerEvents="auto";
document.getElementById("5").style.pointerEvents="auto";
    var pubnub2 = PUBNUB.init({
        publish_key: 'pub-c-923938f1-a4c1-4253-b15a-9c24087904c9',
        subscribe_key: 'sub-c-bd9ab0d6-6e02-11e5-8d3b-0619f8945a4f'
      });

      var channel2 = "c3-spline" + Math.random();

      eon.chart({
        channel: channel2,
        history: true,
        flow: true,
        rate:3000,
        pubnub: pubnub2,
        generate: {
          bindto: '#chart1',
          data: {
            type: 'spline',
            labels: false
          }
        }
      });
  
      setInterval(function(){

        pubnub2.publish({
          channel: channel2,
          message: {
            eon: {
              'Humidity': hum[hum.length-1]
            }
          }
        });

      }, 1000);


      var pubnub7 = PUBNUB.init({
        publish_key: 'pub-c-923938f1-a4c1-4253-b15a-9c24087904c9',
        subscribe_key: 'sub-c-bd9ab0d6-6e02-11e5-8d3b-0619f8945a4f'
      });

      var channel7 = 'c3-gauge'  + Math.random();
      
      eon.chart({
        pubnub: pubnub7,
        channel: channel7,
        generate: {
          bindto: '#chart2',
          data: {
            type: 'gauge'
          }
        }
      });

      setInterval(function(){

        pubnub7.publish({
          channel: channel7,
          message: {
            eon: {
              'Humidity': hum[hum.length-1]
            }
          }
        });

      }, 2000);

}