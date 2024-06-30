import {lr} from "../dist/index.js"
import {fileTests} from "@lezer/generator/dist/test"

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from 'url';
let caseDir = path.dirname(fileURLToPath(import.meta.url))

for (let file of fs.readdirSync(caseDir)) {
  if (!/\.txt$/.test(file)) continue

  let name = /^[^\.]*/.exec(file)[0]
  describe(name, () => {
    let content
    content = fs.readFileSync(path.join(caseDir, file), "utf8")
    //console.log(content)
    for (let {name, run} of fileTests(content, file))
      it(name, () => run(lr.parser))
  })
}
