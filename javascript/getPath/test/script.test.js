const getPath = require('../script')
test("finding a unique css selector for an element in the document", () => {
  //set up our document body
  document.body.innerHTML = `
    <h1>Hello</h1>
    <div>
        <h2>test</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic enim saepe doloremque maxime? Magnam aliquid
            ex, ea excepturi qui necessitatibus voluptatibus vel, libero atque optio voluptas labore, maiores animi
            vitae.</p>
        <p>Lorem ipsum dolor</p>
        <div>
            <h3>test</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora culpa, eligendi, ipsam numquam quia ex labore blanditiis et expedita voluptates corrupti, delectus vitae iusto eum dolorum ratione ullam hic atque?</p>
        </div>
    </div>
    `;


  const path = document.body.children[1].children[2];

  const result = getPath(path);
  expect(result).toBe('body > div > p:nth-child(3)');
});

test("the getPath result does not return more than one per queryselectorall()", () => {
  document.body.innerHTML = `
    <h1>Hello</h1>
    <div>
        <h2>test</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic enim saepe doloremque maxime? Magnam aliquid
            ex, ea excepturi qui necessitatibus voluptatibus vel, libero atque optio voluptas labore, maiores animi
            vitae.</p>
        <p>Lorem ipsum dolor</p>
        <div>
            <h3>test</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora culpa, eligendi, ipsam numquam quia ex labore blanditiis et expedita voluptates corrupti, delectus vitae iusto eum dolorum ratione ullam hic atque?</p>
        </div>
    </div>
    `;

  const path = document.body.children[1].children[2];

  const result = getPath(path);
  const arr = document.querySelectorAll(result)
  expect(arr.length).toBe(1)
});