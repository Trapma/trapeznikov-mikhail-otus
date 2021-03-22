class MyTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }
  //если нет data создает пустой тэг
  renderEmptyTag() {}

  renderDomTree(obj) {
    let text = '';

    //генерация дерева
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

    return (this.shadowRoot.innerHTML = getTree(obj));
  }
  connectedCallback() {
    if (!this.rendered) {
        let obj = this.data;
        this.renderDomTree(obj);
        this.rendered = true;

    }
  }
  static get observedAttributes() {
    // следит за data
    return ['data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // рендерит дерево если 'data' изменилась
    this.renderDomTree();
  }
}

customElements.define('my-tree', MyTree);

const objTree = {
  id: 1,
  class: '1234',
  items: [
    {
      id: 2,
      items: [
        {
          id: 3,
          items: [
            {
              id: 3,
              class: '123',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      items: [
        {
          id: 3,
          class: '123',
        },
      ],
    },
    {
      id: 2,
      items: [
        {
          id: 3,
        },
      ],
    },
  ],
};
// создаем кастомный тэг
// const tree = new MyTree()
// добавляем объект
// tree.data = objTree
// добавляем на страницу
// document.querySelector('h1').insertAdjacentElement('afterend', tree);
module.exports = MyTree;
