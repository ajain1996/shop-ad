const BASE_URL = "https://shop-ad-strix.herokuapp.com/user/";
const BASE_URL2 = "https://shop-ad-strix.herokuapp.com/";

export const mobileRegisterPostRequest = async (email, password, name, userType, successCallBack) => {
    console.log('\n\n mobileRegisterPostRequest Called : ', email, password, userType, name);

    var body = {
        "email": email,
        "password": password,
        "mobile": 9399380920,
        "userType": userType,
        "name": name
    }

    try {
        let response = await fetch(BASE_URL + 'signup', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n mobileRegisterPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n mobileRegisterPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const mobileLoginPostRequest = async (email, password, userType, successCallBack) => {
    console.log('\n\n mobileLoginPostRequest Called : ', email, password, userType);

    var body = {
        "email": email,
        "password": password,
        "userType": userType,
    }

    try {
        let response = await fetch(BASE_URL + 'login', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n mobileLoginPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n mobileLoginPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const updatePasswordPostRequest = async (email, resetToken, password, successCallBack) => {
    console.log('\n\n updatePasswordPostRequest Called : ', email, resetToken, password);

    var body = {
        "email": "aadarshkavita@gmail.com",
        "resetToken": "x8I66vtW",
        "password": "12345678"
    }

    try {
        let response = await fetch(BASE_URL + 'setpassword', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n updatePasswordPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n updatePasswordPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewOfferPostRequest = async (desc, location, startDate, endDate, image, ownerId, shopId, successCallBack) => {
    console.log('\n\n addNewOfferPostRequest Called : ', desc, location, startDate, endDate, image, ownerId, shopId);

    let formData = new FormData();

    formData.append('description', desc);
    formData.append('location', location);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('offerImage', image);
    formData.append('ownerId', ownerId);
    formData.append('shopId', shopId);

    try {
        let response = await fetch(BASE_URL2 + 'salesoffer', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            body: formData,
        });
        let json = await response.json();
        console.log('\n\n addNewOfferPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addNewOfferPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getAllOffersPostRequest = async (successCallBack) => {
    console.log('\n\n getAllOffersPostRequest Called : ');

    try {
        let response = await fetch(BASE_URL2 + 'salesoffer');
        let json = await response.json();
        console.log('\n\n getAllOffersPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllOffersPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewJobPostRequest = async (description, shopName, location, salary, shiftTime, designationName, ownerId, contactNumber, contactEmail, successCallBack) => {
    console.log('\n\n addNewJobPostRequest Called : ', description, shopName, location, salary, shiftTime, designationName, ownerId, contactNumber, contactEmail);

    var body = {
        "description": "Software Company",
        "shopName": "Strix Digital",
        "location": "Mumbai",
        "ownerId": "6310986978bdedcb4e68b948",
        "salary": "35000 Rs",
        "designationName": "Developer",
        "shiftTime": "day",
        "contactNumber": "9399380920",
        "contactEmail": "aadarshkavita@gmail.com"
    }

    try {
        let response = await fetch(BASE_URL2 + 'job', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n addNewJobPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addNewJobPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getAllJobsPostRequest = async (successCallBack) => {
    console.log('\n\n getAllJobsPostRequest Called : ');

    try {
        let response = await fetch(BASE_URL2 + 'job');
        let json = await response.json();
        console.log('\n\n getAllJobsPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllJobsPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewWorkPostRequest = async (description, shopName, location, salary, shiftTime, designationName, ownerId, contactNumber, contactEmail, successCallBack) => {
    console.log('\n\n addNewWorkPostRequest Called : ', description, shopName, location, salary, shiftTime, designationName, ownerId, contactNumber, contactEmail);

    var body = {
        "description": "Software Company",
        "shopName": "Strix Digital",
        "location": "Mumbai",
        "ownerId": "6310986978bdedcb4e68b948",
        "salary": "35000 Rs",
        "designationName": "Developer",
        "shiftTime": "day",
        "contactNumber": "9399380920",
        "contactEmail": "aadarshkavita@gmail.com"
    }

    try {
        let response = await fetch(BASE_URL2 + 'work', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n addNewWorkPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addNewWorkPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getAllWorksPostRequest = async (successCallBack) => {
    console.log('\n\n getAllWorksPostRequest Called : ');

    try {
        let response = await fetch(BASE_URL2 + 'work');
        let json = await response.json();
        console.log('\n\n getAllWorksPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllWorksPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};
