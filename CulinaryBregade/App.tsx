import { Picker} from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';


// Define the MenuItem type
interface MenuItem {
  name: string;
  description: string;
  price: number;
  course: string;
}
interface Course {
  name: string;
  description: string;
  price: number;
  course: string;
}
function MyComponent() {
  const [courses, setCourses] = useState<Course[]>([])
}


// List of available courses
const courseList = [
  { id: 1, name: 'Hors D Oeuvre' },
  { id: 2, name: 'Amuse-Bouche' },
  { id: 3, name: 'Soup' },
  { id: 4, name: 'Salad' },
  { id: 5, name: 'Appetiser' },
  { id: 6, name: 'Fish' },
  { id: 7, name: 'Main Course' },
  { id: 8, name: 'Palate Cleanser' },
  { id: 9, name: 'Second Main Course' },
  { id: 10, name: 'Cheese' },
  { id: 11, name: 'Dessert' },
  { id: 12, name: 'Mignardise' },
];

const MenuItemComponent: React.FC<MenuItem> = ({ name, description, price, course }) => (
  <View style={styles.menuContainer}>
    <Text style={styles.menuName}>{name}</Text>
    <Text style={styles.menuDescription}>{description}</Text>
    <Text style={styles.menuPrice}>R{price}</Text>
    <Text style={styles.menuCourse}>{course}</Text>
  </View>
);



export default function App() {
  const [mName, setMName] = useState<string>('');
  const [mDescription, setMDescription] = useState<string>('');
  const [mPrice, setMPrice] = useState<string>('');
  const [mCourse, setMCourse] = useState<string>('');
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false); // Toggles between menu and add item screens
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Manages login state
  const [username, setUsername] = useState<string>(''); // Holds username input

  const handleSaveMenuItem = () => {
    if (!mName || !mDescription || !mPrice || !mCourse) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const parsedPrice = parseFloat(mPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Error', 'Please enter a valid price.');
      return;
    }

    const newMenuItem: MenuItem = {
      name: mName,
      description: mDescription,
      price: parsedPrice,
      course: mCourse,
    };

    const updatedMenuList = [...menuList, newMenuItem];
    setMenuList(updatedMenuList);

    const newTotal = updatedMenuList.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);

    setMName('');
    setMDescription('');
    setMPrice('');
    setMCourse('');

    Alert.alert('Success', 'Menu item added successfully.');
    setIsAdding(false);
  };

  const handleLogin = () => {
    if (username === 'CHEF CHRISTOFFEL') {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Error', 'Incorrect username. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Login Screen
  const renderLoginScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>LOGIN</Text>
      </View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
      <TouchableHighlight onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableHighlight>

      {/* Client Buttons at Center Bottom */}
      <View style={styles.clientButtonsContainer}>
        <TouchableHighlight onPress={() => alert('Client 1')} style={styles.smallButton}>
          <Text style={styles.buttonText}>Client 1</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => alert('Client 2')} style={styles.smallButton}>
          <Text style={styles.buttonText}>Client 2</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  // Menu Screen
  const renderMenuScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>COURSE</Text>
      </View>
      <View style={styles.centeredContent}>
        <View style={styles.statsContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.statsText}>TOTAL ITEMS</Text>
            <Text style={styles.statsNumber}>{total}</Text>
          </View>
        </View>
        <FlatList
          data={menuList}
          renderItem={({ item }) => (
            <MenuItemComponent
              name={item.name}
              description={item.description}
              price={item.price}
              course={item.course}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Empty Menu</Text>}
        />
        <TouchableHighlight onPress={() => setIsAdding(true)} style={styles.smallButton}>
          <Text style={styles.buttonText}>ADD MENU ITEM</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={handleLogout} style={styles.smallButton}>
          <Text style={styles.buttonText}>BACK TO LOGIN</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  // Add Menu Item Screen
  const renderAddItemScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>ADD MENU ITEM</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          onChangeText={setMName}
          value={mName}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          onChangeText={setMDescription}
          value={mDescription}
          multiline={true}
          style={styles.inputDescr}
        />
        <TextInput
          placeholder="Price"
          onChangeText={setMPrice}
          value={mPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <Picker
          selectedValue={mCourse}
          onValueChange={(itemValue: string) => setMCourse(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Courses" value="" />
          {courseList.map((item) => (
            <Picker.Item label={item.name} value={item.name} key={item.id} />
          ))}
        </Picker>
        <TouchableHighlight onPress={handleSaveMenuItem} style={styles.smallButton}>
          <Text style={styles.buttonText}>SAVE ITEM</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setIsAdding(false)} style={styles.smallButton}>
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  return isLoggedIn ? (isAdding ? renderAddItemScreen() : renderMenuScreen()) : renderLoginScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ab9588',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Poppins, sans-serif',
    color: '#fff',
  },
  statsContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    color: '#f1f1f1',
    fontFamily: 'Poppins, sans-serif',
  },
  statsNumber: {
    fontSize: 24,
    color: '#32cd32',
    fontFamily: 'Poppins, sans-serif',
  },
  menuContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuName: {
    fontSize: 20,
    fontFamily: 'Poppins, sans-serif',
    color: '#ffd700',
  },
  menuDescription: {
    fontSize: 14,
    color: '#32cd32',
    fontFamily: 'Poppins, sans-serif',
  },
  menuPrice: {
    fontSize: 16,
    color: '#f1f1f1',
    fontFamily: 'Poppins, sans-serif',
  },
  menuCourse: {
    fontSize: 16,
    color: '#f1f1f1',
    fontFamily: 'Poppins, sans-serif',
  },
  inputContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    color : '#fff',
  },
  inputDescr: {
    height: 80,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    color: '#fff',
  },
  smallButton: {
    backgroundColor: '#32cd32',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  clientButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#f1f1f1',
    fontSize: 18,
    fontFamily: 'Poppins, sans-serif',
  },
  centeredContent: {
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
  },
});