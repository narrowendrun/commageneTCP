function newFilterParam(kind, payload) {
  return { type: kind, flag: payload.flag, mask: payload.mask };
}

export function reducer(state, action) {
  switch (action.type) {
    case "FILTER":
      return [...state, newFilterParam("FILTER", action.payload)];

    case "PARAMETRE":
      return [...state, newFilterParam("PARAMETRE", action.payload)];

    case "DELETE":
      let temp = state.filter((item) => item.flag !== action.payload.flag);
      return [...temp];

    case "EDIT":
      return state;
    default:
      return state;
  }
}
