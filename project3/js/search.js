/* ===========================================================
   Simmer — simulated search (Project 3)

   The header search form sends the phrase to search.html as
   ?q=<phrase>. This script reads that phrase and decides what
   to show. Nothing is actually searched: if the phrase matches
   the keyphrase below, simulated results appear; otherwise a
   friendly "no results" message appears.
   =========================================================== */

$(document).ready(function () {

  // Only run on the results page (the other pages just include this file)
  var $results = $("#search-results");
  if ($results.length === 0) {
    return;
  }

  var $summary = $("#search-summary");

  // Read the submitted phrase from the URL, e.g. search.html?q=pasta
  var params = new URLSearchParams(window.location.search);
  var phrase = (params.get("q") || "").trim().toLowerCase();

  // Builds one recipe card using the same markup as the rest of the site
  function buildRecipeCard(recipe) {
    var $card = $("<article>").addClass("recipe-card");

    $("<img>")
      .attr("src", recipe.image)
      .attr("alt", recipe.alt)
      .appendTo($card);

    var $body = $("<div>").addClass("recipe-card-body").appendTo($card);

    var $title = $("<h3>").appendTo($body);
    $("<a>").attr("href", "detail.html").text(recipe.title).appendTo($title);

    $("<p>").addClass("ingredients-preview").text(recipe.ingredients).appendTo($body);

    var $meta = $("<div>").addClass("recipe-meta").appendTo($body);
    $("<span>").addClass("tag").text(recipe.equipment).appendTo($meta);
    $("<span>").text(recipe.time).appendTo($meta);
    $("<span>").addClass("rating").text(recipe.rating).appendTo($meta);

    // View Recipe link and Save button, matching the cards on other pages
    var $actions = $("<div>").addClass("card-actions").appendTo($body);

    $("<a>")
      .addClass("btn btn-secondary")
      .attr("href", "detail.html")
      .text("View Recipe")
      .appendTo($actions);

    $("<button>")
      .addClass("btn btn-secondary save-btn")
      .attr("type", "button")
      .attr("aria-pressed", "false")
      .text("Save")
      .appendTo($actions);

    return $card;
  }

  // Decide what to display based on the phrase the user typed
  switch (phrase) {

    case "pasta":
      $summary.text('Showing results for "pasta"');
      $results.addClass("recipe-grid").append(
        buildRecipeCard({
          // Photo by Monica Lensink, from nourish and fete
          image: "images/pasta-dish.webp",
          alt: "A bowl of broccoli lemon pasta with garlic and lemon wedges",
          title: "Broccoli Lemon Pasta",
          ingredients: "Pasta, broccoli, lemon, garlic",
          equipment: "Microwave-only",
          time: "15 min",
          rating: "★★★★☆ 4.2"
        })
      );
      break;

    default:
      // .text() is used for the phrase so typed input is never treated as HTML
      $summary.text("");
      $("<div>")
        .addClass("search-message")
        .append($("<h2>").text("No recipes found"))
        .append(
          $("<p>").text(
            phrase === ""
              ? "You didn't type anything to search for. Try a recipe name like \"pasta\"."
              : 'We couldn\'t find any recipes matching "' + phrase + '". Try a different recipe name, like "pasta".'
          )
        )
        .append($("<a>").addClass("btn btn-secondary").attr("href", "list.html").text("Browse all recipes"))
        .appendTo($results);
      break;
  }
});
