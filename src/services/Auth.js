import Storage from '../utils/Storage';

async function getAccount() {
  return await Storage.get('account');
}

async function getIntro() {
  return await Storage.get('alreadyLaunched');
}

async function setAccount(data) {
  return await Storage.set('account', data);
}

async function setIntro(data) {
  return await Storage.set('alreadyLaunched', data);
}

async function logout() {
  await AsyncStorage.setItem('SAVED_OFFER', JSON.stringify(null));
  await AsyncStorage.setItem('LIKED_OFFER', JSON.stringify(null));
  await AsyncStorage.setItem('TOTAL_SHARED', JSON.stringify(null));
  return await Storage.set('account', null);
}

async function getLocalStorageData(Key) {
  return await Storage.get(Key);
}

async function setLocalStorageData(Key, data) {
  return await Storage.set(Key, data);
}

export default {
  logout,
  getAccount,
  setAccount,
  getIntro,
  setIntro,
  getLocalStorageData,
  setLocalStorageData,
};
