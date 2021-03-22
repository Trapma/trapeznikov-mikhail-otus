const MyTree = require('../main.js');

test('generation custom HTMLelement my-tree', () => {
  const DomTree = document.body;
  const object = {
    id: 1,
    items: [
      {
        id: 2,
        items: [{ id: 3 }],
      },
    ],
  };
  const tree = new MyTree();
  tree.data = object;
  DomTree.insertAdjacentElement('afterbegin', tree)
  expect(DomTree.firstChild.shadowRoot.innerHTML).toBe(
`
 <my-branch id="1">
 <my-branch id="2">
 <my-branch id="3"></my-branch></my-branch></my-branch>`);
});
