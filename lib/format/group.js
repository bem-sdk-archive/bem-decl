'use strict';

const assert = require('assert');

// function splitByScopes(cells) {
//     const acc = [];

//     while (cells.length) {
//         const cell = cells.shift();
//         const group = traverseCell(cell, cells);

//         // acc.push(group.map(item => item.id || item.map(item2 => item2.id)));
//         acc.push(group);
//     }

//     return acc;
// }

// function bbelongsTo(entityName) {
//     return entityName && entityName.id !== this.id && this.id.startsWith(entityName.id) &&
//         (entityName.type !== 'block' || this.type !== 'elemMod') &&
//         (!entityName.elem || this.elem === entityName.elem) &&
//         (!entityName.modName || this.modName === entityName.modName) &&
//         (!entityName.modVal || entityName.modVal === true || this.modVal === entityName.modVal);
// }
//
// function traverseDecl(decl = []) {
//     if (!decl.length) {
//         return [];
//     }

//     // transform decl to BemCell
//     const cells = decl.map(
//         dep => new BemCell(
//             {
//                 entity: new BemEntityName(dep.entity),
//                 tech: dep.tech
//             }
//         )
//     );
//     const scopes = splitByScopes(cells);

//     return scopes;
// }

/**
 * Formats normalized declaration to v2
 *
 * @param  {Array} decl Source declaration
 * @return {Array}
 */
// module.exports = function (decl = []) {
//     return traverseDecl(decl);
// };

// function isEqual(originalCell, newCell) {
//     if (originalCell.tech !== newCell.tech) {
//         return false;
//     }

//     if (!originalCell.entity.isEqual(newCell.entity)) {
//         return false;
//     }

//     return true;
// }

// function isModEqual(childCell, parentCell) {
//     const child = childCell;
//     const parent = parentCell;

//     if (child.tech !== parent.tech) {
//         return false;
//     }

//     if (!child.mod || !child.mod.name || !parent.mod || !parent.mod.name) {
//         return false;
//     }

//     if (!child.block || !parent.block || !child.elem || !parent.elem) {
//         return false;
//     }

//     if (child.block === parent.block && child.elem === parent.elem &&
//         child.mod.name === parent.mod.name) {
//         return true;
//     }

//     return false;
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
