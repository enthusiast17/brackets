module.exports = function check(str, bracketsConfig) {
    const {def, cfg} = bracketsConfig.reduce((res, [a, b]) => {
        const def = {}, cfg = {}
        if (a === b) def[a] = 'the same'
        else def[a] = 'open', def[b] = 'close'
        cfg[a] = b, cfg[b] = a
        Object.assign(res.def, def), Object.assign(res.cfg, cfg)
        return res
    }, {def: {}, cfg: {}})
    const arr = [...str]
    const iter = (arr, acc) => {
        if (acc >= arr.length || arr.length == 0) return arr
        if (def[arr[acc]] !== 'close' && arr.length > acc + 1 && cfg[arr[acc]] === arr[acc + 1]) {
            arr.splice(acc, 2)
            acc = -1
        }
        return iter(arr, acc + 1)
    }
    return iter(arr, 0).length === 0
}
