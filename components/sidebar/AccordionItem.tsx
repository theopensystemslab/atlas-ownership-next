import css from "./AccordionItem.module.css"
import { Hotel, RadioButton, RadioButtonChecked } from "@carbon/icons-react"
import { ChangeEvent } from "react"
import { EntryFilterData } from "./Accordion"

type Props = {
  handleChange: (e: ChangeEvent<HTMLInputElement>, data: EntryFilterData) => void
  checked: boolean
  displayText: string
  id: string
  data: EntryFilterData
}

const AccordionItem = ({ handleChange, checked, displayText, id, data }: Props) => {

  return (
    <div key={displayText} className={css.root}>
      <label className={css.label} htmlFor={id}>
        <div className={css.labelText}>
        <Hotel size={24} className={css.icon} />
        <p>{displayText}</p>
        </div>
        {checked ?
          <RadioButtonChecked size={24} className={css.checkbox} role="checkbox" aria-checked="true"/> :
          <RadioButton size={24} className={css.checkbox} role="checkbox" aria-checked="false"/>
        }
      </label>
      <input
        id={id}
        type="checkbox"
        className="hidden"
        onChange={(e) => handleChange(e, data)}
        checked={checked}
      />
    </div>
  )
}

export default AccordionItem
