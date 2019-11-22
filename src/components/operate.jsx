import * as math from 'mathjs'
function add(...arg){return math.add(...arg)}
function multiply(...arg){return math.multiply(...arg)}
function dot(...arg){return math.dot(...arg)}
function inv(arg){return math.inv(arg)}
function det(mx){return math.det(mx)}
function subtract(...arg){return math.subtract(...arg)}
function transpose(...arg){return math.transpose(...arg)}
export {
    add,
    multiply,
    det,
    subtract,
    transpose,
    inv,
    dot
}