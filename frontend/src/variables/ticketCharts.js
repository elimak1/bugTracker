
export const getTicketTypeData = (tickets) => {

    let amounts = [0,0,0,0];
    const types = ["Bugs/Errors", "Feature request", "Document request", "Other"]

    const fillAmounts = (t) => {

        let index = types.findIndex((type) => type===t.type);

        if(index < 0) {
            return;
        }
        amounts[index]++;
    }
    if (tickets) {
        tickets.forEach(fillAmounts);
    }
    return(
        {
            labels:types,
            series: [amounts]
          }
    )
}

export const getTicketTypeOptions = (tickets) => {

    let amounts = [0,0,0,0];
    const types = ["Bugs/Errors", "Feature request", "Document request", "Other"]

    const fillAmounts = (t) => {

        let index = types.findIndex((type) => type===t.type);

        if(index < 0) {
            return;
        }
        amounts[index]++;
    }
    if (tickets) {
        tickets.forEach(fillAmounts);
    }

    let max = Math.max.apply(Math, amounts);
    max += Math.round(max*0.1);
    if (max < 2) {
        max = 100;
    }

    return(
        {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: max,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0
            }
          }
    )
}
