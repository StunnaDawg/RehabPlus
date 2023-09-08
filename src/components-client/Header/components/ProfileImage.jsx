import { Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { UserName } from './UserName';

export function ProfileImage() {
    return (
        <>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Icon size={40} icon="account" />
        </View>
        </>
      );
}