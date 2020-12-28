

export const validateUser = (users, username) => {
    const user = users.find(person => person.username === username);
    if (user) {
        return true;
    }
    return false;
}

export const validateTitle = (title) => {
    if (title) {
        const size = title.length;
        if (4<= size && size <= 30) {
            return true;
        }
    }
    return false;
}

export const validateDescription = (desc) => {
    if (desc) {
        const size = desc.length;
        if (10<= size && size <= 500) {
            return true;
        }
    }
    return false;
}