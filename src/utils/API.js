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
        console.log('\n\n mobileRegisterPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n mobileRegisterPostRequest Failed');
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
        console.log('\n\n mobileLoginPostRequest Failed');
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
        console.log('\n\n updatePasswordPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n updatePasswordPostRequest Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewOfferPostRequest = async (desc, location, startDate, endDate, image, ownerId, shopId, bearerToken, successCallBack) => {
    console.log('\n\n addNewOfferPostRequest Called : ', desc, location, startDate, endDate, ownerId, shopId, image);

    let formData = new FormData();

    formData.append('description', desc);
    formData.append('location', location);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append("offerImage", image[0]);
    formData.append('ownerId', ownerId);
    formData.append('shopId', shopId);
    formData.append("offerImage1", image[1]);
    formData.append("offerImage2", image[2]);
    formData.append("offerImage3", image[3]);
    formData.append("offerImage4", image[4]);

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
        console.log('\n\n addNewOfferPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addNewOfferPostRequest Failed');
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
        console.log('\n\n getAllOffersPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllOffersPostRequest Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getOffersByOwnerIdPostRequest = async (ownerId, bearerToken, successCallBack) => {
    console.log('\n\n getOffersByOwnerIdPostRequest Called : ');

    var body = {
        "ownerId": ownerId,
    }

    try {
        let response = await fetch(BASE_URL2 + 'salesoffer/ownerid', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n getOffersByOwnerIdPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getOffersByOwnerIdPostRequest Failed');
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
        console.log('\n\n getOffersByLocationPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getOffersByLocationPostRequest Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewJobPostRequest = async (
    title, description, shopName, location, ownerId, salary, designationName, startDate, endDate, contactNumber, contactEmail, gender,
    areaWork, numberWork, experienceRequired, manpowerNumber, workTiming, facilities, incentiveOffered, interviewTiming, vechileRequired,
    message, isCv, isPolice, isCertificate, isExperience, bearerToken, successCallBack
) => {
    console.log(
        '\n\n addNewJobPostRequest Called : ', title, description, shopName, location, ownerId, salary, designationName, startDate,
        endDate, contactNumber, contactEmail, gender, areaWork, numberWork, experienceRequired, manpowerNumber, workTiming, facilities,
        incentiveOffered, interviewTiming, vechileRequired, message, isCv, isPolice, isCertificate, isExperience, bearerToken
    );

    var body = {
        "title": title,
        "description": description,
        "shopName": shopName,
        "location": location,
        "ownerId": ownerId,
        "salary": salary,
        "designationName": designationName,
        "startDate": startDate,
        "endDate": endDate,
        "contactNumber": contactNumber,
        "contactEmail": contactEmail,
        "gender": gender,
        "areaWork": areaWork,
        "numberWork": numberWork,
        "experienceRequired": experienceRequired,
        "manpowerNumber": manpowerNumber,
        "workTiming": workTiming,
        "facilities": facilities,
        "incentiveOffered": incentiveOffered,
        "interviewTiming": interviewTiming,
        "vechileRequired": vechileRequired,
        "message": message,
        "isCv": true,
        "isCertificate": true,
        "isPolice": true,
        "isExperience": true
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
        console.log('\n\n addNewJobPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addNewJobPostRequest Failed');
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
        console.log('\n\n getAllJobsPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllJobsPostRequest Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getJobsByOwnerIdPostRequest = async (id, bearerToken, successCallBack) => {
    console.log('\n\n getJobsByOwnerIdPostRequest Called : ');
    var body = {
        "id": id,
    }

    try {
        let response = await fetch(BASE_URL2 + 'job/byid', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n getJobsByOwnerIdPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getJobsByOwnerIdPostRequest Failed');
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
        console.log('\n\n getJobsByLocationPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getJobsByLocationPostRequest Failed');
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
        console.log('\n\n addNewWorkPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addNewWorkPostRequest Failed');
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
        console.log('\n\n getAllWorksPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getAllWorksPostRequest Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getWorksByOwnerIdPostRequest = async (id, bearerToken, successCallBack) => {
    console.log('\n\n getWorksByOwnerIdPostRequest Called : ');
    var body = {
        "id": id,
    }

    try {
        let response = await fetch(BASE_URL2 + 'work/byid', {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });

        let json = await response.json();
        console.log('\n\n getWorksByOwnerIdPostRequest success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getWorksByOwnerIdPostRequest Failed');
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
        console.log('\n\n getWorksByLocationPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getWorksByLocationPostAPI Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getUserByIDPostAPI = async (id, bearerToken, successCallBack) => {
    // console.log('\n\n getUserByIDPostAPI Called: ', id, bearerToken);

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
        console.log('\n\n getUserByIDPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getUserByIDPostAPI Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getLikesCountByIDPostAPI = async (itemId, bearerToken, successCallBack) => {
    console.log('\n\n getLikesCountByIDPostAPI Called : ', itemId);

    var body = {
        "itemId": itemId,
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
        console.log('\n\n getLikesCountByIDPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getLikesCountByIDPostAPI Failed');
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
        console.log('\n\n addLikesByIDPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addLikesByIDPostAPI Failed');
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
        let response = await fetch(BASE_URL2 + 'like/unlike', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n unLikesByIDPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n unLikesByIDPostAPI Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getCommentsCountByIDPostAPI = async (itemId, bearerToken, successCallBack) => {
    console.log('\n\n getCommentsCountByIDPostAPI Called : ', itemId);

    var body = {
        "itemId": itemId,
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
        console.log('\n\n getCommentsCountByIDPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getCommentsCountByIDPostAPI Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const addCommentPostAPI = async (itemId, ownerId, commentBody, bearerToken, successCallBack) => {
    console.log('\n\n addCommentPostAPI Called : ', itemId, ownerId, bearerToken);

    var body = {
        "itemId": itemId,
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
        console.log('\n\n addCommentPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addCommentPostAPI Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const followersAndCount = async (userId, bearerToken, successCallBack) => {
    console.log('\n\n followersAndCount Called : ', userId);

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
        console.log('\n\n followersAndCount success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n followersAndCount Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const followingAndCount = async (userId, bearerToken, successCallBack) => {
    console.log('\n\n followingAndCount Called : ', userId);

    var body = {
        "userId": userId,
    }

    try {
        let response = await fetch(BASE_URL + 'followingcountbyid', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        console.log('\n\n followingAndCount success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n followingAndCount Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const updateUserPostRequest = async (uid, email, name, mobile, userType, image, bearerToken, successCallBack) => {
    const userImage = {
        name: image?.assets[0].fileName,
        uri: image.assets[0].uri,
        type: image.assets[0].type
    }
    console.log('\n\n updateUserPostRequest Called : ', uid, email, name, mobile, userType, image, bearerToken, userImage);

    let formData = new FormData();

    formData.append('uid', uid);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('userType', userType);
    formData.append("mobile", mobile);
    formData.append('Image', userImage);

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
        console.log('\n\n updateUserPostRequest Failed');
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
        console.log('\n\n addNewFeedbackPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n addNewFeedbackPostAPI Failed');
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
        console.log('\n\n followUserPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n followUserPostAPI Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const applyJobPostAPI = async (
    jobId, applicantId, applicantEmail, applicantName, applicantContact, resumeLink, policeLink, experienceLink, certificateLink, bearerToken, successCallBack
) => {
    console.log(
        '\n\n applyJobPostAPI Called: ', jobId, applicantId, applicantEmail, applicantName, applicantContact, bearerToken,
        '\n resumeLink: ', resumeLink,
        '\n policeLink: ', policeLink,
        '\n experienceLink: ', experienceLink,
        '\n certificateLink: ', certificateLink,
    );

    let formData = new FormData();

    formData.append('jobId', jobId);
    formData.append('applicantId', applicantId);
    formData.append('applicantEmail', applicantEmail);
    formData.append('applicantName', applicantName);
    formData.append('applicantContact', applicantContact);
    formData.append('resumeLink', resumeLink);
    formData.append('policeLink', policeLink);
    formData.append("experienceLink", experienceLink);
    formData.append('certificateLink', certificateLink);

    try {
        let response = await fetch(BASE_URL2 + 'jobapply', {
            method: "POST",
            headers: {
                // "Accept": 'application/json',
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: formData,
        });
        let json = await response.json();
        console.log('\n\n applyJobPostAPI success');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n applyJobPostAPI Failed');
        console.error('error', error);
        successCallBack(null);
    }
};
