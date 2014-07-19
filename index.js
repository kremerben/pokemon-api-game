$(document).ready(function() {

var MATCHGAMECARDS = 6;



var randPoke = function() {
    return Math.floor((Math.random() * 719) + 2);
};



// MATCH GAME
$('#matchGame').on('click', function() {
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


$(document).on('click', '.pokeChar', function() {
    $(this).removeClass('inactive');
    $(this).addClass('active');
//    if ($('.active').length > )


});



// SINGLE POKEMON
$('#pokeSingle').on('click', function() {
    $('.pokemon').empty();
    $('.pokemonTeam').empty();
    singlePokemon(randPoke());
});

// TEAM OF POKEMON WITH PAUSE
$('#pokeTeam').on('click', function() {
    $('.pokemon').empty().removeClass('narrow');
    $('.pokemonTeam').empty();
        var teamNum = 6;
        var counter = 0;
        function pauseLoop() {
            if (counter++ < teamNum) {
                multiPokemon(1);
                setTimeout(pauseLoop, 200);
            }
        }
        pauseLoop();
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
            }
        });
    }


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
};

});
