export const getRecentProject = (tickets) => {
    
    if(!tickets) {
        return null;
    }

    const sortByCreated = (a,b) => {
        if(a.created < b.created) {
            return 1;
        }
        return -1;
    }
    tickets.sort(sortByCreated);
    let data = tickets[0].project;

    // Get hours between last posted ticket and current time
    const posted = new Date(tickets[0].created);
    const now = new Date();
    const days = Math.round((now - posted)/3600000/24);

    data.days = days;
    return(data);

}