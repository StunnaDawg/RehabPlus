import { Button } from "react-native-paper"
import { usePhasesContext } from "../../../context/phasesAddContext"
import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"

const AddPhaseButton = ({phaseTitle, phaseOutline, weeksText}) => {
  const [phasesData, setPhasesData] = usePhasesContext([])

  const handlePhaseAdd = () => {
setPhasesData([...phasesData, {title: phaseTitle, outline: phaseOutline, weeks: weeksText}])
    
  }

  useEffect(() => {
console.log(phasesData)
  }, [phasesData])
  return (
    <>
      <Button onPress={async () => handlePhaseAdd()}>Add Phase</Button>
    </>
  )
}

export default AddPhaseButton
