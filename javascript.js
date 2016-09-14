$(document).ready(function () {
  var animals = ['Dog', 'Monkey', 'Zebra', 'Cow'];
  function renderButtons() {
    $('#animalButtons').empty();
    for (var i = 0; i < animals.length; i++) {
      var a = $('<button>'); 
      a.addClass('animal'); 
      a.addClass('button');
      a.attr('data-name', animals[i]); 
      a.attr('src', $(this).data('animate'));
      a.attr('data-state'), $(this).attr('data-state', 'animate');
      a.text(animals[i]); 
      $('#animalButtons').append(a); 
    }
  }
  $('#addButton').on('click', function () {
    var animal = $('#gif-input').val().trim();
    animals.push(animal);
    renderButtons();
    return false;
  });

  renderButtons();

  $(document).on('click', '.animal', function () {
    var animal = $(this).data('name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .done(function (response) {
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        $('#gifView').empty();
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $('<div>');
          var p = $('<p>').text("Rating: " + results[i].rating);
          var animalImage = $('<img>');
          animalImage.attr('src', results[i].images.fixed_height.url);
          animalDiv.prepend(p);
          animalDiv.prepend(animalImage);
          $('#gifView').prepend(animalDiv);
        }
        $(document).on('click', '.animal', function () {
          var state = $(this).attr('data-state');
          if (state == 'animate') {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
          } else {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
          }
        });
      });
  });
});