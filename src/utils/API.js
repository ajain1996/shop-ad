import {Alert} from 'react-native';
import Auth from '../services/Auth';

// const BASE_URL = 'https://shop-ad-strix.herokuapp.com/user/';
// const BASE_URL2 = 'https://shop-ad-strix.herokuapp.com/';
const BASE_URL2 =
  'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/';
const BASE_URL =
  'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/user/';
// const BASE_URL = 'https://shop-ad-strix.herokuapp.com/user/';

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
    console.log('api calling');
    let response = await fetch(BASE_URL + 'signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    let json = await response.json();
    console.log(json, '<<<< json');
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
    console.log('kljkljkljkl');
    let response = await fetch(BASE_URL + 'login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    let json = await response.json();
    console.log(json, '<<<<thisis json');
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
  price,
  code,
  bearerToken,
  successCallBack,
) => {
  let formData = new FormData();
  console.log('callign apis');
  formData.append('description', desc);
  formData.append('location', location);
  formData.append('price', price);
  formData.append('code', code);
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
    console.log(json);
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
      headers: {Authorization: `Bearer ${bearerToken}`},
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
    console.log(json, '<<<\n\n\n these are offers');
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
      'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/salesoffer/location',
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

export const commonSearch = async (location, ask, token, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    location: location,
    ask: ask,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/shop/location',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      callBack(JSON.parse(result));
      console.log(result);
    })
    .catch(error => console.log('error', error));
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
  console.log(body, '<<<< \n\n\n\n body data');
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
    console.log(json, '<<<<< this is job created');
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
      headers: {Authorization: `Bearer ${bearerToken}`},
    });
    let json = await response.json();
    successCallBack(json);
  } catch (error) {
    console.error('error', error);
    successCallBack(null);
  }
};

export const getAppliedCandidate = async (token, jobId, successCallBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    id: jobId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/jobapply/jobId',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log(JSON.parse(result));
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
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
  imageData,
  insta,
  facebookId,
  emailId,
  websiteAddress,
  bearerToken,
  successCallBack,
) => {
  let formData = new FormData();
  // return null;
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + bearerToken);
  console.log(imageData, '<<<this is imagedata');
  formData.append('description', description);
  formData.append('shopName', shopName);
  formData.append('location', location);
  formData.append('ownerId', ownerId);
  formData.append('salary', salary);
  formData.append('instaId', instaId);
  formData.append('facebookId', facebookId);
  formData.append('emailId', emailId);
  formData.append('websiteAddress', websiteAddress);
  formData.append('designationName', designationName);
  formData.append('shiftTime', shiftTime);
  formData.append('contactNumber', contactNumber);
  formData.append('contactEmail', contactEmail);
  // formdata.append("image", imageData, "/C:/Users/dell/Pictures/Screenshots/1.png");

  if (imageData.length > 0) {
    formData.append('image1', imageData[0], imageData[0].name);
  }
  if (imageData.length > 1) {
    formData.append('image2', imageData[1], imageData[1].name);
  }
  if (imageData.length > 2) {
    formData.append('image3', imageData[2], imageData[2].name);
  }
  if (imageData.length > 3) {
    formData.append('image4', imageData[3], imageData[3].name);
  }
  if (imageData.length > 4) {
    formData.append('image5', imageData[4], imageData[4].name);
  }

  // var body = {
  //   description: description,
  //   shopName: shopName,
  //   location: location,
  //   ownerId: ownerId,
  //   salary: salary,
  //   designationName: designationName,
  //   shiftTime: shiftTime,
  //   contactNumber: contactNumber,
  //   contactEmail: contactEmail,
  // };

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  fetch(BASE_URL2 + 'work', requestOptions)
    .then(response => response.text())
    .then(result => successCallBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};

