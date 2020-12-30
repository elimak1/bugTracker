var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;

const getPlaceholderChart = () => {
    return({
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        // for animation
        animation: {
          draw: function(data) {
            if (data.type === "line" || data.type === "area") {
              data.element.animate({
                d: {
                  begin: 600,
                  dur: 700,
                  from: data.path
                    .clone()
                    .scale(1, 0)
                    .translate(0, data.chartRect.height())
                    .stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
            } else if (data.type === "point") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: "ease"
                }
              });
            }
          }
        }
      }
      );
}

export const getDailyTicketsChart = (tickets) => {

    if(!tickets) {
        return(getPlaceholderChart());
    }

    const today = new Date();
    // Return int from 0-6, 0 is sunday
    const weekday = today.getDay();
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    let labels = [];


    // Today is last label
    for(let i = 0; i<7; i++) {
        labels.push(days[(i+weekday)%7])
    }
    let data = [0,0,0,0,0,0,0];

    const countDailyTickets = (t) => {

        let posted = new Date(t.created);
        const days = Math.round((today - posted)/3600000/24);
        if(days<7) {
            data[6-days]++;
        }
    }
    tickets.forEach(countDailyTickets);

    let max = Math.max.apply(Math, data);
    max += Math.round(max*0.1);
    
    return({
        data: {
          labels: labels,
          series: [data]
        },
        options: {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: max, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        // for animation
        animation: {
          draw: function(data) {
            if (data.type === "line" || data.type === "area") {
              data.element.animate({
                d: {
                  begin: 600,
                  dur: 700,
                  from: data.path
                    .clone()
                    .scale(1, 0)
                    .translate(0, data.chartRect.height())
                    .stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
            } else if (data.type === "point") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: "ease"
                }
              });
            }
          }
        }
      }
      );
}
