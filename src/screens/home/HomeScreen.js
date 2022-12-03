import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableHighlight,
    ScrollView,
    Share,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import { commonStyles } from '../../utils/styles';
import HomeHeader from './HomeHeader';
import HomeSearch from './HomeSearch';
import { SIZES } from '../../utils/theme';
import {
    addLikesByIDPostAPI,
    getAllJobsPostRequest,
    getAllOffersPostRequest,
    getAllWorksPostRequest,
    getCommentsCountByIDPostAPI,
    getLikesCountByIDPostAPI,
    getOffersByLocationPostRequest,
    getUserByIDPostAPI,
    unLikesByIDPostAPI,
} from '../../utils/API';
import { useState } from 'react';
import Auth from '../../services/Auth';
import CustomLoader, { CustomPanel } from '../../components/CustomLoader';
import Toast from 'react-native-simple-toast';
import PTRView from 'react-native-pull-to-refresh';
import HomeModal from './HomeModal';
import { useDispatch, useSelector } from 'react-redux';
import { setOffer } from '../../redux/reducer/offer';
import { setJob } from '../../redux/reducer/jobs';
import { setWork } from '../../redux/reducer/work';
import moment from 'moment';
import CategoryModal from './CategoryModal';
import HomeSearchData from './HomeSearchData';
import HomeCarousel from './HomeCarousel';

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { offerData } = useSelector(state => state.Offer);

    const [bearerToken, setBearerToken] = useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', () => {
                Auth.getLocalStorageData('bearer').then(token => {
                    setBearerToken(token);
                    getAllOffersPostRequest(token, response => {
                        setLoading(false);
                        if (response !== null) {
                            dispatch(setOffer(response?.data));
                        }
                    });
                });
            });
            return unsubscribe;
        })();
    }, [navigation]);

    React.useEffect(() => {
        setLoading(true);
        Auth.getLocalStorageData('bearer').then(token => {
            setBearerToken(token);
            getAllOffersPostRequest(token, response => {
                setLoading(false);
                if (response !== null) {
                    dispatch(setOffer(response?.data));
                }
            });

            getAllJobsPostRequest(token, response => {
                if (response !== null) {
                    dispatch(setJob(response?.data));
                }
            });

            getAllWorksPostRequest(token, response => {
                if (response !== null) {
                    dispatch(setWork(response?.data));
                }
            });
        });
    }, []);

    function _refresh() {
        setLoading(true);
        Auth.getLocalStorageData('bearer').then(token => {
            setLoading(false);
            setBearerToken(token);
            getAllOffersPostRequest(token, response => {
                if (response !== null) {
                    dispatch(setOffer(response?.data));
                }
            });
        });
    }

    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestionTitleData, setSuggestionTitleData] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [locationTitle, setLocationTitle] = useState('');

    const [loading2, setLoading2] = useState(false);
    const [savedItems, setSavedItems] = useState([]);

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <HomeHeader
                navigation={navigation}
                onPress={() => {
                    navigation.navigate('AddSaleOfferScreen');
                }}
            />
            <View style={{ ...commonStyles.rowBetween }}>
                <HomeSearch
                    width={'86%'}
                    defaultValue={locationTitle}
                    onChange={val => {
                        setLoading2(true);
                        Auth.getLocalStorageData('bearer').then(token => {
                            setLoading2(false);
                            setShowSuggestion(true);
                            setBearerToken(token);
                            if (val?.length === 0) {
                                setSuggestionTitleData([]);
                                dispatch(setOffer(offerData));
                                return true;
                            }
                            getOffersByLocationPostRequest(val, token, response => {
                                if (response !== null) {
                                    dispatch(setOffer(response?.data));
                                    setSuggestionTitleData(response?.data);
                                    return true;
                                }
                            });
                        });
                    }}
                />
                <TouchableHighlight
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '16%',
                        height: 58,
                    }}
                    underlayColor="#f7f8f9"
                    onPress={() => {
                        setShowCategoryModal(true);
                    }}>
                    <Image
                        source={require('../../assets/img/filter2.png')}
                        style={{ width: 36, height: 36 }}
                    />
                </TouchableHighlight>
                <CategoryModal
                    modalVisible={showCategoryModal}
                    navigation={navigation}
                    callback={() => {
                        setShowCategoryModal(!showCategoryModal);
                    }}
                />
            </View>

            <HomeSearchData
                showSuggestion={showSuggestion}
                loading={loading2}
                suggestionTitleData={suggestionTitleData}
                setSuggestionTitleData={setSuggestionTitleData}
                setShowSuggestion={setShowSuggestion}
                setLocationTitle={setLocationTitle}
            />

            <PTRView onRefresh={_refresh}>
                <ScrollView>
                    <HomeCarousel />
                    {offerData?.map((item, index) => {
                        return (
                            <View key={index}>
                                <RenderSingleOffer
                                    item={item}
                                    bearerToken={bearerToken}
                                    navigation={navigation}
                                    setSavedItems={setSavedItems}
                                    savedItems={savedItems}
                                />
                            </View>
                        );
                    })}

                    {offerData?.length === 0 ? (
                        <View
                            style={{
                                backgroundColor: '#fff',
                                height: SIZES.height,
                                ...commonStyles.centerStyles,
                            }}>
                            <Text style={{ ...commonStyles.fs14_400, color: '#000' }}>
                                No Data
                            </Text>
                        </View>
                    ) : (
                        <></>
                    )}
                </ScrollView>
                <View style={{ height: 64 }} />
            </PTRView>
            <CustomPanel loading={loading} />
            <CustomLoader loading={loading} />
        </>
    );
}

