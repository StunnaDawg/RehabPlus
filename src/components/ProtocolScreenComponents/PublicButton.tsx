import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-paper'

const PublicButton = () => {
    const [listPublic, setListPublic] = useState<boolean>(false);

    const onToggleSwitch = () => setListPublic(!listPublic);
  
    return (
      <View className='flex-1 flex-row-reverse items-center justify-center'>
        <Text>Show Public Protocols</Text>
        <Switch value={listPublic} onValueChange={onToggleSwitch} />
      </View>
    );
}

export default PublicButton