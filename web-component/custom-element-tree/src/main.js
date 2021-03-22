class MyTree extends HTMLElement {
  open() {}

  render(obj) {
    this.attachShadow({
      mode: 'open',
    });

    function tree(obj) {
      let tree = obj;
      let text = '';

      function getTree(tree) {
        text += `\n <my-branch`;
        for (const i in tree) {
          if (Object.hasOwnProperty.call(tree, i)) {
            const branch = tree[i];
            if (Array.isArray(branch)) {
              for (const i of branch) {
                text += '>';
                getTree(i);
                text += '>';
                text += `</my-branch`;
              }
            } else {
              text += ` ${i} = '${branch}'`;
            }
          }
        }
        return text;
      }
      getTree(tree);
      return text;
    }
    return (this.shadowRoot.innerHTML = tree(obj));
  }
  connectedCallback() {
    if (!this.rendered) {
      if (this.data) {
        let objTree1 = this.data;
        this.render(objTree1);
        this.rendered = true;
      }
      this.open();
      this.rendered = true;
    }
  }
  static get observedAttributes() {
    // (3)
    return [
      'data'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // (4)
    this.render();
  }
}

customElements.define('my-tree', MyTree);

// const objTree = {
//   id: 1,
//   class: '1234',
//   items: [
//     {
//       id: 2,
//       items: [
//         {
//           id: 3,
//           items: [
//             {
//               id: 3,
//               class: '123',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       items: [
//         {
//           id: 3,
//           class: '123',
//         },
//       ],
//     },
//     {
//       id: 2,
//       items: [
//         {
//           id: 3,
//         },
//       ],
//     },
//   ],
// };

// const tree = new MyTree()
// tree.data = objTree
// document.querySelector('h1').insertAdjacentElement('afterend', tree);
module.exports = MyTree;

