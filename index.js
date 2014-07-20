$(document).ready(function() {

var MATCHGAMECARDS = 4;
var score = 0;


// MATCH GAME SETUP
$('#matchGame').on('click', function() {
    score = 0;
    $('.pokemon').empty().addClass('narrow');
//    $('.pokemonTeam').empty();
    var matchArray = [];
    for (var i = 0; i < MATCHGAMECARDS; i++) {
        var num = randPoke();
        matchArray.push(num, num);
    }
    shuffle(matchArray);
    $.each(matchArray, function(index, num) {
        singlePokemon(num, 'inactive');
    });
});

// MATCH GAMEPLAY
var liveCards = [];
$(document).on('click', '.pokeChar', function() {
    score++;
    if (liveCards.length < 2 && $(this).hasClass('inactive')) {
        liveCards.push($(this));
        $(this).removeClass('inactive');
        $(this).addClass('active');
    }
    if (liveCards.length > 1 ) {
        if (liveCards[0].attr('id') === liveCards[1].attr('id')) {
            $(liveCards[0]).addClass('found');
            $(liveCards[1]).addClass('found');
        } else {
            removeWithPause(liveCards);
        }
        liveCards = [];
    }
    if ($('.found').length === MATCHGAMECARDS * 2) {
          $('#overlay').toggle('slow');
          $('#overlay span').html('<br><h1>Winner in ' + score + ' clicks!');
    }

});

// FLIP BACK OVER
var removeWithPause = function(cards) {
        var upTo = 2;
        var counter = 0;
        function pauseLoop() {
            if (counter++ < upTo) {
                if (counter === 2) {
                    $(cards[0]).removeClass('active').addClass('inactive');
                    $(cards[1]).removeClass('active').addClass('inactive');
                }
                setTimeout(pauseLoop, 1000);
            }
        }
        pauseLoop();
};

//OVERLAY CLEAR
$(document).on('click', '#overlay', function() {
    $('#overlay').toggle('slow');
});


// SINGLE POKEMON
$('#pokeSingle').on('click', function() {
    $('.pokemon').empty();
    singlePokemon(randPoke());
});



// TEAM OF POKEMON WITH PAUSE
var teamPokemon = [];
$('#pokeTeam').on('click', function() {
    teamPokemon = [];
    $('.pokemon').empty().removeClass('narrow');
        var teamNum = 6;
        var counter = 0;
        function pauseLoop() {
            if (counter++ < teamNum) {
                teamPokemon.push(multiPokemon(1));
                setTimeout(pauseLoop, 200);
            }
        }
        pauseLoop();
    console.log(teamPokemon.length);
//    if (teamPokemon.length === 6) {
        var playThisTeam = document.createElement('button');
        $(playThisTeam, this).text("Play the Match Game with this Team");
        $('.pokemon').append(playThisTeam);
//    }
});


// LOOPING POKEMON
var multiPokemon = function(num) {
    for (var i = 0; i < num; i++) {
        singlePokemon(randPoke(), "");
    }
};

//MAKING A POKEMON
var singlePokemon = function(pokemonNumber, addclass) {
        $.ajax({
            url: "http://pokeapi.co/api/v1/sprite/" + pokemonNumber + '/',
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
                pokemon = {};
                console.log(data);
                pokemon.name = data.pokemon.name;
                pokemon.id = data.id - 1;
                pokemon.image = 'http://pokeapi.co' + data.image;
                var pokeDiv = document.createElement("div");
                pokeDiv.id = pokemon.id;
                pokeDiv.innerHTML = '<h3>' + pokemon.name + ' - ' + pokemon.id + '</3>';
                $(pokeDiv).addClass('pokeChar').addClass(addclass);
                $('.pokemon').append(pokeDiv);
                $(pokeDiv).append('<img src="' + pokemon.image + '" />');
                return pokemon
            }
        });
    };


function shuffle(array) {
    var current = array.length, temp, rand;
    while (0 !== current) {
        rand = Math.floor(Math.random() * current);
        current -= 1;
        temp = array[current];
        array[current] = array[rand];
        array[rand] = temp;
    }
    return array;
}

var randPoke = function() {
    return Math.floor((Math.random() * 719) + 2);
};




});
