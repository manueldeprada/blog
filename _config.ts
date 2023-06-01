import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";
import blog from "https://deno.land/x/lume_theme_simple_blog@v0.7.2/mod.ts";

import "npm:prismjs@1.29.0/components/prism-markdown.js";
import "npm:prismjs@1.29.0/components/prism-yaml.js";
import "npm:prismjs@1.29.0/components/prism-markup-templating.js";
import "npm:prismjs@1.29.0/components/prism-liquid.js";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import "npm:prismjs@1.29.0/components/prism-json.js";


const head_long_string = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/contrib/copy-tex.min.js" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.js" crossorigin="anonymous"></script>
<script>options = {delimiters: [
                  {left: "$$", right: "$$", display: true},
                  {left: "\\[", right: "\\]", display: true},
                  {left: "$", right: "$", display: false},
                  //{left: "\\(", right: "\\)", display: false}
              ]};
</script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/contrib/auto-render.min.js" crossorigin="anonymous" onload="renderMathInElement(document.body, options);">
</script>

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  await mermaid.run({
  querySelector: 'code.language-mermaid',
});
// select all pre tags with class language-mermaid
const mermaidNodes = document.querySelectorAll('code.language-mermaid');
//replace the nodes with the first child of the node and change the tag from code to div
mermaidNodes.forEach((node) => {
  let new_node = document.createElement('div');
  new_node.innerHTML = node.innerHTML;
  //center the graph
  new_node.style.display = 'flex';
  new_node.style.margin = '0 auto';
  new_node.style.maxWidth = '100%';
  new_node.style.overflow = 'auto';
  //new_node.style.width = 'fit-content';
  new_node.style.backgroundColor = 'white';
  new_node.style.borderRadius = '10px'; 
  new_node.style.justifyContent = 'center';
  node.parentNode.parentNode.replaceChild(new_node, node.parentNode);
});
</script>
`;


let site = lume({ location: new URL("https://manueldeprada.com/blog/") })
  .process([".html"], (page) => {
    if (!page.document) {
      return;
    }
    const header = page.document.head;
    const newHeader = header.innerHTML + head_long_string;
    page.document.head.innerHTML = newHeader;

  })
  .use(blog())
  .use(basePath());

  site.copy("assets");

export default site;
