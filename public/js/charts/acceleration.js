function a(){

document.getElementById('shivam').style.display = 'block';
document.getElementById("3").style.pointerEvents="none";
document.getElementById("2").style.pointerEvents="auto";
document.getElementById("1").style.pointerEvents="auto";
document.getElementById("4").style.pointerEvents="auto";
document.getElementById("5").style.pointerEvents="auto";
    var pubnub3 = PUBNUB.init({
        publish_key: 'pub-c-923938f1-a4c1-4253-b15a-9c24087904c9',
        subscribe_key: 'sub-c-bd9ab0d6-6e02-11e5-8d3b-0619f8945a4f'
      });

      var channel3 = "c3-spline" + Math.random();

      eon.chart({
        channel: channel3,
        history: true,
        flow: true,
        rate:3000,
        pubnub: pubnub3,
        generate: {
          bindto: '#chart1',
          data: {
            type: 'spline',
            labels: false
          }
        }
      });

      setInterval(function(){

        pubnub3.publish({
          channel: channel3,
          message: {
            eon: {
              'accx': accx,
              'accy': accy,
              'accz': accz
            }
          }
        });

      }, 1000);

      var pubnub8 = PUBNUB.init({
        publish_key: 'pub-c-923938f1-a4c1-4253-b15a-9c24087904c9',
        subscribe_key: 'sub-c-bd9ab0d6-6e02-11e5-8d3b-0619f8945a4f'
      });

      var channel8 = "c3-spline" + Math.random();

      eon.chart({
        pubnub: pubnub8,
        channel: channel8,
        history: true,
        debug: true,
        generate: {
          bindto: '#chart2',
          data: {
            labels: true,
            type: 'pie'
          },
          bar: {
            width: {
              ratio: 0.5
            }
          }
        }
      });
      setInterval(function(){

        pubnub8.publish({
          channel: channel8,
          message: {
            eon: {
              'Acc-x': accx,
              'Acc-y': accy,
              'Acc-z': accz
            }
          }
        });

      }, 700);

    }