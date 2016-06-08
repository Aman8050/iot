function light(){


document.getElementById("4").style.pointerEvents="none";
document.getElementById("1").style.pointerEvents="auto";
document.getElementById("2").style.pointerEvents="auto";
document.getElementById("3").style.pointerEvents="auto";
document.getElementById("5").style.pointerEvents="auto";
    var pubnub4 = PUBNUB.init({
        publish_key: 'pub-c-923938f1-a4c1-4253-b15a-9c24087904c9',
        subscribe_key: 'sub-c-bd9ab0d6-6e02-11e5-8d3b-0619f8945a4f'
      });

      var channel4 = "c3-spline" + Math.random();

      eon.chart({
        channel: channel4,
        history: true,
        flow: true,
        rate:3000,
        pubnub: pubnub4,
        generate: {
          bindto: '#chart1',
          data: {
            type: 'spline',
            labels: false
          }
        }
      });
  
      setInterval(function(){
        pubnub4.publish({
          channel: channel4,
          message: {
            eon: {
              'Intensity': intensity[intensity.length-1]
            }
          }
        });

      }, 1000);


      var pubnub9 = PUBNUB.init({
        publish_key: 'pub-c-923938f1-a4c1-4253-b15a-9c24087904c9',
        subscribe_key: 'sub-c-bd9ab0d6-6e02-11e5-8d3b-0619f8945a4f'
      });

      var channel9 = 'c3-gauge'  + Math.random();
      
      eon.chart({
        pubnub: pubnub9,
        channel: channel9,
        generate: {
          bindto: '#chart2',
          data: {
            type: 'gauge'
          }
        }
      });

      setInterval(function(){

        pubnub9.publish({
          channel: channel9,
          message: {
            eon: {
              'Intensity': intensity[intensity.length-1]
            }
          }
        });

      }, 2000);
    }