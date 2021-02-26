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
      if (typeof(result)=="number") {
        return Math.pow(result, 2);
      }else if(!Number.isNaN(parseInt(result))){
        return Math.pow(parseInt(result), 2);
      }else{
        //--------------
        // ahhhhhhhhh i don't know how I can do the promise reject if a result is not numeric... 
        // -------------
        throw new Error(Promise.reject(`Cannot convert ${result} to a number!`));
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
  // maybe I'll return a new promise
  // it'll resolve with the catch param promise
  // and reject with the then of param promise
  // return promise.then((success)=>{}, (failure)=>{});
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