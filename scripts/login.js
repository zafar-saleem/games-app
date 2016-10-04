(function ($) {
	var Login = function () {
		var self = this;

		this.isUserLoggedIn(true);

		$('form').submit(function (e) {
			self.isUserLoggedIn(false);
			e.preventDefault();
		});
	};

	Login.prototype = (function () {
		var username, password, user,
			loginCredentials = {}, isFirst = true;

		var isUserLoggedIn = function (isFirst) {
			if (sessionStorage.getItem('username')) {
				onSuccessfullLogin(JSON.parse(localStorage.getItem('user')));
				return;
			}

			if (!isFirst) {
				logUserIn();
			}
			
			return;
		},

		logUserIn = function () {
			username = $('.username').val();
			password = $('.password').val();

			loginCredentials['username'] = username;
			loginCredentials['password'] = password;

			$.ajax({
				url: '/login',
				type: 'POST',
				data: loginCredentials,
				success: function (userData) {
					if (userData.status === 'success') {
						sessionStorage.setItem('username', username);
						sessionStorage.setItem('password', password);

						localStorage.setItem('user', JSON.stringify(userData.player));

						onSuccessfullLogin(userData.player);
					} else {
						onLoginFailed(userData.error);
					}
				}
			});
		},

		onSuccessfullLogin = function (userData) {
			$('.login').hide();
			$('.error').hide();

			$.event.trigger('loginSuccess', userData);
		},

		onLoginFailed = function (error) {
			$('.error').html(error).show();
		};

		return {
			isUserLoggedIn: isUserLoggedIn
		}

	})();

	new Login();

})(jQuery);
