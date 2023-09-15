import { View, Text } from 'react-native'
import { TextInput, TextInputProps, List } from 'react-native-paper'
import { useState } from 'react';

const StartPage = () => {

    const [expanded, setExpanded] = useState(true);
    const [text, setTitleText] = useState('')
    const [outlineText, setOutlineText] = useState('')
    const [weeksText, setWeeksText] = useState('')
  const handlePress = () => setExpanded(!expanded);
  return (
    <>
    <View className='mx-4 my-1'>
        <Text>Protocol Title</Text>
        <TextInput mode='outlined' onChangeText={text => setText(text)}></TextInput>
    </View>

    <View className='mx-4 my-1'>
        <Text>Outline</Text>
        <TextInput mode='outlined' onChangeText={text => setOutlineText(text)}></TextInput>
    </View>

    <View className='mx-4 my-1'>
        <Text>Weeks</Text>
        <TextInput mode='outlined' onChangeText={text => setWeeksText(text)}></TextInput>
    </View>

    <View className='mx-4'>
        <List.Section title='Days per Week'>
        <List.Accordion
        left={props => <List.Icon {...props} icon="calendar" />}>
        <List.Item title="1" />
        <List.Item title="2" />
        <List.Item title="3" />
        <List.Item title="4" />
        <List.Item title="5" />
        <List.Item title="6" />
        <List.Item title="7" />
      </List.Accordion>
        </List.Section>
    </View>
    </>
  )
}

export default StartPage