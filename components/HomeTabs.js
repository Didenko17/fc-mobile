import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Expenses } from './Expenses';
import { Incomes } from './Incomes';
import { Savings } from './Savings';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Savings"
        backBehavior="history"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === 'Incomes') {
                    iconName = 'cash-plus'
                  } else if (route.name === 'Expenses') {
                    iconName = 'cash-minus'
                  } else if (route.name === 'Savings') {
                    iconName = 'piggy-bank-outline'
                  }
                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
        headerStyle: {
            backgroundColor: '#363742',
        },
        headerTintColor: '#cacaca',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
            height: 60,
            backgroundColor: '#363742',
        },
        tabBarItemStyle: {
            marginVertical: 10,
        },
        })}
      >
        <Tab.Screen name="Incomes" component={Incomes} options={{ title: 'Доходы' }} />
        <Tab.Screen name="Savings" component={Savings} options={{ title: 'Накопления' }} />
        <Tab.Screen name="Expenses" component={Expenses} options={{ title: 'Расходы' }} />
      </Tab.Navigator>
    );
  }