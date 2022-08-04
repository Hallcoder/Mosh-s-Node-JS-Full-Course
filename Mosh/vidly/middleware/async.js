// module.exports = function asyncMiddleware(handler) {
//     return async (req, res, next) => {
//       try {
//         //execute code depending on the route
//         await handler(req, res);
//       } catch (ex) {
//         next(ex);
//       }
//     };
//   }