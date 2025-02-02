import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TasksList = ({item, HandleRemoveTask, navigation}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.textBox}>
        <View style={styles.dateTimeBox}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>
        <Text style={styles.heading}>
          {item.task.charAt(0).toUpperCase() + item.task.slice(1)}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateTask', {item: item})}>
          <View style={styles.btnBox}>
            <FontAwesome name="pencil" size={18} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => HandleRemoveTask(item._id)}>
          <View style={styles.btnBox}>
            <FontAwesome name="trash" size={18} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#a7fada',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  textBox: {},
  heading: {
    fontSize: 17,
    // fontWeight: '400',
    marginTop: 5,
  },
  dateTimeBox: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 13,
    marginRight: 10,
  },
  time: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 10,
  },
  btnContainer: {},
  btnBox: {
    marginVertical: 3,
  },
});

export default TasksList;
