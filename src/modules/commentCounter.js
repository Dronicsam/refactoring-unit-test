const apicom = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/NeJSPpMrADKWN3Hg0NY2/comments';

export default async function commentCounter(b) {
  const melsname = document.querySelector('.comment-pop'); // Мы будем мокировать этот элемент в тестах

  try {
    const response = await fetch(`${apicom}?item_id=item${b}`, {
      method: 'get',
    });
    const data = await response.json();

    // Добавляем проверку на undefined или пустой массив
    const count = Array.isArray(data) ? data.length : 0;

    const counternum = `<h2 class= 'comment-length'>Comments(${count})</h2>`;
    console.log(count);

    if (melsname) {
      melsname.insertAdjacentHTML('beforeend', counternum);
    }

    return count;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
}
