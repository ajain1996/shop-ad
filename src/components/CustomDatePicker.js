import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import moment from 'moment';
import { commonStyles } from '../utils/styles';

var today = new Date();
var tempToday1 = new Date();
var tempToday2 = new Date();
var forSecondStart = 0;
var dateSliced =
  today.getFullYear() +
  '- 0' +
  parseInt(today.getMonth() + 1) +
  '- 0' +
  today.getDate();

export default class PersonalLeaveDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedValue: false,
      minDateObj: undefined,
      maxDateObj: undefined,
      iniDateObj: undefined,
    };
  }

  today = new Date();
  initialDate = '';

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });

    var selectedMinDate =
      this.props.minimumDate.length == 0
        ? moment('31-DEC-2010', 'DD-MMM-YYYY').toDate()
        : moment(this.props.minimumDate, 'DD-MMM-YYYY').toDate();
    var startDateObj = new Date();
    startDateObj.setFullYear(selectedMinDate.getFullYear());
    startDateObj.setMonth(selectedMinDate.getMonth());
    startDateObj.setDate(selectedMinDate.getDate());
    this.setState({ minDateObj: startDateObj });

    var selectedMaxDate =
      this.props.maximumDate.length == 0
        ? moment('31-DEC-2030', 'DD-MMM-YYYY').toDate()
        : moment(this.props.maximumDate, 'DD-MMM-YYYY').toDate();
    var endDateObj = new Date();
    endDateObj.setFullYear(selectedMaxDate.getFullYear());
    endDateObj.setMonth(selectedMaxDate.getMonth());
    endDateObj.setDate(selectedMaxDate.getDate());
    this.setState({ maxDateObj: endDateObj });

    var selectedInitialDate =
      this.props.initialDate.length == 0
        ? moment().toDate()
        : moment(this.props.initialDate, 'DD-MMM-YYYY').toDate();
    var initialDateObj = new Date();
    initialDateObj.setFullYear(selectedInitialDate.getFullYear());
    initialDateObj.setMonth(selectedInitialDate.getMonth());
    initialDateObj.setDate(selectedInitialDate.getDate());
    this.setState({ iniDateObj: initialDateObj });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.initialDate = '' + date;
    this.initialDate = this.initialDate.slice(4, 16);
    this.props.isStart != 'yes' ? forSecondStart++ : (forSecondStart = 0);
    tempToday1 = date;
    this.props.onDateSelected(date);
    this.setState({ selectedValue: true });
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          {this.props.heading} <Text style={{ color: '#FF0000' }}>*</Text>{' '}
        </Text>
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <View
            style={[
              styles.inputContainer,
              { borderColor: this.props.error ? 'red' : '#BDBDBD' },
            ]}>
            <Image
              source={require('../assets/img/date.png')}
              style={{ width: 20, height: 20, marginRight: 14 }}
            />
            <Text
              style={
                this.initialDate != ''
                  ? this.props.clear
                    ? styles.input
                    : styles.inputBlack
                  : styles.input
              }>
              {this.initialDate != ''
                ? this.props.clear
                  ? this.props.heading
                  : this.initialDate
                : this.props.clear
                  ? this.props.heading
                  : this.props.placeholderText}
            </Text>
          </View>
        </TouchableOpacity>
        <DateTimePicker
          date={this.state.iniDateObj}
          isVisible={this.state.isDateTimePickerVisible}
          minimumDate={this.state.minDateObj}
          maximumDate={this.state.maxDateObj}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginLeft: 0,
  },
  containerBig: {
    marginTop: 0,
    marginLeft: 0,
    fontSize: 12,
    fontFamily: 'STCForward-Regular',
  },
  inputContainer: {
    marginTop: 5,
    marginHorizontal: 0,
    marginBottom: 0,
    width: windowWidth / 2 - 30,
    borderWidth: 1,
    height: 55,
    borderColor: '#BDBDBD',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
  },
  inputContainerBig: {
    marginTop: 5,
    marginHorizontal: 20,
    marginBottom: 15,
    width: '90%',
    height: 42,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    marginTop: 0,
    marginLeft: 0,
    ...commonStyles.fs16_500,
    marginTop: 14,
  },
  headingBig: {
    marginTop: 0,
    marginLeft: 20,
    fontSize: 12,
    fontFamily: 'STCForward-Regular',
  },
  iconStyle: {
    color: '#8e9aa0',
    marginBottom: 5,
    marginRight: 10,
    marginHorizontal: 0,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 12,
    fontFamily: 'STCForward-Regular',
    color: '#999999',
  },
  inputBlack: {
    padding: 10,
    flex: 1,
    fontSize: 12,
    fontFamily: 'STCForward-Regular',
    color: '#000',
  },
});
