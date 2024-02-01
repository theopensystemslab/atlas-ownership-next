import { ArrowRight } from "@carbon/icons-react"
import css from "./SubmitButton.module.css"

const SubmitButton = () => (
  <div className={css.submitButtonContainer}>
    <a
      href="https://airtable.com/shru3ZGjdyhEGTzx6"
      target="_blank"
      rel="noreferrer"
      className={css.submitButton}
    >
      Submit an entry <ArrowRight className="ml-2" size={16} />
    </a>
  </div>
)

export default SubmitButton
