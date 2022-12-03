import Auth from '../services/Auth';

const BASE_URL = 'https://shop-ad-strix.herokuapp.com/user/';
const BASE_URL2 = 'https://shop-ad-strix.herokuapp.com/';

export const mobileRegisterPostRequest = async (
    email,
    password,
    name,
    phone,
    userType,
    successCallBack,
) => {
    // const userImage = {
    //     name: image?.assets[0].fileName,
    //     uri: image.assets[0].uri,
    //     type: image.assets[0].type
    // }

    var body = {
        email: email,
        password: password,
        mobile: phone,
        userType: userType,
        name: name,
        // "userImage": userImage
    };

    try {
        let response = await fetch(BASE_URL + 'signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const mobileLoginPostRequest = async (
    email,
    password,
    userType,
    successCallBack,
) => {
    var body = {
        email: email,
        password: password,
        userType: userType,
    };

    try {
        let response = await fetch(BASE_URL + 'login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const updatePasswordPostRequest = async (
    email,
    resetToken,
    password,
    successCallBack,
) => {
    var body = {
        email: 'aadarshkavita@gmail.com',
        resetToken: 'x8I66vtW',
        password: '12345678',
    };

    try {
        let response = await fetch(BASE_URL + 'setpassword', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewOfferPostRequest = async (
    desc,
    location,
    startDate,
    endDate,
    image,
    ownerId,
    shopId,
    cateoryId,
    bearerToken,
    successCallBack,
) => {
    let formData = new FormData();

    formData.append('description', desc);
    formData.append('location', location);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('offerImage', image[0]);
    formData.append('ownerId', ownerId);
    formData.append('shopId', shopId);
    formData.append('offerImage1', image[1]);
    formData.append('offerImage2', image[2]);
    formData.append('offerImage3', image[3]);
    formData.append('offerImage4', image[4]);
    formData.append('cateoryId', cateoryId);

    try {
        let response = await fetch(BASE_URL2 + 'salesoffer', {
            method: 'POST',
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            body: formData,
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getAllOffersPostRequest = async (bearerToken, successCallBack) => {
    try {
        let response = await fetch(BASE_URL2 + 'salesoffer', {
            method: 'GET',
            headers: { Authorization: `Bearer ${bearerToken}` },
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getOffersByOwnerIdPostRequest = async (
    ownerId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        ownerId: ownerId,
    };

    try {
        let response = await fetch(BASE_URL2 + 'salesoffer/ownerid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getOffersByLocationPostRequest = async (
    location,
    bearerToken,
    successCallBack,
) => {
    var body = {
        location: location.toString(),
    };

    try {
        let response = await fetch(
            'https://shop-ad-strix.herokuapp.com/salesoffer/location',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(body),
            },
        );
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getOffersByCategoryAPI = async (
    id,
    bearerToken,
    successCallBack,
) => {
    var body = {
        cateoryId: id,
    };

    try {
        let response = await fetch(BASE_URL2 + 'salesoffer/categoryid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getAllCategoriesAPI = async (bearerToken, successCallBack) => {
    try {
        let response = await fetch(BASE_URL2 + 'category', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewJobPostRequest = async (
    title,
    description,
    shopName,
    location,
    ownerId,
    salary,
    designationName,
    startDate,
    endDate,
    contactNumber,
    contactEmail,
    gender,
    areaWork,
    numberWork,
    experienceRequired,
    manpowerNumber,
    workTiming,
    facilities,
    incentiveOffered,
    interviewTiming,
    vechileRequired,
    message,
    isCv,
    isPolice,
    isCertificate,
    isExperience,
    bearerToken,
    successCallBack,
) => {
    //     '\n\n addNewJobPostRequest Called : ', title, description, shopName, location, ownerId, salary, designationName, startDate,
    //     endDate, contactNumber, contactEmail, gender, areaWork, numberWork, experienceRequired, manpowerNumber, workTiming, facilities,
    //     incentiveOffered, interviewTiming, vechileRequired, message, isCv, isPolice, isCertificate, isExperience, bearerToken
    // );

    var body = {
        title: title,
        description: description,
        shopName: shopName,
        location: location,
        ownerId: ownerId,
        salary: salary,
        designationName: designationName,
        startDate: startDate,
        endDate: endDate,
        contactNumber: contactNumber,
        contactEmail: contactEmail,
        gender: gender,
        areaWork: areaWork,
        numberWork: numberWork,
        experienceRequired: experienceRequired,
        manpowerNumber: manpowerNumber,
        workTiming: workTiming,
        facilities: facilities,
        incentiveOffered: incentiveOffered,
        interviewTiming: interviewTiming,
        vechileRequired: vechileRequired,
        message: message,
        isCv: true,
        isCertificate: true,
        isPolice: true,
        isExperience: true,
    };

    try {
        let response = await fetch(BASE_URL2 + 'job', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getAllJobsPostRequest = async (bearerToken, successCallBack) => {
    try {
        let response = await fetch(BASE_URL2 + 'job', {
            method: 'GET',
            headers: { Authorization: `Bearer ${bearerToken}` },
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getJobsByOwnerIdPostRequest = async (
    id,
    bearerToken,
    successCallBack,
) => {
    var body = {
        id: id,
    };

    try {
        let response = await fetch(BASE_URL2 + 'job/byid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getJobsByLocationPostRequest = async (
    location,
    bearerToken,
    successCallBack,
) => {
    var body = {
        location: location.toString(),
    };

    try {
        let response = await fetch(
            'https://shop-ad-strix.herokuapp.com/job/location',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(body),
            },
        );
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const addNewWorkPostRequest = async (
    description,
    shopName,
    location,
    salary,
    shiftTime,
    designationName,
    ownerId,
    contactNumber,
    contactEmail,
    bearerToken,
    successCallBack,
) => {
    var body = {
        description: description,
        shopName: shopName,
        location: location,
        ownerId: ownerId,
        salary: salary,
        designationName: designationName,
        shiftTime: shiftTime,
        contactNumber: contactNumber,
        contactEmail: contactEmail,
    };

    try {
        let response = await fetch(BASE_URL2 + 'work', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getAllWorksPostRequest = async (bearerToken, successCallBack) => {
    try {
        let response = await fetch(BASE_URL2 + 'work', {
            method: 'GET',
            headers: { Authorization: `Bearer ${bearerToken}` },
        });

        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getWorksByOwnerIdPostRequest = async (
    id,
    bearerToken,
    successCallBack,
) => {
    var body = {
        id: id,
    };

    try {
        let response = await fetch(BASE_URL2 + 'work/byid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });

        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getWorksByLocationPostAPI = async (
    location,
    bearerToken,
    successCallBack,
) => {
    var body = {
        location: location.toString(),
    };

    try {
        let response = await fetch(
            'https://shop-ad-strix.herokuapp.com/work/location',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(body),
            },
        );
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getUserByIDPostAPI = async (id, bearerToken, successCallBack) => {
    var body = {
        id: id,
    };

    try {
        let response = await fetch(BASE_URL + 'uid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getLikesCountByIDPostAPI = async (
    itemId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        itemId: itemId,
    };

    try {
        let response = await fetch(BASE_URL2 + 'like/likecountbyitem', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const addLikesByIDPostAPI = async (
    itemId,
    ownerId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        itemId: itemId,
        likedBy: ownerId,
    };

    try {
        let response = await fetch(BASE_URL2 + 'like/addlike', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const unLikesByIDPostAPI = async (
    itemId,
    ownerId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        itemId: itemId,
        likedBy: ownerId,
    };

    try {
        let response = await fetch(BASE_URL2 + 'like/unlike', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const getCommentsCountByIDPostAPI = async (
    itemId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        itemId: itemId,
    };

    try {
        let response = await fetch(BASE_URL2 + 'comment/commentbyitem', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const addCommentPostAPI = async (
    itemId,
    ownerId,
    commentBody,
    bearerToken,
    successCallBack,
) => {
    var body = {
        itemId: itemId,
        commentBy: ownerId,
        comment: commentBody,
    };

    try {
        let response = await fetch(BASE_URL2 + 'comment/addcomment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const deleteCommentPostAPI = async (
    itemId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        itemId: itemId,
    };

    try {
        let response = await fetch(BASE_URL2 + 'comment/delete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const followersAndCount = async (
    userId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        userId: userId,
    };

    try {
        let response = await fetch(BASE_URL + 'followcountbyid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const followingAndCount = async (
    userId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        userId: userId,
    };

    try {
        let response = await fetch(BASE_URL + 'followingcountbyid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const updateUserPostRequest = async (
    uid,
    email,
    name,
    mobile,
    userType,
    image,
    bearerToken,
    successCallBack,
) => {
    const userImage = {
        name: image?.assets[0].fileName,
        uri: image.assets[0].uri,
        type: image.assets[0].type,
    };

    let formData = new FormData();

    formData.append('uid', uid);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('userType', userType);
    formData.append('mobile', mobile);
    formData.append('Image', userImage);

    try {
        let response = await fetch(BASE_URL + 'update', {
            method: 'POST',
            headers: {
                // "Accept": 'application/json',
                // "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            body: formData,
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.log('\n\n\n\n updateUserPostRequest error', error);
        successCallBack(null);
    }
};

export const addNewFeedbackPostAPI = async (
    customerName,
    customerNumber,
    customerEmail,
    feedbackFor,
    feedbackNumber,
    feedback,
    bearerToken,
    successCallBack,
) => {
    var body = {
        customerName: customerName,
        customerNumber: customerNumber,
        customerEmail: customerEmail,
        feedbackFor: feedbackFor,
        feedbackNumber: feedbackNumber,
        feedback: feedback,
    };

    try {
        let response = await fetch(BASE_URL2 + 'feedback', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const followUserPostAPI = async (
    userId,
    follwedId,
    bearerToken,
    successCallBack,
) => {
    var body = {
        userId: userId,
        follwedId: follwedId,
    };

    try {
        let response = await fetch(BASE_URL + 'addfollwer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(body),
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};

export const applyJobPostAPI = async (
    jobId,
    applicantId,
    applicantEmail,
    applicantName,
    applicantContact,
    resumeLink,
    policeLink,
    experienceLink,
    certificateLink,
    bearerToken,
    successCallBack,
) => {
    //     '\n\n applyJobPostAPI Called: ', jobId, applicantId, applicantEmail, applicantName, applicantContact, bearerToken,
    //     '\n resumeLink: ', resumeLink,
    //     '\n policeLink: ', policeLink,
    //     '\n experienceLink: ', experienceLink,
    //     '\n certificateLink: ', certificateLink,
    // );

    let formData = new FormData();

    formData.append('jobId', jobId);
    formData.append('applicantId', applicantId);
    formData.append('applicantEmail', applicantEmail);
    formData.append('applicantName', applicantName);
    formData.append('applicantContact', applicantContact);
    formData.append('resumeLink', resumeLink);
    formData.append('policeLink', policeLink);
    formData.append('experienceLink', experienceLink);
    formData.append('certificateLink', certificateLink);

    try {
        let response = await fetch(BASE_URL2 + 'jobapply', {
            method: 'POST',
            headers: {
                // "Accept": 'application/json',
                // "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            body: formData,
        });
        let json = await response.json();
        successCallBack(json);
    } catch (error) {
        console.error('error', error);
        successCallBack(null);
    }
};
