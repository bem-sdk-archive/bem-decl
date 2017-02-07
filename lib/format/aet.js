'use strict';

const BemCell = require('@bem/cell');
const BemEntityName = require('@bem/entity-name');

function belongsTo(child, entity) {
    console.log(child.id, entity.id);
    return entity /*&& child.id.startsWith(entity.id) */&&
        child.block === entity.block &&
        (!entity.elem || child.elem === entity.elem) &&
        (!entity.mod || !entity.mod.name || child.mod.name === entity.mod.name);
        // (!entity.mod || !entity.mod.val || entity.mod.val === true || child.mod.val === entity.mod.val);
}

function isEqual(originalCell, newCell) {
    if (originalCell.tech !== newCell.tech) {
        return false;
    }

    if (!originalCell.entity.isEqual(newCell.entity)) {
        return false;
    }

    return true;
}

function isModEqual(childCell, parentCell) {
    const child = childCell.entity;
    const parent = parentCell.entity;

    if (childCell.tech !== parentCell.tech) {
        return false;
    }

    if (!child.mod || !child.mod.name || !parent.mod || !parent.mod.name) {
        return false;
    }

    if (!child.block || !parent.block || !child.elem || !parent.elem) {
        return false;
    }

    if (child.block === parent.block && child.elem === parent.elem &&
        child.mod.name === parent.mod.name) {
        return true;
    }

    return false;
}

function getItem(entity, tech) {
    const item = { block: entity.block };

    item.includeBlock = Object.keys(entity).length === 1;

    tech && (item.tech = tech);
    entity.elem && (item.elems = [entity.elem]);
    entity.modName && (item.mods = { [entity.modName]: entity.modVal });

    return item;
}

function getState(entity, tech) {
    return {
        tech,
        block: entity.block,
        elem: entity.elem,
        mod: entity.modName,
        val: entity.modVal
    }
}

function splitByScopes(cells) {
    const acc = [];

    while (cells.length) {
        const cell = cells.shift();
        const group = traverseCell(cell, cells);

        // acc.push(group.map(item => item.id || item.map(item2 => item2.id)));
        acc.push(group);
    }

    return acc;
}

// function bbelongsTo(entityName) {
//     return entityName && entityName.id !== this.id && this.id.startsWith(entityName.id) &&
//         (entityName.type !== 'block' || this.type !== 'elemMod') &&
//         (!entityName.elem || this.elem === entityName.elem) &&
//         (!entityName.modName || this.modName === entityName.modName) &&
//         (!entityName.modVal || entityName.modVal === true || this.modVal === entityName.modVal);
// }
//

function traverseCell(cell, list) {
    let acc = [cell];

    while (list.length) {
        const nextCell = list[0];

        if (cell.tech === nextCell.tech) {
            if (isEqual(cell, nextCell) || isModEqual(cell, nextCell)) {
                acc.push(list.shift());
                continue;
            }

            if (nextCell.entity.belongsTo(cell.entity)) {
                // acc = [...acc, ...traverseCell(list.shift(), list)];

                const traversed = traverseCell(list.shift(), list);

                acc.push(traversed);
                continue;
            }
        }

        break;
    }

    return acc;
}

function traverseDecl(decl = []) {
    if (!decl.length) {
        return [];
    }

    // transform decl to BemCell
    const cells = decl.map(
        dep => new BemCell(
            {
                entity: new BemEntityName(dep.entity),
                tech: dep.tech
            }
        )
    );
    const scopes = splitByScopes(cells);

    return scopes;
}

/**
 * Formats normalized declaration to v2
 *
 * @param  {Array} decl Source declaration
 * @return {Array}
 */
module.exports = function (decl = []) {
    return traverseDecl(decl);
};
