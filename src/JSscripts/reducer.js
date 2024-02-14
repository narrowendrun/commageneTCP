function newFilterParam(kind, payload) {
  return { type: kind, flag: payload.flag, mask: payload.mask };
}
function validGrouping(temp) {
  for (let i = 0; i < temp.length; i++) {
    console.log(`temp at i = ${i} : `, temp);
    //this condition exists to avoid occurrences like '(ARP)'
    if (temp[i].flag.includes("(") && temp[i + 2].flag.includes(")")) {
      if (temp[i - 1] && temp[i - 1].flag.includes("(")) {
        temp[i + 1].before = true;
      } else {
        temp[i + 1].before = false;
      }
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
  }
  if (temp[0] && temp[0].flag.includes("(")) {
    temp[0]["before"] = "false";
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
      console.log("deleting", action.payload);
      let temp = state; //.filter((item) => item.flag !== action.payload.flag);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].flag == action.payload.flag) {
          //this condition exists to avoid occurrences like BGP and '(or ARP and srcMAC)'
          if (
            temp[i - 1] &&
            temp[i - 1].flag.includes("(") &&
            temp[i + 1] &&
            !temp[i + 1].flag.includes(")")
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

    case "REPLACE":
      let stateCopy = state;
      let flag = 1;
      console.log("statecopy before : ", stateCopy);
      for (let i = 0; i < stateCopy.length; i++) {
        if (stateCopy[i].flag == action.payload.place) {
          flag = 0;
          stateCopy[i].flag = action.payload.replace;
        }
      }
      if (flag)
        console.log("couldn't find to replace with ", action.payload.replace);
      else
        console.log(
          "replaced ",
          action.payload.place,
          "with ",
          action.payload.replace
        );
      return [...stateCopy];
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
      console.log("before : ", state);
      if (
        state[action.payload.start - 1] &&
        state[action.payload.start - 1].type == "parantheses" &&
        state[action.payload.start - 1].flag.includes("(") &&
        state[action.payload.end - 1] &&
        state[action.payload.end - 1].type == "parantheses" &&
        state[action.payload.end - 1].flag.includes(")")
      ) {
        let temp = state.slice();
        console.log(
          "deleting brackets from : ",
          action.payload.start - 1,
          action.payload.end - 2
        );
        temp.splice(action.payload.start - 1, 1);
        temp.splice(action.payload.end - 2, 1);
        temp[action.payload.start - 1]["before"] = false;
        console.log("after : ", temp);
        return temp;
      } else {
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
        newDict = validGrouping(newDict);

        //this condition exists to avoid occurrences like '(..'(...)')'
        //having '' only for the outermost parantheses
        let children = [];
        let pairCount = 0;
        for (let i = 0; i < newDict.length; i++) {
          pairCount = 0;
          children = [];
          if (newDict[i].flag == "'(") {
            pairCount++;
            i++;
            while (pairCount && i < newDict.length) {
              if (newDict[i].flag == "'(") {
                pairCount++;
                children.push(i);
              } else if (newDict[i].flag == ")'") {
                pairCount--;
                children.push(i);
              }
              console.log("i at : ", i, "paircount at : ", pairCount);
              console.log(newDict[i].flag);
              i++;
            }
            console.log("all paranthesis indices : ", children);
            children = children.slice(0, -1);
            console.log("children : ", children);
            for (let j = 0; j < children.length; j++) {
              if (newDict[children[j]].flag == "'(")
                newDict[children[j]].flag = "(";
              if (newDict[children[j]].flag == ")'")
                newDict[children[j]].flag = ")";
            }
          }
        }
        return newDict;
      }

    default:
      return state;
  }
}
