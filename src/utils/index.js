export const randomizeArray = (array) => {
    let ctr = array.length;
    let temp;
    let index;
  
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}