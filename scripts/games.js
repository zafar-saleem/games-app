(function (doc, $) {
	var Games = function () {
		var self = this, data;
		var $body = $('body');

		$(doc).on('loginSuccess', function (event, userData) {
			if (!sessionStorage.getItem('username')) {
				return;
			}

			self.showGamesList(userData);
			self.getListOfGames();
			self.getListOfCategories();
		});

		$('.filter').on('keyup', this.filterGamesViaSearchBox);
		$body.on('click', '.cat', this.filterGamesViaCategories);
		$body.on('click', '.play', this.playGame);
		$body.on('click', '.back', this.back);
	};

	Games.prototype = (function () {
		var gamesTemplate 	   = _.template($("script.gameTemplate").html());
		var categoriesTemplate = _.template($("script.categoriesTemplate").html());
		var $games  = $('.games');
		var $cats   = $('.cats');
		var $player = $('.player');
		var self;

		var showGamesList = function (userData) {
			$('.casino').show();
			$('.avatar').attr('src', userData.avatar);
			$('.player .name').html(userData.name);
			$('.player .description').html(userData.event);
		},

		getListOfGames = function () {
			$.ajax({
				url: '/games',
				success: function (games) {
					$games.html(gamesTemplate({ games: games, categories: games.categoryIds }));
				}
			});
		},

		getListOfCategories = function () {
			$.ajax({
				url: '/categories',
				success: function (cat) {
					$cats.html(categoriesTemplate({ cats: cat }));
				}
			});
		},

		filterGamesViaSearchBox = function () {
			var search = $(this).val().toLowerCase();

			if (search) {
				$('.details').hide();
				$('[data-name*="' + search + '"').show();
			} else {
				$('.details').show();
			}
		},

		filterGamesViaCategories = function () {
			$('.details').hide();

			if ($(this).hasClass('all')) {
				$('.all').show();
			} else if ($(this).hasClass('video')) {
				$('.video').show();
			} else {
				$('.slot').show();
			}
		},

		playGame = function () {
			$('.ingame').show();
			$('.casino').hide();
			comeon.game.launch($(this).data('code'));
		},

		back = function () {
			$('.ingame').hide();
			$('.casino').show();
		};

		return {
			playGame 	  : playGame,
			back 	 	  : back,
			showGamesList : showGamesList,
			getListOfGames 		: getListOfGames,
			getListOfCategories : getListOfCategories,
			filterGamesViaSearchBox  : filterGamesViaSearchBox,
			filterGamesViaCategories : filterGamesViaCategories,
		};

	})();

	new Games();

})(document, jQuery);
