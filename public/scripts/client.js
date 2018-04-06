'use strict';

$(document).ready(function() {
	$(window).on('action:ajaxify.end', function(ev, data) {
		$('#users-container, .pending-friends').on('click', '.friend-button', addFriendFunctionality);
	});

	$(window).on('action:ajaxify.contentLoaded', function(ev, data) {
		if (data.tpl === 'account/profile') {
			var uid = $('[data-uid]').attr('data-uid');
			socket.emit('plugins.friends.areFriendsOrRequested', {uid: uid}, function(err, result) {
				if (err) console.log('>>> friend err', err);
				if ( (result.userRoles.roles && result.userRoles.roles.includes('vendor'))
					|| (result.toUserRoles.roles && result.toUserRoles.roles.includes('vendor'))
				) {
					$('.avatar-wrapper .btn-morph.fab').after('');
					return;
				} else if (!result.isFriends[0]){
					$('.avatar-wrapper .btn-morph.fab').after(' <button class="btn btn-warning btn-sm friend-button" data-uid="' + uid + '" data-type="friend">Add Friend</button>');
				} else {
					$('.avatar-wrapper .btn-morph.fab').after(' <button class="btn btn-link btn-sm friend-button" data-uid="' + uid + '" data-type="unfriend">Remove Friend</button>');
				}

				$('.friend-button').on('click', addFriendFunctionality);
			});
		}
	});

	function addFriendFunctionality() {
		var $this = $(this);
		friendCommand($this.attr('data-type'), $this.attr('data-uid'), $this);
	}

	function friendCommand(type, uid, btn) {
		socket.emit('plugins.friends.' + type, {
			uid: uid
		}, function (err) {
			if (err) {
				return app.alertError(err.message);
			}

			if (type === 'friend') {
				btn.attr('data-type', '').prop('disabled', true).html('Request Sent');
			} else if (type === 'unfriend') {
				btn.attr('data-type', 'friend')
					.addClass('btn-warning').removeClass('btn-link').html('Add Friend');
			} else if (type === 'accept') {
				ajaxify.go('user/' + app.user.userslug + '/friends');
			} else if (type === 'reject') {
				btn.parents('.registered-user').remove();
			}
		});
		return false;
	}
})