(function ($) {
	var Logout = function () {
		$('.logout').on('click', this.logoutUser);
	};

	Logout.prototype = (function () {

		var logoutUser = function () {
			$.ajax({
				url: '/logout',
				type: 'POST',
				data: {
					username: sessionStorage.getItem('username') // window.loginCredentials.username
				},
				success: function () {
					$('.login').show();
					$('.casino').hide();
					sessionStorage.removeItem('username');
					sessionStorage.removeItem('password');

					localStorage.removeItem('user');
				}
			})
		};

		return {
			logoutUser: logoutUser
		}

	})();

	new Logout();

})(jQuery);
