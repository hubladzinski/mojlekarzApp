const initialState = {
  institutions: [],
  physycian: "",
  city: "",
}

const TOGGLE_INSTITUTIONS = "TOGGLE_INSTITUTIONS"
const TOGGLE_PHYSYCIAN = "TOGGLE_PHYSYCIAN"
const TOGGLE_CITY = "TOGGLE_CITY"

export const toggleInstitutions = institutions => ({
  type: TOGGLE_INSTITUTIONS,
  institutions,
})

export const togglePhysycian = physycian => ({
  type: TOGGLE_PHYSYCIAN,
  physycian,
})

export const toggleCity = city => ({
  type: TOGGLE_CITY,
  city,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_INSTITUTIONS:
      return { ...state, institutions: action.institutions }
    case TOGGLE_PHYSYCIAN:
      return { ...state, physycian: action.physycian }
    case TOGGLE_CITY:
      return { ...state, city: action.city }
    default:
      return state
  }
}
