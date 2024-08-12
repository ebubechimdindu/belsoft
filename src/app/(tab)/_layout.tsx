import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar"

export default function RootLayout() {
 
  return (
    <Tabs
    tabBar={props => <TabBar {...props} />}
    screenOptions={{headerShown:false}}
    initialRouteName="index"
    >
      <Tabs.Screen name="index"  options={{
        title:'Home'
      }}
      />
      <Tabs.Screen name="send" options={{
        title:'Send'
      }} />
      <Tabs.Screen name="scan" options={{
        tabBarLabel: '',
        
      }} />
      <Tabs.Screen name="pay" options={{
        title:'Pay'
      }} />
      <Tabs.Screen name="profile" options={{
        title:'Profile'
      }} />
    </Tabs>
  );
}
