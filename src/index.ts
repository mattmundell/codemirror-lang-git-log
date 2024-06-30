import * as Grammar from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, Tag, tags} from "@lezer/highlight"

let customTags, parser, props

customTags = { gitHash: Tag.define() }

props = [ indentNodeProp.add({ Rule: context => context.column(context.node.from) + context.unit }),
          foldNodeProp.add({ Rule: foldInside }),
          styleTags({ Commit: tags.meta,
                      Hash: [ tags.meta, customTags.gitHash ],
                      Header: tags.meta }) ]

parser = Grammar.parser.configure({ props: props })

export
const lr = LRLanguage.define({ name: 'git-log',
                               parser: parser,
                               languageData: {} })

export
function language
() {
  return new LanguageSupport(lr)
}

export { customTags }
