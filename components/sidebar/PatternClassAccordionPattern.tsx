import css from "./PatternClassAccordionPattern.module.css"
import { Pattern } from "../../lib/types"
import selection, { useSelection } from "./selection"
import { Hotel, RadioButton, RadioButtonChecked } from "@carbon/icons-react"

type Props = {
  pattern: Pattern
}

const PatternClassAccordionPattern = ({ pattern }: Props) => {
  const { patternNames } = useSelection()
  return (
    <div key={pattern.name} className={css.root}>
      <label className={css.label} htmlFor={pattern._id}>
        <div className={css.labelText}>
          <Hotel size={24} className={css.icon} />
          <p>{pattern.name}</p>
        </div>
        {patternNames.includes(pattern.name) ? (
          <RadioButtonChecked
            size={24}
            className={css.checkbox}
            role="checkbox"
            aria-checked="true"
          />
        ) : (
          <RadioButton
            size={24}
            className={css.checkbox}
            role="checkbox"
            aria-checked="false"
          />
        )}
      </label>
      <input
        id={pattern._id}
        type="checkbox"
        className="hidden"
        onChange={(e) => {
          if (e.target.checked && !patternNames.includes(pattern.name)) {
            selection.patternNames.push(pattern.name)
          } else if (!e.target.checked && patternNames.includes(pattern.name)) {
            selection.patternNames = selection.patternNames.filter(
              (x) => x !== pattern.name
            )
          }
        }}
        checked={patternNames.includes(pattern.name)}
      />
    </div>
  )
}

export default PatternClassAccordionPattern
