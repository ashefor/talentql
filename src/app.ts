interface apiData {
    results: Array<TableData>;
}

interface TableData {
    paging?: { next: string, previous?: string },
    [key: number]: Array<TableRowItem>
}

interface TableRowItem {
    age: string;
    gender: string;
    id: string;
    row: string
}

const nextBtn = document.querySelector('[data-nextbtn]') as HTMLButtonElement;
const prevBtn = document.querySelector('[data-prevbtn]') as HTMLButtonElement;
const tbody = document.querySelector('[data-sink]')!;
const previewElement = document.querySelector('[data-pageview]');
let currentPage = 1;
let tableData: TableData = {};

const getTableData = async (page) => {
    let url = `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${page}`;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


const getTableHTML = (data: Array<TableRowItem>): string => {
    let html = '';
    data.forEach(element => {
        let htmlSegment = `<tr data-entryid="hg" class="user">
    <td>${element.row}</td>         
    <td>${element.gender}</td>
    <td>${element.age}</td>
                    </tr>`;

        html += htmlSegment;
    });
    return html;
}

const renderTableView = async (page) => {
    let html = '';
    if (tableData![page]) {
        html = getTableHTML(tableData[page])
    } else {
        const data: apiData = await getTableData(currentPage);
        tableData = data.results[0];
        console.log(tableData)
        html = getTableHTML(tableData[page])
    }
    tbody.innerHTML = html;
    nextBtn.disabled = !tableData.paging?.next;
    prevBtn.disabled = !tableData.paging?.previous;
    previewElement!.textContent = `Showing Page ${currentPage}`
}

nextBtn.addEventListener('click', () => {
    const tr = document.querySelector(`tbody > tr:nth-child(${1})`)
    console.log(tr)
    currentPage = currentPage += 1;
    renderTableView(currentPage)
})

prevBtn.addEventListener('click', () => {
    currentPage = currentPage -= 1;
    renderTableView(currentPage)
})

const startApp = async () => {
    renderTableView(currentPage);
};

document.addEventListener('DOMContentLoaded', startApp);