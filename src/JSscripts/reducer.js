function newFilterParam(kind, payload) {
  return { type: kind, flag: payload.flag, mask: payload.mask };
}
function validGrouping(temp) {
  for (let i = 0; i < temp.length; i++) {
    //this condition exists to avoid occurrences like '(ARP)'
    if (temp[i].flag.includes("(") && temp[i + 2].flag.includes(")")) {
      temp[i + 1]["before"] = false;
      temp.splice(i, 1);
      temp.splice(i + 1, 1);
    }
    //this condition exists to avoid occurrences like '()'
    if (temp[i].flag.includes("(") && temp[i + 1].flag.includes(")")) {
      temp.splice(i, 2);
    }
    //this condition exists to avoid occurrences like '(and (...))'
    if (
      temp[i].flag.includes("(") &&
      temp[i - 1] &&
      temp[i - 1].flag.includes("(")
    ) {
      temp[i]["before"] = true;
    }
    if (temp[i].flag == ")'" && temp[i + 1] && temp[i + 1].flag == ")'") {
      temp[i].flag = ")";
    }
  }
  return temp;
}
export function reducer(state, action) {
  switch (action.type) {
    case "FILTER":
      return [...state, newFilterParam("FILTER", action.payload)];

    case "PARAMETRE":
      return [...state, newFilterParam("PARAMETRE", action.payload)];

    case "DELETE":
      let temp = state; //.filter((item) => item.flag !== action.payload.flag);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].flag == action.payload.flag) {
          //this condition exists to avoid occurrences like '(ARP)'
          if (
            temp[i - 1] &&
            temp[i - 1].flag.includes("(") &&
            temp[i + 2] &&
            temp[i + 2].flag.includes(")")
          ) {
            temp.splice(i - 1, 2);
            temp.splice(i, 1);
          }
          //this condition exists to avoid occurrences like BGP and '(or ARP and srcMAC)'
          else if (
            temp[i - 1] &&
            temp[i - 1].flag.includes("(") &&
            temp[i + 2] &&
            !temp[i + 2].flag.includes(")")
          ) {
            temp.splice(i, 1);
            temp[i]["before"] = true;
          } else {
            temp.splice(i, 1);
          }
        }
      }
      temp = validGrouping(temp);
      return [...temp];

    case "PLACE":
      let keys = Object.keys(state);
      let values = Object.values(state);
      for (let i = action.payload.start; i < action.payload.end - 1; i++) {
        keys[i] = (parseInt(keys[i]) + 1).toString();
      }
      for (let i = action.payload.end - 1; i < keys.length; i++) {
        keys[i] = (parseInt(keys[i]) + 2).toString();
      }
      keys.splice(action.payload.start, 0, action.payload.start.toString());
      keys.splice(action.payload.end, 0, action.payload.end.toString());
      // if (
      //   values[parseInt(action.payload.start) - 1] &&
      //   values[parseInt(action.payload.start) - 1]["flag"] != "'("
      // ) {
      values.splice(action.payload.start, 0, {
        type: "parantheses",
        flag: "'(",
        mask: "'(",
      });
      values.splice(action.payload.end, 0, {
        type: "parantheses",
        flag: ")'",
        mask: ")'",
      });
      values[parseInt(action.payload.start) + 1]["before"] = true;
      let newDict = [];
      for (let i = 0; i < keys.length; i++) {
        newDict[keys[i]] = values[i];
      }

      //this condition exists to avoid occurrences like '(..'(...)')'
      //having '' only for the outermost parantheses
      let removeQuote = 1;
      let pairCount = 0;
      let index = newDict.findIndex((item) => item.flag === "'(") + 1;
      let startIndex = newDict.findIndex((item) => item.flag === "'(") + 1;
      while (removeQuote && index < newDict.length) {
        if (newDict[index] && newDict[index]["flag"] == "'(") pairCount++;
        if (newDict[index] && newDict[index]["flag"] == ")'") removeQuote = 0;
        index++;
      }
      pairCount *= 2;
      console.log("startIndex, pairCount : ", startIndex, pairCount);
      while (pairCount) {
        if (newDict[startIndex]["flag"] == "'(") {
          newDict[startIndex]["flag"] = "(";
          pairCount--;
        }

        if (newDict[startIndex]["flag"] == ")'") {
          newDict[startIndex]["flag"] = ")";
          pairCount--;
        }
        startIndex++;
      }
      //ensuring only valid grouping takes place
      newDict = validGrouping(newDict);
      return newDict;
    default:
      return state;
  }
}
