(sym) @local.reference

((cell head:(sym) @function) @local.scope
 (#any-of? @function "do" "export" "fn" "defn" "loop"))

((cell
  head:(sym) @function .
  (sym)+ @local.definition)
 (#eq? @function "import"))

((cell
  head:(sym) @function .
  (array (sym)+ @local.definition))
 (#eq? @function "fn"))

((cell
  head:(sym) @function .
  (sym) .
  (array (sym)+ @local.definition))
 (#eq? @function "defn"))

((cell
  head:(sym) @function .
  ((sym) @local.definition . (expression) .)+)
 (#eq? @function "def"))
