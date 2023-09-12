import { View, Text, Image} from "react-native"
import { Card , Button } from "react-native-paper"
import theImage from '../assets/ACL-Repair-Surgery.jpg'
import React from "react"

const ProtocolScreenWidget = () => {
  return (
    <View>
      <Card className='m-3'>
        <Card.Content>
            <View className='justify-center items-center'>
        <Text variant='titleLarge' className='font-bold text-2xl'> ACL Phase 1 <Button icon='pencil'>Edit</Button></Text>
        
        <Button icon='account'>Assign to Client</Button>
        </View>
        <View className='flex-row'>
          <Image
           source={theImage}
           style={{width: 100, height:100 }}
          />
        <View className='flex-1 flex-row justify-between'>
          <View className='flex-col'>
          <Text className='m-2 font-bold'>Weeks:</Text>
          <Text className='m-2 font-bold'>Description:</Text>
          <Card className='m-2'>
            <Card.Content>
            </Card.Content>
          </Card>
          </View>

          </View>
          </View>
          
        </Card.Content>
      </Card>
    </View>
  )
}

export default ProtocolScreenWidget
