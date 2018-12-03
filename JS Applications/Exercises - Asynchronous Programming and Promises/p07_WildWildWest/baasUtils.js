let utils = (function utils() {
    const BASE_URL = `https://baas.kinvey.com/appdata/kid_HkmxJKbAm`;
    const userName = `guest`;
    const password = `guest`;
    const BASE_64 = btoa(`${userName}:${password}`);
    const AUTH = {
        'Authorization': `Basic ${BASE_64}`
    };
    const kinveyVersion = 3;

    return {
        baseUrl: BASE_URL,
        base64: BASE_64,
        authorization: AUTH,
        kinveyVersion: kinveyVersion
    }
})();