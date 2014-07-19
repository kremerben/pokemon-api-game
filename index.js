$(document).ready(function() {



$('#matchGame').on('click', function() {
    $('.pokemon').empty();
    $('.pokemonTeam').empty();

    makePokemon(6);
//    clonePokemon();
    $(document).getElementById('box').clone().append(".pokemon");


});

//var clonePokemon = function() {
//    $(document).on('click', '#matchGame',  function() {
//                $('#box').clone().append(".pokemon");
//        });
//}


$('#pokeSingle').on('click', function() {
    $('.pokemon').empty();
    $('.pokemonTeam').empty();
    makePokemon(1);

});

$('#pokeTeam').on('click', function() {
    $('.pokemon').empty();
    $('.pokemonTeam').empty();
        var teamNum = 6;
        var counter = 0;
        function pauseLoop() {
            if (counter++ < teamNum) {
                makePokemon(1);
                setTimeout(pauseLoop, 200);
            }
        }
        pauseLoop();
});


var makePokemon = function(num) {
    for (var i = 0; i < num; i++ ) {
        var randPoke = Math.floor((Math.random() * 719) + 2);
        $.ajax({
            url: "http://pokeapi.co/api/v1/sprite/" + randPoke + '/',
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
                $(pokeDiv).addClass('pokeChar');
                $('.pokemon').append(pokeDiv);
//            $(pokeDiv).append('<a href="http://pokemondb.net/pokedex/'+ pokemon.name +'" target="_blank"><img src="' + pokemon.image + '" /></a>');
                $(pokeDiv).append('<img src="' + pokemon.image + '" />');
            }
        });
    }
};


});


$.ajax({
  type: "POST",
  url: 'http://challenge.outsidehacks.com/',
  success: function(data) {
      console.log(data);
  },
  dataType: 'jsonp'
});