/**
 * 
 * EXERCISE 1
 * 
 * @param {Promise} promise 
 * @param {function} asyncTransformer 
 */
function flatMapPromise(promise, asyncTransformer){
  return new Promise((resolve, reject) => {
    promise
      .then(result => resolve(asyncTransformer(result)))
      .catch(e => reject(e))
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise} firstPromise 
 * @param {function} slowAsyncProcess 
 */
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess){
  return firstPromise.then((result) => {
    // thinking about it...

    // ahhhhhh ok, I got it...
    // but I've needed look the "test" to understand what's happening
    return slowAsyncProcess(result);
  });
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById){
  return async function getUserByIdWithOrganization(userId){
    /* IMPLEMENT ME! */
    try {
      let user = await getUserById(userId);
      let organiz = await getOrganizationById(user.organizationId);
  
      user.organization = organiz;
      return user;
      
    } catch (error) {
      return undefined;  
    }
  };
}

module.exports = {
  flatMapPromise,
  chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization,
};