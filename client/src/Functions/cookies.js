 // Erase Cookies
 export const erase = name => {
    setCookie(name, '', -1);
}
// Erase Cookies
// SetCookie
export const setCookie = (name, value, days) => {
    var domain, domainParts, date, expires, host;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }

    host = window.location.host;
    if (host.split('.').length === 1) {
        // no "." in a domain - it's localhost or something similar
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    else {
        domainParts = host.split('.');
        domainParts.shift();
        domain = '.' + domainParts.join('.');
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
        if (getCookie(name) === null || getCookie(name) !== value) {
            domain = '.' + host;
            document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
        }
    }
}
export const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// export default {erase, setCookie, getCookie}