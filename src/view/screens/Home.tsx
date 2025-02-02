import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerParamList} from '../../DrawerNavigation';
import TasksList from '../components/TasksList';
import TaskController from '../../controller/TaskController';
import Loading from '../components/Loading';
import AuthController from '../../controller/AuthController';
import {useRefresh} from '../../controller/context/useRefresh';

type HomeProps = {
  navigation: NativeStackNavigationProp<DrawerParamList, 'Home'>;
};

const Home = ({navigation}: HomeProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [taskList, setTaskList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const {refresh, setRefresh} = useRefresh();
  const {HandleRemoveTask, HandleFetchTasks} = TaskController();
  const {HandleAuthentication} = AuthController();

  useEffect(() => {
    const HandleAuth = async () => {
      await HandleAuthentication();
      setIsLoggedIn(true);
    };

    HandleAuth();
  }, []);

  const fetchTasks = async () => {
    if (isLoggedIn) {
      console.log('Fetching tasks...');
      const fetchedTasks = await HandleFetchTasks();
      setTaskList(fetchedTasks);
      if (fetchedTasks) {
        setRefresh(false);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isLoggedIn, refresh]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTasks();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Refresh indicator will be visible for at least 1 second
  };

  if (isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View>
        {taskList.length > 0 ? (
          <FlatList
            data={taskList}
            keyExtractor={item => `${item._id}-${new Date().getTime()}`}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => (
              <TasksList
                item={item}
                HandleRemoveTask={HandleRemoveTask}
                navigation={navigation}
              />
            )}
          />
        ) : (
          // <ScrollView>
          //   {taskList.map((item: any, index: number) => (
          //     <View key={index}>
          //       <TasksList
          //         item={item}
          //         HandleRemoveTask={HandleRemoveTask}
          //         navigation={navigation}
          //       />
          //     </View>
          //   ))}
          // </ScrollView>
          <View style={styles.noTasksContainer}>
            <Text style={styles.noTasksText}>No Tasks Found</Text>
          </View>
        )}
      </View>
      <View style={styles.btnIconBox}>
        <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
          <View>
            <FontAwesome name="plus" style={styles.btnIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  noTasksContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noTasksText: {
    fontSize: 18,
    color: 'gray',
  },
  btnIconBox: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  btnIcon: {
    padding: 20,
    color: '#fff',
    fontSize: 22,
    borderRadius: 55,
    alignSelf: 'center',
    backgroundColor: 'blue',
  },
});

export default Home;
