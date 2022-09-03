const defaultArray = (length) => {
    let arr = []
    for (let i = 0; i < 6; i++) {
        arr.push(Array.from({length: length}, () => ' '));
    }
    return arr;
}

export default defaultArray;