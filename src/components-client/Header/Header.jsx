import { Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { UserName, ProfileImage } from './components';


export function ClientHeader() {
    return (
        <Stack.Screen
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '%', marginHorizontal: '5%' }}>
                <Text style={{ 
                  fontWeight: 'bold', 
                  flex: 3, // Adjust as necessary
                  fontSize: 16, // Adjust font size as necessary
                }}>
                  Rehab+
                </Text>
                <View style={{ flex: 1}}>
                    <UserName/>
                </View>
                <View style={{ flex: 1 }}> 
                  <ProfileImage />
                </View>
                
              </View>
            ),
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: '#fff',
          }}
        />
      );
  }