import { Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';

export function UserName() {
    return (
        <>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ maxWidth: '100%', marginRight: 5, fontSize:'10px' }}>Welcome</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ maxWidth: '100%', marginRight: 5, fontSize:'10px' }}>User</Text>
        </View>
        </>
    )
}