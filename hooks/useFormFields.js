import { useState } from "react"

function useFormFields(initialValues) {
  const [formFields, setFormFields] = useState(initialValues)
  const createChangeHandler = (key) => (value) => {
    setFormFields((prev) => ({ ...prev, [key]: value }))
  }
  return { formFields, createChangeHandler }
}
export default useFormFields
