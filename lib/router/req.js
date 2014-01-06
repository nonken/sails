/**
 * Build generic Sails request object (i.e. `req`).
 * 
 * This generic implementation of `req` forms the basis for
 * Sails' transport-agnostic support of Connect/Express
 * middleware.  Used by hooks (i.e. sockets) but also for 
 * tests-- both at the app-level and in Sails core.
 * 
 * @return {[type]} [description]
 */
module.exports = (function mock_req (){


	//
	// Express methods/properties
	// 

	// Dependencies
	var req		= require('express/lib/request'),
		express = require('express');

	
	// Create a stub express 'app' object.
	// 
	// We need to pass it in as `req.app` for Express' 
	// default `req` implementation to work.
	req.app = express();


	// Reasonable defaults
	req.params = req.params || [],
	req.query = req.query || {},
	req.body = req.body || {},
	req.method = 'GET',
	req.url = 'http://pretend.com',
	req.headers = {
		host: 'pretend.com'
	};




	//
	// Sails extensions
	// 

	req.transport = 'mock';
	
	// TODO: get the request (from the `request` hook)


	// ==== TODO: Optimization ====
	// Cache this mocked request object
	// to avoid running this block of code more than once.
	return req;

})();





// ////////////////////////////////////////////////////////////////////////////////
// ///
// ///
// ///
// ///
// /**
//  * Test fixture to send requests to Sails.
//  *
//  * @api private
//  */

// function _req(req) {
// 	var _enhancedReq = util.defaults(req || {}, {
// 		params: {},
// 		url: '/',
// 		param: function(paramName) {
// 			return _enhancedReq.params[paramName];
// 		},
// 		wantsJSON: true,
// 		method: 'get'
// 	});

// 	return _enhancedReq;
// }


// /**
//  * Test fixture to receive responses from Sails.
//  *
//  * @api private
//  */

// function _res(res) {

// 	var _enhancedRes = util.defaults(res || {}, {
// 		send: function( /* ... */ ) {
// 			var args = _normalizeResArgs(Array.prototype.slice.call(arguments));

// 			_enhancedRes._cb(null, {
// 				body: args.other,
// 				headers: {},
// 				status: args.statusCode || 200
// 			});
// 		},
// 		json: function(body, statusCode) {

// 			// Tolerate bad JSON
// 			var json = util.stringify(body);
// 			if (!json) {
// 				var failedStringify = new Error(
// 					'Failed to stringify specified JSON response body :: ' + body
// 				);
// 				return _enhancedRes.send(failedStringify.stack, 500);
// 			}

// 			return _enhancedRes.send(json, statusCode);
// 		}
// 	});

// 	return _enhancedRes;
// }


// /**
//  * As long as one of them is a number (i.e. a status code),
//  * allows a 2-nary method to be called with flip-flopped arguments:
//  *		method( [statusCode|other], [statusCode|other] )
//  *
//  * This avoids confusing errors & provides Express 2.x backwards compat.
//  *
//  * E.g. usage in res.send():
//  *		var args		= normalizeResArgs.apply(this, arguments),
//  *			body		= args.other,
//  *			statusCode	= args.statusCode;
//  *
//  * @api private
//  */
// function _normalizeResArgs(args) {

// 	// Traditional usage:
// 	// `method( other [,statusCode] )`
// 	var isTraditionalUsage =
// 		'number' !== typeof args[0] &&
// 		(!args[1] || 'number' === typeof args[1]);

// 	if (isTraditionalUsage) {
// 		return {
// 			statusCode: args[1],
// 			other: args[0]
// 		};
// 	}

// 	// Explicit usage, i.e. Express 3:
// 	// `method( statusCode [,other] )`
// 	return {
// 		statusCode: args[0],
// 		other: args[1]
// 	};
// }