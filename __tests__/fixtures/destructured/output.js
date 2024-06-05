import isEmpty from "lodash/isEmpty.js";
import chunk from "lodash/chunk.js";
import last from "lodash/last.js";
const empty = {};
const notEmpty = {
  a: 1
};
isEmpty(obj);
isEmpty(notEmpty);
chunk(["a", "b", "c", "d"], 2);
last(["a", "b"]);
