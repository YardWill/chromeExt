const a = document.querySelectorAll('#soldList tbody tr');
const arr = [];
const compareUrl = (alt1) => {
    let flag = 1;
    arr.forEach((e) => {
        if (e.alt === alt1) {
            flag = 0;
            return flag;
        }
    });
};

a.forEach((e, i) => {
    if (i !== 0) {
        const alt = e.querySelector('td a').href;
        if (compareUrl(alt)) {
            const money = e.querySelectorAll('td')[12].querySelector('span').innerHTML;
            arr.push({ key: i, alt, money });
        }
    }
});
console.log(arr);
