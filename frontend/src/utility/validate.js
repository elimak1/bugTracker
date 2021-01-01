

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

export const validateUsername = (username) => {
    if (username.length >= 4 && username.length<=20) {
        return true;
    }
    return false;
}

export const validateEmail = (email) => {
    if (email.length >= 4 && email.length<=40) {
        return true;
    }
    return false;
}

export const validatePassword = (password) => {
    if (password.length >= 6 && password.length<=30) {
        return true;
    }
    return false;
}

export const validateOther = (string) => {
    if (string.length<=20) {
        return true;
    }
    return false;
}

export const validateLongString = (string) => {
    if (string.length<=500) {
        return true;
    }
    return false;
}