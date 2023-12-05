import { View, Text } from 'react-native'
import React from 'react'
import { List, TouchableRipple } from 'react-native-paper'

const DropDownDays = ({setTheDays, chosenDays}) => {
    const handlePress = () => setExpanded(!expanded);
  return (
    <View className='mx-4'>
        <List.Section title='Days per Week'>
        <List.Accordion
        left={props => <List.Icon {...props} icon="calendar"  />} title={chosenDays}>
          <TouchableRipple>
        <List.Item title="1" onPress={() => setTheDays('1')} />
        </TouchableRipple>
        <TouchableRipple>
        <List.Item title="2" onPress={() => {setTheDays('2')}} />
        </TouchableRipple>
        <TouchableRipple>
        <List.Item title="3" onPress={() => {setTheDays('3')}} />
        </TouchableRipple>
        <TouchableRipple>
        <List.Item title="4" onPress={() => {setTheDays('4')}} />
        </TouchableRipple>
        <TouchableRipple>
        <List.Item title="5" onPress={() => {setTheDays('5')}} />
        </TouchableRipple>
        <TouchableRipple>
        <List.Item title="6" onPress={() => {setTheDays('6')}} />
        </TouchableRipple>
        <TouchableRipple>
        <List.Item title="7" onPress={() => {setTheDays('7')}} />
        </TouchableRipple>
      </List.Accordion>
        </List.Section>
    </View>
  )
}

export default DropDownDays