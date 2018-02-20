'use strict';

var routes = require('./routes'),
	friends = require('./friends');

(function(library) {

	library.init = function(params, callback) {
		require('./websockets');
		require('./hooks');
		routes.init(params, callback);
	};

	library.addAdminNavigation = function(header, callback) {
		header.plugins.push({
			route: '/plugins/connection-settings',
			icon: 'fa-tint',
			name: 'Connection Settings'
		});

		callback(null, header);
	}

	library.initWriteRoutes = routes.initWriteRoutes;

	library.listUids = friends.getFriendsUids;

}(module.exports));