export const getAllWorksPostRequest = async (bearerToken, successCallBack) => {
  try {
    let response = await fetch(
      'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/work',
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${bearerToken}`},
      },
    );

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
      'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/work/location',
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
    console.log('tis is user Data', json);
    successCallBack(json);
  } catch (error) {
    console.error('error', error);
    successCallBack(null);
  }
};

export const getJobDetailByID = (token, id, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    id,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/job/uid',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log(result);
      callBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const getJobByApplicantId = (token, id, callBAck) => {
  console.log('gettingalljobsbyapplicant ID', id);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    id: id,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/jobapply/applicantId',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => callBAck(JSON.parse(result)))
    .catch(error => console.log('error', error));
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

export const updateUserPostRequest1 = async (
  uid,
  email,
  name,
  mobile,
  userType,
  image,
  bearerToken,
  successCallBack,
) => {
  console.log(
    '\n\n\n\n\n',
    uid,
    email,
    name,
    mobile,
    userType,
    image,
    bearerToken,
    '\n\n\n data at sending to update',
  );

  // const userImage = {
  //   name: image?.assets[0].fileName,
  //   uri: image.assets[0].uri,
  //   type: image.assets[0].type,
  // };

  let formData = new FormData();

  formData.append('uid', uid);
  formData.append('email', email);
  formData.append('name', name);
  formData.append('userType', userType);
  formData.append('mobile', mobile);
  formData.append('Image', image);

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
    console.log('\n\n\n\n ->>>>', json, '<<<<< update profile dta at api.js');
    successCallBack(json);
  } catch (error) {
    console.log('\n\n\n\n updateUserPostRequest error', error);
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
  imageChanged,
  formData,
  isCertificateUploaded,
  categoryOfShop,
  purposeOfRegistration,
  successCallBack,
) => {
  console.log(
    '\n\n\n\n\n',
    uid,
    email,
    name,
    mobile,
    userType,
    image,
    bearerToken,
    '\n\n\n data at sending to update',
    imageChanged,
    categoryOfShop,
  );

  // const userImage = {
  //   name: image?.assets[0].fileName,
  //   uri: image.assets[0].uri,
  //   type: image.assets[0].type,
  // };
  // return null;
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + bearerToken);

  var formdata = new FormData();
  formdata.append('uid', uid);
  formdata.append('email', email);
  formdata.append('name', name);
  // formdata.append('categoryOfShop', categoryOfShop);
  // formdata.append('userType', userType);
  formdata.append('mobile', mobile);
  if (imageChanged == true) {
    console.log('data changed');
    formdata.append('image', image, image.name);
  }

  formdata.append('eduction', formdata.education);
  // formdata.append("experineceCertificate", formdata?.ex);
  formdata.append('martialStatus', formData?.martialStatus);
  // formdata.append("physicalDisablity", "cwsfe c");
  formdata.append('religion', formData?.religion);
  formdata.append('experienceYears', formData?.experienceYears);
  formdata.append('certifiedCourse', formData?.certifiedCourse);
  formdata.append('purposeOfRegistration', formData?.purposeOfRegistration);
  formdata.append('pAddress', formData?.pAddress);
  formdata.append('rAddress', formData?.rAddress);
  formdata.append('fathername', formdata?.fathername);
  formdata.append('mothername', formData?.mothername);
  if (isCertificateUploaded) {
    formdata.append(
      'certificate',
      formData.certificate,
      formData.certificate.name,
    );
  }

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  fetch(
    'http://ec2-43-204-38-110.ap-south-1.compute.amazonaws.com:5000/user/update',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log(result, '<<<update image api');
      successCallBack(JSON.parse(result));
    })

    .catch(error => {
      successCallBack({
        status: false,
        message: 'Please try uploading again !!!',
      });
    });
};

export const getUserDataById = async (uid, token, successCallBack) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    var raw = JSON.stringify({
      id: uid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(BASE_URL + 'uid', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('\n\n\n user datails', result);
        successCallBack(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  } catch (e) {
    console.log(e);
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
export const unFollowPostAPI = async (payload, successCallBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + payload.bearerToken);

  var raw = JSON.stringify({
    userId: payload.userId,
    follwedId: payload.follwedId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(BASE_URL + 'unfollow', requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
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
  console.log(
    '\n\n applyJobPostAPI Called: ',
    jobId,
    applicantId,
    applicantEmail,
    applicantName,
    applicantContact,
    bearerToken,
    '\n resumeLink: ',
    resumeLink,
    '\n policeLink: ',
    policeLink,
    '\n experienceLink: ',
    experienceLink,
    '\n certificateLink: ',
    certificateLink,
  );

  // return null;
  let formData = new FormData();

  formData.append('jobId', jobId);
  formData.append('applicantId', applicantId);
  formData.append('applicantEmail', applicantEmail);
  formData.append('applicantName', applicantName);
  formData.append('applicantContact', applicantContact);
  formData.append('resumeLink', resumeLink);
  if (policeLink != '') {
    formData.append('policeLink', policeLink);
  }
  if (experienceLink != '') {
    formData.append('experienceLink', experienceLink);
  }
  if (certificateLink != '') {
    formData.append('certificateLink', certificateLink);
  }

  try {
    let response = await fetch(BASE_URL2 + 'jobapply', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: formData,
    });
    let json = await response.json();
    console.log(json, '<<<< \n\n\n json');
    successCallBack(json);
  } catch (error) {
    console.error('error', error.message);
    successCallBack(null);
  }
};

export const monthsArray = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const getCategoryById = (token, id, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    id,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(BASE_URL2 + 'category/byId', requestOptions)
    .then(response => response.text())
    .then(result => callBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};
