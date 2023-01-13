import { Pattern } from "../../lib/types"
import selection, { useSelection } from "./selection"

type Props = {
  pattern: Pattern
}

const PatternClassAccordionPattern = ({ pattern }: Props) => {
  const { patternNames } = useSelection()
  return (
    <div className="flex justify-between" key={pattern.name}>
      <div className="overflow-hidden text-ellipsis w-full whitespace-nowrap">
        {pattern.name}
      </div>
      <input
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked && !patternNames.includes(pattern.name)) {
            selection.patternNames.push(pattern.name)
          } else if (!e.target.checked && patternNames.includes(pattern.name)) {
            selection.patternNames = selection.patternNames.filter(
              (x) => x !== pattern.name
            )
          }

          console.log(selection.patternNames)
        }}
        checked={patternNames.includes(pattern.name)}
      />
    </div>
  )
}

export default PatternClassAccordionPattern
