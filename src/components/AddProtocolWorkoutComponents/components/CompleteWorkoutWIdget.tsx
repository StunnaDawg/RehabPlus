
import { Button, Card, Text } from "react-native-paper"


type CompleteWorkoutWidgetProps = {
  workoutTitle?: string;
};

const CompleteWorkoutWidget = ({ workoutTitle }: CompleteWorkoutWidgetProps) => {
    return (
      <Card mode="contained" className="mt-3 mx-8 ">
        <Card.Content className="flex-1 flex-row justify-center">
          <Text variant="titleLarge">
           {workoutTitle}
          </Text>
        </Card.Content>
        <Card.Content className="flex-1 flex-row">
          {/* <Card.Cover className="w-20 h-20" source={ExerciseImage} /> */}
          <Card.Actions className="flex-1 flex-col">
            <Button className="my-1">View</Button>
            <Button className="my-1">Delete</Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    )
  }
  
  export default CompleteWorkoutWidget