const RenderSingleOffer = ({
    item,
    bearerToken,
    navigation,
    setSavedItems,
    savedItems,
}) => {
    const { userData } = useSelector(state => state.User);

    const [user, setUser] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);

    React.useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', () => {
                getUserByIDPostAPI(item?.ownerId, bearerToken, response => {
                    if (response !== null) {
                        setUser(response?.data[0]);
                    }
                });

                getLikesCountByIDPostAPI(item?._id, bearerToken, response => {
                    if (response !== null) {
                        if (response.data) {
                            setLikesCount(response?.count);
                            const data = response?.data;
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].likedBy === userData[0]?._id) {
                                    setIsLike(true);
                                }
                            }
                        }
                    }
                });

                getCommentsCountByIDPostAPI(item?._id, bearerToken, response => {
                    if (response !== null) {
                        if (response.data) {
                            setCommentsCount(response?.count);
                        }
                    }
                });
            });
            return unsubscribe;
        })();
    }, [navigation]);

    React.useEffect(() => {
        (async () => {
            getUserByIDPostAPI(item?.ownerId, bearerToken, response => {
                if (response !== null) {
                    setUser(response?.data[0]);
                }
            });

            getLikesCountByIDPostAPI(item?._id, bearerToken, response => {
                if (response !== null) {
                    if (response.data) {
                        setLikesCount(response?.count);
                        const data = response?.data;
                        for (let i = 0; i < data.length; i++) {
                            if (data[i]?.likedBy === userData[0]?._id) {
                                setIsLike(true);
                            }
                        }
                    }
                }
            });

            getCommentsCountByIDPostAPI(item?._id, bearerToken, response => {
                if (response !== null) {
                    if (response?.data) {
                        setCommentsCount(response?.count);
                    }
                }
            });
        })();
    }, []);

    const handleLike = () => {
        if (isLike) {
            setLikesCount(prev => prev - 1);
            setIsLike(false);
            unLikesByIDPostAPI(item?._id, userData[0]?._id, bearerToken, response => {
                if (response !== null) {
                    if (response?.message) {
                        Toast.show('Un Liked Successfully!');
                    }
                }
            });
        } else if (!isLike) {
            setLikesCount(prev => prev + 1);
            setIsLike(true);
            addLikesByIDPostAPI(
                item?._id,
                userData[0]?._id,
                bearerToken,
                response => {
                    if (response !== null) {
                        if (response?.message === 'Already Liked') {
                            Toast.show(response?.message);
                        } else if (response?.status.toString().toLowerCase() === 'true') {
                            Toast.show('Liked Successfully!');
                        }
                    }
                },
            );
        }
    };

    const handleComment = () => {
        navigation.navigate('CommentScreen', {
            postUserData: user,
            bearerToken: bearerToken,
            offerItem: item,
            ownerId: item?.ownerId,
        });
    };

    const [homeModalVisible, setHomeModalVisible] = useState(false);

    var email = user?.email?.split('@')[0];

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `${item?.description}\n${item?.offerImage}`,
                url: 'https://play.google.com/store/apps',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };

    function dayDiff(startDate, endDate) {
        const diffInMs = moment(endDate) - moment(startDate);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays + 1;
    }

    var startDate = moment(item?.startDate).format('DD/MM/YYYY');
    var endDate = moment(item?.endDate).format('DD/MM/YYYY');
    var diffDays = dayDiff(startDate, endDate);

    return (
        <View
            style={{
                borderBottomColor: '#D8D8D8',
                borderBottomWidth: 1,
                backgroundColor: '#fff',
            }}>
            <View
                style={{
                    ...commonStyles.rowBetween,
                    height: 62,
                    width: '100%',
                    padding: 20,
                }}>
                <View style={{ ...commonStyles.rowStart, alignItems: 'center' }}>
                    <TouchableHighlight
                        underlayColor="#f7f8f9"
                        onPress={() => {
                            navigation.navigate('UserDetailsScreen', {
                                userId: item?.ownerId,
                                user: user,
                            });
                        }}>
                        {user?.userProfile !== undefined ? (
                            <Image
                                source={{ uri: user?.userProfile }}
                                resizeMode="contain"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100,
                                    marginTop: 6,
                                    borderWidth: 2,
                                    borderColor: '#E27127',
                                }}
                            />
                        ) : (
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100,
                                    marginTop: 6,
                                    borderWidth: 2,
                                    borderColor: '#E27127',
                                }}>
                                <Image
                                    source={require('../../assets/img/profile-tab.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 100,
                                        marginHorizontal: 4,
                                        marginVertical: 3,
                                    }}
                                />
                            </View>
                        )}
                    </TouchableHighlight>

                    <View style={{ marginLeft: 6 }}>
                        <TouchableHighlight
                            underlayColor="#f7f8f9"
                            onPress={() => {
                                navigation.navigate('UserDetailsScreen', {
                                    userId: item?.ownerId,
                                    user: user,
                                });
                            }}>
                            <Text style={{ ...commonStyles.fs14_700 }}>{user?.name}</Text>
                        </TouchableHighlight>
                        <View style={{ ...commonStyles.rowStart, alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/img/location.png')}
                                resizeMode="contain"
                                style={{ width: 18, height: 16 }}
                            />
                            <TouchableHighlight
                                onPress={() => {
                                    navigation.navigate('LocationScreen');
                                }}
                                underlayColor="#f7f8f9">
                                <Text style={{ ...commonStyles.fs12_400, marginLeft: 2 }}>
                                    {item?.location}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                <TouchableHighlight
                    onPress={() => setHomeModalVisible(true)}
                    underlayColor="#f7f8f9">
                    <Image
                        source={require('../../assets/img/3dots.png')}
                        resizeMode="contain"
                        style={{ width: 24, height: 24, borderRadius: 100 }}
                    />
                </TouchableHighlight>
            </View>

            <Image
                source={{ uri: item?.offerImage }}
                style={{ width: SIZES.width, height: 311 }}
            />

            <View style={{ ...commonStyles.rowBetween, padding: 15 }}>
                <View style={{ ...commonStyles.rowStart }}>
                    <TouchableHighlight
                        onPress={handleLike}
                        underlayColor="#eee"
                        style={{ padding: 5 }}>
                        <View style={{ ...commonStyles.row }}>
                            <Image
                                source={
                                    isLike
                                        ? require('../../assets/img/heart.png')
                                        : require('../../assets/img/hearto.png')
                                }
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: isLike ? '#FF0000' : '#000',
                                }}
                            />
                            <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>
                                {likesCount} Likes
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={handleComment}
                        underlayColor="#eee"
                        style={{ padding: 5, marginLeft: 34 }}>
                        <View style={{ ...commonStyles.row }}>
                            <Image
                                source={require('../../assets/img/comment.png')}
                                style={{ width: 26, height: 26, tintColor: '#000000' }}
                            />
                            <Text style={{ ...commonStyles.fs14_500, marginLeft: 9 }}>
                                {commentsCount} Comments
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={handleShare} underlayColor="#fff">
                    <Image
                        source={require('../../assets/img/share.png')}
                        style={{ width: 22, height: 22, tintColor: '#000000' }}
                    />
                </TouchableHighlight>
            </View>
            <View style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -16 }}>
                <Text style={{ ...commonStyles.fs14_500, marginBottom: 12 }}>
                    @{email}
                </Text>
                <Text
                    style={{
                        ...commonStyles.fs12_400,
                        marginLeft: 8,
                        marginBottom: 10,
                        marginTop: 2,
                        color: '#E27127',
                    }}>
                    {item?.description}
                </Text>
            </View>
            <View style={{ ...commonStyles.rowStart, marginLeft: 20, marginTop: -10 }}>
                <Text style={{ ...commonStyles.fs13_500, marginBottom: 12 }}>
                    Days left:
                </Text>
                {diffDays.toString().toLocaleLowerCase() !== 'nan' ? (
                    <Text
                        style={{ ...commonStyles.fs12_400, marginLeft: 8, marginBottom: 12 }}>
                        {diffDays}
                    </Text>
                ) : (
                    <></>
                )}
            </View>

            <HomeModal
                modalVisible={homeModalVisible}
                setModalVisible={setHomeModalVisible}
                feedbackFor="offer"
                feedbackNumber={item?.ownerId}
                callback={() => setHomeModalVisible(!homeModalVisible)}
                savedCallback={async () => {
                    setSavedItems(oldArray => [...oldArray, item]);
                    await Auth.setLocalStorageData(
                        'Saved_Item',
                        JSON.stringify(savedItems),
                    );
                }}
            />
        </View>
    );
};
