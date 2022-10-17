import Auth from "../services/Auth";

const BASE_URL = "https://shop-ad-strix.herokuapp.com/user/";
const BASE_URL2 = "https://shop-ad-strix.herokuapp.com/";

export const mobileRegisterPostRequest = async (email, password, name, phone, userType, successCallBack) => {
    console.log('\n\n mobileRegisterPostRequest Called : ', email, password, userType, name);

    // const userImage = {
    //     name: image?.assets[0].fileName,
    //     uri: image.assets[0].uri,
    //     type: image.assets[0].type
    // }

    var body = {
        "email": email,
        "password": password,
        "mobile": phone,
        "userType": userType,
        "name": name,
        // "userImage": userImage
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

export const addNewOfferPostRequest = async (desc, location, startDate, endDate, image, ownerId, shopId, bearerToken, successCallBack) => {
    console.log('\n\n addNewOfferPostRequest Called : ', desc, location, startDate, endDate, image, ownerId, shopId);

    let formData = new FormData();

    const offerImage = {
        name: image?.assets[0].fileName,
        uri: image.assets[0].uri,
        type: image.assets[0].type
    }

    formData.append('description', desc);
    formData.append('location', location);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append("offerImage", offerImage);
    // formData.append("offerImage", "image.assets[0], image.assets[0].uri");
    formData.append('ownerId', ownerId);
    formData.append('shopId', shopId);


    console.log("\n After formdata", image)

    try {
        let response = await fetch(BASE_URL2 + 'salesoffer', {
            method: 'POST',
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
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

export const getAllOffersPostRequest = async (bearerToken, successCallBack) => {
    console.log('\n\n getAllOffersPostRequest Called : ');

    try {
        let response = await fetch(BASE_URL2 + 'salesoffer', {
            method: "GET",
            headers: { "Authorization": `Bearer ${bearerToken}` }
        });
        let json = await response.json();
        console.log('\n\n getAllOffersPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllOffersPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getOffersByLocationPostRequest = async (location, bearerToken, successCallBack) => {
    console.log('\n\n getOffersByLocationPostRequest Called : ', location, bearerToken);

    var body = {
        "location": location.toString(),
    }

    try {
        let response = await fetch('https://shop-ad-strix.herokuapp.com/salesoffer/location', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n getOffersByLocationPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getOffersByLocationPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewJobPostRequest = async (description, shopName, location, salary, shiftTime, designationName, ownerId, contactNumber, contactEmail, startDate, endDate, bearerToken, successCallBack) => {
    console.log('\n\n addNewJobPostRequest Called : ', description, shopName, location, salary, shiftTime, designationName, ownerId, contactNumber, contactEmail);

    var body = {
        "description": description,
        "shopName": shopName,
        "location": location,
        "ownerId": ownerId,
        "salary": salary,
        "designationName": designationName,
        "shiftTime": shiftTime,
        "contactNumber": contactNumber,
        "contactEmail": contactEmail,
        'startDate': startDate,
        'endDate': endDate,
    }

    try {
        let response = await fetch(BASE_URL2 + 'job', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
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

export const getAllJobsPostRequest = async (bearerToken, successCallBack) => {
    console.log('\n\n getAllJobsPostRequest Called : ');

    try {
        let response = await fetch(BASE_URL2 + 'job', {
            method: "GET",
            headers: { "Authorization": `Bearer ${bearerToken}` }
        });
        let json = await response.json();
        console.log('\n\n getAllJobsPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllJobsPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getJobsByLocationPostRequest = async (location, bearerToken, successCallBack) => {
    console.log('\n\n getJobsByLocationPostRequest Called : ', location, bearerToken);

    var body = {
        "location": location.toString(),
    }

    try {
        let response = await fetch('https://shop-ad-strix.herokuapp.com/job/location', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n getJobsByLocationPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getJobsByLocationPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewWorkPostRequest = async (description, shopName, location, salary, shiftTime, designationName, ownerId, contactNumber, contactEmail, bearerToken, successCallBack) => {
    console.log('\n\n addNewWorkPostRequest Called : ', description, shopName, location, salary, shiftTime, designationName, ownerId, contactNumber, contactEmail);

    var body = {
        "description": description,
        "shopName": shopName,
        "location": location,
        "ownerId": ownerId,
        "salary": salary,
        "designationName": designationName,
        "shiftTime": shiftTime,
        "contactNumber": contactNumber,
        "contactEmail": contactEmail
    }

    try {
        let response = await fetch(BASE_URL2 + 'work', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
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

export const getAllWorksPostRequest = async (bearerToken, successCallBack) => {
    console.log('\n\n getAllWorksPostRequest Called : ');

    try {
        let response = await fetch(BASE_URL2 + 'work', {
            method: "GET",
            headers: { "Authorization": `Bearer ${bearerToken}` }
        });

        let json = await response.json();
        console.log('\n\n getAllWorksPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllWorksPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getWorksByLocationPostAPI = async (location, bearerToken, successCallBack) => {
    console.log('\n\n getWorksByLocationPostAPI Called : ', location, bearerToken);

    var body = {
        "location": location.toString(),
    }

    try {
        let response = await fetch('https://shop-ad-strix.herokuapp.com/work/location', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n getWorksByLocationPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getWorksByLocationPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getUserByIDPostAPI = async (id, bearerToken, successCallBack) => {
    console.log('\n\n getUserByIDPostAPI Called : ', id);

    var body = {
        "id": id,
    }

    try {
        let response = await fetch(BASE_URL + 'uid', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n getUserByIDPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getUserByIDPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getLikesCountByIDPostAPI = async (id, bearerToken, successCallBack) => {
    console.log('\n\n getLikesCountByIDPostAPI Called : ', id);

    var body = {
        "itemId": id,
    }

    try {
        let response = await fetch(BASE_URL2 + 'like/likecountbyitem', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n getLikesCountByIDPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getLikesCountByIDPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addLikesByIDPostAPI = async (itemId, ownerId, bearerToken, successCallBack) => {
    console.log('\n\n addLikesByIDPostAPI Called : ', itemId);

    var body = {
        "itemId": itemId,
        "likedBy": ownerId,
    }

    try {
        let response = await fetch(BASE_URL2 + 'like/addlike', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n addLikesByIDPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addLikesByIDPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const unLikesByIDPostAPI = async (itemId, ownerId, bearerToken, successCallBack) => {
    console.log('\n\n unLikesByIDPostAPI Called : ', id);

    var body = {
        "itemId": itemId,
        "likedBy": ownerId,
    }

    try {
        let response = await fetch(BASE_URL2 + 'like/addlike', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n unLikesByIDPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n unLikesByIDPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getCommentsCountByIDPostAPI = async (id, bearerToken, successCallBack) => {
    console.log('\n\n getCommentsCountByIDPostAPI Called : ', id);

    var body = {
        "itemId": id,
    }

    try {
        let response = await fetch(BASE_URL2 + 'comment/commentbyitem', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n getCommentsCountByIDPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getCommentsCountByIDPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addCommentPostAPI = async (id, ownerId, commentBody, bearerToken, successCallBack) => {
    console.log('\n\n addCommentPostAPI Called : ', id);

    var body = {
        "itemId": id,
        "commentBy": ownerId,
        "comment": commentBody
    }

    try {
        let response = await fetch(BASE_URL2 + 'comment/addcomment', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n addCommentPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addCommentPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const followersAndFollowingCount = async (userId, bearerToken, successCallBack) => {
    console.log('\n\n followersAndFollowingCount Called : ', userId);

    var body = {
        "userId": userId,
    }

    try {
        let response = await fetch(BASE_URL + 'followcountbyid', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n followersAndFollowingCount success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n followersAndFollowingCount Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const updateUserPostRequest = async (uid, email, name, mobile, userType, image, bearerToken, successCallBack) => {
    console.log('\n\n updateUserPostRequest Called : ', uid, email, name, mobile, userType, image, bearerToken);

    let formData = new FormData();

    const userImage = {
        name: image?.assets[0].fileName,
        uri: image.assets[0].uri,
        type: image.assets[0].type
    }

    formData.append('uid', uid);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('userType', userType);
    formData.append("mobile", mobile);
    formData.append('image', userImage);

    try {
        let response = await fetch(BASE_URL + 'update', {
            method: "POST",
            headers: {
                // "Accept": 'application/json',
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: formData,
        });
        let json = await response.json();
        console.log('\n\n updateUserPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n updateUserPostRequest Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewFeedbackPostAPI = async (customerName, customerNumber, customerEmail, feedbackFor, feedbackNumber, feedback, bearerToken, successCallBack) => {
    console.log('\n\n addNewFeedbackPostAPI Called : ', customerName, customerNumber, customerEmail, feedbackFor, feedbackNumber, feedback, bearerToken);

    var body = {
        "customerName": "Aadarsh Kumar",
        "customerNumber": "9399380920",
        "customerEmail": "aadarshkavita@gmail.com",
        "feedbackFor": "offer",
        "feedbackNumber": "6310a85351a4358e76da9e97",
        "feedback": "Your Services are Very Good and Nice"
    }

    try {
        let response = await fetch(BASE_URL2 + 'feedback', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n addNewFeedbackPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addNewFeedbackPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

export const followUserPostAPI = async (userId, follwedId, bearerToken, successCallBack) => {
    console.log('\n\n followUserPostAPI Called : ', userId, follwedId, bearerToken);

    var body = {
        "userId": userId,
        "follwedId": follwedId
    }

    try {
        let response = await fetch(BASE_URL + 'addfollwer', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n followUserPostAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n followUserPostAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};
