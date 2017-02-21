'use strict';

const assert = require('assert');

// 'use strict';

// module.exports = function (list, comparator, cb) {
//     const crumbs = [];

//     for (const cell of list) {
//         // TODO
//         while (crumbs[0] && !comparator(crumbs[0], cell)) {
//             crumbs.shift();
//         }
//     }
// }

// function lal() {

// }



function traverseCell(cell, list, isEqualLevel, isDeeperLevel) {
    // создаем уровень
    let acc = [cell];

    while (list.length) {
        const nextCell = list[0];
        if (cell.tech === nextCell.tech) {
            // текущий уровень
            if (isEqualLevel(cell, nextCell)) {
                acc.push(list.shift());
            }
            // углубление по дереву
            if (isDeeperLevel(cell, nextCell)) {
                acc.push(traverseCell(list.shift(), list, isEqualLevel, isDeeperLevel));
            }
        }

        break;
    }

    return acc;
}

/**
 * @param  {BemCell[]}  cells - array of bemCells
 * @param  {Function}  beauty - beautifier function for format
 * @param  {Function} isEqualLevel - condition function for defining equal level of entity
 * @param  {Function} isDeeperLevel - condition function for defining deeper level of entity
 * @return {Array}
 */
module.exports = function (cells, beauty, isEqualLevel, isDeeperLevel) {
    assert(typeof beauty === 'function', 'You must pass beautyfier function');
    assert(typeof isEqualLevel === 'function', 'You must pass isEqualLevel function');
    assert(typeof isDeeperLevel === 'function', 'You must pass isDeeperLevel function');

    if (!cells.length) {
        return [];
    }

    const groups = [];

    while (cells.length) {
        const cell = cells.shift();
        const group = traverseCell(cell, cells, isEqualLevel, isDeeperLevel);
        // acc.push(group.map(item => item.id || item.map(item2 => item2.id)));
        // groups.push(group);
        console.log('group', JSON.stringify(group, null, 4));
        groups.push(beauty(groups, cell, group));
    }

    return groups;
};
