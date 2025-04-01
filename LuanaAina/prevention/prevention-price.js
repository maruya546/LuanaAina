'use strict';

const prices = {
  support1: 17980,
  support2: 36210,
};

const addOns = {
  dec: 470
};

const formatPrice = (price) => new Intl.NumberFormat().format(price) + '円';

const createPriceRows = (prices) => {
  const table = document.getElementById('price');
  const tbody = table.querySelector('tbody');

  // Create a single header row for the entire table
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('td');
  headerCell.rowSpan = Object.keys(prices).length; // Adjusted to span all rows
  headerCell.rowSpan = 4; // Span across two columns
  headerCell.innerHTML = '通所の場合<br>(月ごとの定額制)';
  headerRow.appendChild(headerCell);
  tbody.appendChild(headerRow);

  Object.entries(prices).forEach(([range, price], index) => {
    // Create price row for each range
    const tr = document.createElement('tr');

    if (index === 0) {
      // Append the first row to the header row
      headerRow.appendChild(tr);
    } else {
      tbody.appendChild(tr);
    }

    const tdLabel = document.createElement('td');
    tdLabel.textContent = `要支援${range === 'support1' ? '１' : '２'}(相当)`;
    tr.appendChild(tdLabel);

    const baseId = `price${range}`;
    const tdBase = document.createElement('td');
    tdBase.id = baseId;
    tdBase.textContent = formatPrice(price);
    tr.appendChild(tdBase);

    for (let i = 1; i <= 3; i++) {
      const td = document.createElement('td');
      td.id = `${baseId}.${i}`;
      td.textContent = formatPrice(price * i * 0.1);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });
};

createPriceRows(prices);



// Add-ons can be updated similarly if needed
const createTd = (id, price) => {
  const td = document.createElement('td');
  td.id = id;
  td.textContent = formatPrice(price);
  return td;
};

const updateAddOns = (addOns) => {
  Object.keys(addOns).forEach(key => {
    const price = addOns[key];
    const row = document.getElementById(`${key}_row`);

    // 既存の td 要素をリストに保存
    const first = Array.from(row.querySelectorAll('td:first-child'));
    const last = Array.from(row.querySelectorAll('td:last-child'));

    // 新しい td 要素を追加
    row.innerHTML = ''; // 既存の内容をクリア
    row.appendChild(createTd(key, price));
    for (let i = 1; i <= 3; i++) {
      row.appendChild(createTd(`${key}_${i}`, price * i * 0.1));
    }

    // 既存の td 要素を再度追加
    row.prepend(...first);
    row.append(...last);
  });
};

updateAddOns(addOns);



