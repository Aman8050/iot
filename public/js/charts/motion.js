function m(){
document.getElementById('shivam').style.display = 'block';
document.getElementById("chart2").innerHTML="";
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
              'Motion-senstivity': motion
            }
          }
        });

      }, 1000);


      var svg = d3.select("#chart2")
                .append("svg:svg")
                .attr("width", 400)
                .attr("height", 400);


        var gauge = iopctrl.arcslider()
                .radius(120)
                .events(false)
                .indicator(iopctrl.defaultGaugeIndicator);
        gauge.axis().orient("in")
                .normalize(true)
                .ticks(12)
                .tickSubdivide(3)
                .tickSize(10, 8, 10)
                .tickPadding(5)
                .scale(d3.scale.linear()
                        .domain([0, 160])
                        .range([-3*Math.PI/4, 3*Math.PI/4]));

        var segDisplay = iopctrl.segdisplay()
                .width(80)
                .digitCount(6)
                .negative(false)
                .decimals(0);

        svg.append("g")
                .attr("class", "segdisplay")
                .attr("transform", "translate(130, 200)")
                .call(segDisplay);

        svg.append("g")
                .attr("class", "gauge")
                .call(gauge);

        
        setInterval(function(){
          gauge.value(motion)
          segDisplay.value(motion);

        },2000);
    }
