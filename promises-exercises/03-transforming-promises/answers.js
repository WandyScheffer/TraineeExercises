/**
 * 
 * EXERCISE 1
 * 
 * @param {*} promise 
 * @param {*} transformer 
 * @returns {Promise}
 */
function mapPromise(promise, transformer){
  return new Promise((resolve, reject) => {
    /* IMPLEMENT ME!! */
    promise.then(result => {
      try {
        resolve(transformer(result))
      } catch (error) {
        reject(error)
      }
    })
    .catch((e) => reject(e))
  })
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromise(numberPromise){
  return numberPromise
    .then(result => {
      // uma opção melhor seria assim...
      // const number = Number(result)
      // if (Number.isNaN(number)) {
      //   return Promise.reject(`Cannot convert '${result}' to a number!`);
      // } else {
      //   return Math.pow(number, 2);
      // }

      if (typeof(result)=="number") {
        return Math.pow(result, 2);
      }else if(!Number.isNaN(parseInt(result))){
        Number.is
        return Math.pow(parseInt(result), 2);
      }else{
        return Promise.reject(`Cannot convert '${result}' to a number!`);
      }
    })
}

/**
 * EXERCISE 3
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromiseOrZero(promise){
  return squarePromise(promise)
    .catch(() => 0);
}

/**
 * EXERCISE 4
 * 
 * @param {Promise} promise 
 * @returns {Promise}
 */
function switcheroo(promise){
  return new Promise((resolve, reject) => {
    promise.then((success)=>{
      reject(success);
    }, (failure)=>{
      resolve(failure);
    });
  })
}

/**
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */

module.exports = {
  mapPromise,
  squarePromise,
  squarePromiseOrZero,
  switcheroo,
};