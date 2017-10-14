/**
 * Created by 给力叔 on 2017/10/14/014.
 */
var fs = require("fs")
module
  .exports = class JsonHelper {
  static load(file) {
    return JSON.parse(fs.readFileSync(file));
  }

  static save(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
}
