'use strict';

const prices = {
    '5_6': [6570, 7760, 8960, 10130, 11340],
    '6_7': [6780, 8010, 9250, 10490, 11720],
    '7_8': [7530, 8900, 10320, 11720, 13120]
};

const addOns = {
    bath: 400,
    training1: 560,
    training2: 200,
    dec: 470
};

const formatPrice = (price) => new Intl.NumberFormat().format(price) + '円';

const createPriceRows = (prices) => {
    const table = document.getElementById('price');
    const tbody = table.querySelector('tbody');

    Object.entries(prices).forEach(([range, priceList]) => {
        // Create header row for each range
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('td');
        headerCell.rowSpan = priceList.length + 1;
        headerCell.innerHTML = `${range.replace('_', '時間以上<br>')}時間未満`;
        headerRow.appendChild(headerCell);
        tbody.appendChild(headerRow);

        // Create price rows for each range
        priceList.forEach((price, index) => {
            const tr = document.createElement('tr');
            const tdLabel = document.createElement('td');
            tdLabel.textContent = `要介護${index + 1}`;
            tr.appendChild(tdLabel);

            const baseId = `price${range}_${index + 1}`;
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


// {
//   const tableData1 = [
//     { type: 'basic', colspan: 4, label: '基本報酬' },
//     { code: 'A6 1111', service: '通所型独自サービス１１', value: '1,798', unit: '１月' },
//     { code: 'A6 1121', service: '通所型独自サービス１２', value: '3,621', unit: '１月' },
//     { type: 'addition', colspan: 4, label: '加算一覧' },
//     { code: 'A6 6111', service: '通所型独自サービス処遇改善加算Ⅲ', value: '所定単位数の<br><span class="a2">80 / 1000</span>', unit: '１月' },
//     { code: 'A6 5612', service: '通所型独自送迎減算', value: '&minus;４７', unit: '片道' }
//   ];

//   const tableData2 = [
//     { type: 'basic', colspan: 4, label: '基本報酬' },
//     { code: '78 1441', service: '地域通所介護５１', value: '753', unit: '１回' },
//     { code: '78 1442', service: '地域通所介護５２', value: '890', unit: '１回' },
//     { code: '78 1443', service: '地域通所介護５３', value: '1,032', unit: '１回' },
//     { code: '78 1444', service: '地域通所介護５４', value: '1,172', unit: '１回' },
//     { code: '78 1445', service: '地域通所介護５５', value: '1,312', unit: '１回' },
//     { type: 'addition', colspan: 4, label: '加算一覧' },
//     { code: '78 5301', service: '地域通所介護入浴介助加算Ⅰ', value: '４０', unit: '１回' },
//     { code: '78 5051', service: '地域通所介護個別機能訓練加算Ⅰ１', value: '５６', unit: '１回' },
//     { code: '78 5052', service: '地域通所介護個別機能訓練加算Ⅱ', value: '２０', unit: '１月' },
//     { code: '78 6104', service: '地域通所介護処遇改善加算Ⅲ', value: '所定単位数の<br><span>80 / 1000</span>', unit: '１月' },
//     { code: '78 5612', service: '地域通所介護送迎減算', value: '&minus;４７', unit: '片道' }
//   ];

//   const createTable = (tableData, headingId) => {
//     // テーブル作成
//     const table = document.createElement('table');

//     // ヘッダー行を作成
//     const thead = document.createElement('thead');
//     const headerRow = document.createElement('tr');
//     const headers = ['サービスコード', '基本報酬・加算名', '単位数', '算定回数'];

//     headers.forEach(text => {
//       const th = document.createElement('th');
//       th.textContent = text;
//       headerRow.appendChild(th);
//     });

//     thead.appendChild(headerRow);
//     table.appendChild(thead);

//     // ボディ行を作成
//     const tbody = document.createElement('tbody');

//     tableData.forEach(rowData => {
//       const tr = document.createElement('tr');

//       if (rowData.type) {
//         const td = document.createElement('td');
//         td.colSpan = rowData.colspan;
//         td.className = rowData.type;
//         td.innerHTML = rowData.label;
//         tr.appendChild(td);
//       } else {
//         const td1 = document.createElement('td');
//         td1.innerHTML = rowData.code;
//         tr.appendChild(td1);

//         const td2 = document.createElement('td');
//         td2.innerHTML = rowData.service;
//         tr.appendChild(td2);

//         const td3 = document.createElement('td');
//         td3.innerHTML = rowData.value;
//         tr.appendChild(td3);

//         const td4 = document.createElement('td');
//         td4.innerHTML = rowData.unit;
//         tr.appendChild(td4);
//       }

//       tbody.appendChild(tr);
//     });

//     table.appendChild(tbody);

//     // 任意の場所にテーブルを追加
//     const heading = document.getElementById(headingId);
//     heading.insertAdjacentElement('afterend', table);
//   };

//   // テーブルを作成して追加
//   createTable(tableData1, 'support');  // 見出し1の下に追加
//   createTable(tableData2, 'remuneration');  // 見出し2の下に追加
// }