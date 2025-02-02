import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TaskController from '../../controller/TaskController';
import Snackbar from 'react-native-snackbar';

const AddTask = ({navigation}: any) => {
  const {HandleAddTask} = TaskController();

  const [task, setTask] = useState<string>('');

  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [isTimePickerVisible, setIsTimePickerVisible] =
    useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const HandleDateConfirm = (date: any) => {
    const formattedDate = date.toDateString();
    setSelectedDate(formattedDate);
    setIsDatePickerVisible(false);
  };

  const handleTimeConfirm = (time: Date) => {
    setSelectedTime(
      time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
    );
    setIsTimePickerVisible(false);
  };

  const HanldeOnSubmit = async () => {
    const data = {
      task,
      date: selectedDate,
      time: selectedTime,
    };
    const resp = await HandleAddTask(data);

    if (resp.success) {
      Snackbar.show({
        text: resp.message || 'Task added successfully!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
      });
      setTask('');
      setSelectedDate('');
      setSelectedTime('');
      navigation.navigate('Home');
    } else {
      Snackbar.show({
        text: resp.error || 'Something is wrong! Please try again',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View style={styles.taskForm}>
      <TextInput
        value={task}
        placeholder="Task"
        style={styles.inputField}
        onChangeText={text => setTask(text)}
      />

      <View>
        <TouchableOpacity
          style={styles.datePickerBox}
          onPress={() => setIsDatePickerVisible(true)}>
          <TextInput
            value={selectedDate}
            placeholder="Date"
            style={[styles.inputField, styles.datePicker]}
            editable={false} // Prevents typing
            selectTextOnFocus={true} // Allows text selection but no editing
          />
          <View style={styles.datePickerIcon}>
            <FontAwesome name="calendar" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={new Date()} // Disables past dates
          onConfirm={HandleDateConfirm}
          onCancel={() => setIsDatePickerVisible(false)}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.datePickerBox}
          onPress={() => setIsTimePickerVisible(true)}>
          <TextInput
            value={selectedTime}
            placeholder="Time"
            style={[styles.inputField, styles.datePicker]}
            onChangeText={text => setTask(text)}
            editable={false} // Prevents typing
            selectTextOnFocus={true} // Allows text selection but no editing
          />
          <View style={styles.datePickerIcon}>
            <FontAwesome name="clock-o" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setIsTimePickerVisible(false)}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={[styles.btnBox, styles.btnBox1]}>
            <Text style={[styles.btnText, {color: '#000'}]}>Back</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={HanldeOnSubmit}>
          <View style={[styles.btnBox, styles.btnBox2]}>
            <Text style={styles.btnText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskForm: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#999',
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 8,
    marginVertical: 10,
  },
  datePickerBox: {},
  datePicker: {},
  datePickerIcon: {
    position: 'absolute',
    top: 22,
    right: 10,
  },
  btnContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnBox: {
    width: 150,
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 10,
    borderRadius: 25,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  btnBox1: {
    backgroundColor: '#ccc',
    // backgroundColor: '#f04f5a',
  },
  btnBox2: {
    backgroundColor: '#4f7af0',
  },
});

export default AddTask;
