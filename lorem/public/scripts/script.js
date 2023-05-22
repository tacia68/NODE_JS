document.querySelector('#generate').addEventListener('click', async () => {
    const num = document.querySelector('#num').value;
    const response = await fetch(`/paragraphs/${num}`);
    const text = await response.text();
    document.querySelector('#output').innerHTML = text;
  });

  document.querySelector('#clear').addEventListener('click', () => {
    document.querySelector('#output').innerHTML = '';
  });
  
  