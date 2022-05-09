const elements = Object.values(require('../public/elements.json'));
const numericProps = ['n', 'am', 'd', 'b', 'm', 'mh', 'ea', 'ep'];
const data = {};

numericProps.forEach(x => {
    let values = elements.map(y => Array.isArray(y[x]) ? y[x].length : y[x]);
    data[x] = [Math.min(...values), Math.max(...values)];
});

console.log(data);