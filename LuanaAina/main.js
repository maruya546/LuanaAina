'use strict';

// モーダル関連の処理
{
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');

  open.addEventListener('click', () => {
    window.scrollTo(0, 0);
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });

  close.addEventListener('click', () => {
    window.scrollTo(0, 0);
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click', () => {
    close.click();
  });

  const cross = document.getElementById('cross');
  cross.addEventListener('click', () => {
    close.click();
  });
}

// テーブル関連の処理
{
  const table = document.getElementById('vacant');

  // ヘッダー行を作成
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const days = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日"];

  // 曜日の列を作成
  days.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    th.classList.add('vacant-p');
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);

  // データの配列
  const data = [5, 5, 5, 5, 5];

  // テーブル本体の作成
  const tbody = document.createElement('tbody');

  // 1行目の作成
  const row1 = document.createElement('tr');
  data.forEach(value => {
    const cell = document.createElement('td');
    cell.textContent = value === 0 ? '✕' : '〇';
    row1.appendChild(cell);
  });
  tbody.appendChild(row1);

  // 2行目の作成
  const row2 = document.createElement('tr');
  data.forEach(value => {
    const cell = document.createElement('td');
    cell.textContent = `${value}人`;
    row2.appendChild(cell);
  });
  tbody.appendChild(row2);

  // テーブルにtbodyを追加
  table.appendChild(tbody);

  // テーブルを任意の要素に追加（例えば、body）
  document.body.appendChild
}

// スライドショー関連の処理
{
  const images = document.querySelectorAll('.scale img');
  const navContainer = document.querySelector('.nav-container');
  const ul = document.querySelector('.scale');
  const slides = ul.children;
  let currentIndex = 0;

  images.forEach((_, index) => {
    const button = document.createElement('button');
    button.addEventListener('click', () => {
      currentIndex = index;
      updateSlide();
    });
    navContainer.appendChild(button);
  });

  function updateSlide() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
    document.querySelectorAll('.nav-container button').forEach((button, index) => {
      button.style.backgroundColor = index === currentIndex ? '#000' : '#fff';
    });
  }


  function autoSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide();
  }

  setInterval(autoSlide, 3000);
  updateSlide();

}

// モーダルウィンドウ関連
{
  const tableData1 = [
    { type: 'basic', colspan: 4, label: '基本報酬' },
    { code: 'A6 1111', service: '通所型独自サービス１１', value: '1,798', unit: '１月' },
    { code: 'A6 1121', service: '通所型独自サービス１２', value: '3,621', unit: '１月' },
    { type: 'addition', colspan: 4, label: '加算一覧' },
    { code: 'A6 6111', service: '通所型独自サービス処遇改善加算Ⅲ', value: '所定単位数の<br><span class="a2">80 / 1000</span>', unit: '１月' },
    { code: 'A6 5612', service: '通所型独自送迎減算', value: '&minus;４７', unit: '片道' }
  ];

  const tableData2 = [
    { type: 'basic', colspan: 4, label: '基本報酬' },
    { code: '78 1441', service: '地域通所介護５１', value: '753', unit: '１回' },
    { code: '78 1442', service: '地域通所介護５２', value: '890', unit: '１回' },
    { code: '78 1443', service: '地域通所介護５３', value: '1,032', unit: '１回' },
    { code: '78 1444', service: '地域通所介護５４', value: '1,172', unit: '１回' },
    { code: '78 1445', service: '地域通所介護５５', value: '1,312', unit: '１回' },
    { type: 'addition', colspan: 4, label: '加算一覧' },
    { code: '78 5301', service: '地域通所介護入浴介助加算Ⅰ', value: '４０', unit: '１回' },
    { code: '78 5051', service: '地域通所介護個別機能訓練加算Ⅰ１', value: '５６', unit: '１回' },
    { code: '78 5052', service: '地域通所介護個別機能訓練加算Ⅱ', value: '２０', unit: '１月' },
    { code: '78 6104', service: '地域通所介護処遇改善加算Ⅲ', value: '所定単位数の<br><span>80 / 1000</span>', unit: '１月' },
    { code: '78 5612', service: '地域通所介護送迎減算', value: '&minus;４７', unit: '片道' }
  ];

  const createTable = (tableData, headingId) => {
    // テーブル作成
    const table = document.createElement('table');

    // ヘッダー行を作成
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['サービスコード', '基本報酬・加算名', '単位数', '算定回数'];

    headers.forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // ボディ行を作成
    const tbody = document.createElement('tbody');

    tableData.forEach(rowData => {
      const tr = document.createElement('tr');

      if (rowData.type) {
        const td = document.createElement('td');
        td.colSpan = rowData.colspan;
        td.className = rowData.type;
        td.innerHTML = rowData.label;
        tr.appendChild(td);
      } else {
        const td1 = document.createElement('td');
        td1.innerHTML = rowData.code;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerHTML = rowData.service;
        tr.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerHTML = rowData.value;
        tr.appendChild(td3);

        const td4 = document.createElement('td');
        td4.innerHTML = rowData.unit;
        tr.appendChild(td4);
      }

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    // 任意の場所にテーブルを追加
    const heading = document.getElementById(headingId);
    heading.insertAdjacentElement('afterend', table);
  };

  // テーブルを作成して追加
  createTable(tableData1, 'support');  // 見出し1の下に追加
  createTable(tableData2, 'remuneration');  // 見出し2の下に追加
}