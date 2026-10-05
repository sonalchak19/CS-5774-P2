/* ===========================================================
   Simmer — additional user interactions (Project 3)

   Interaction 1: Save a recipe card         (click + event delegation)
   Interaction 2: Post a comment on a recipe (submit + DOM traversal
                                              + form validation)

   Each one follows the same chain:
     user event -> handler runs -> select other elements ->
     MODIFY an existing element + ADD a brand-new element
   =========================================================== */

$(document).ready(function () {

  /* ---------------------------------------------------------
     INTERACTION 1: Save / unsave a recipe card
     Event type: click
     Technique:  EVENT DELEGATION

     One click listener sits on the card container (the parent).
     It only reacts when the click started on a ".save-btn"
     inside it. Because the listener is on the parent, it also
     works for cards added later (like the search results,
     which search.js builds after the page loads).
     --------------------------------------------------------- */
  $(".recipe-grid, #search-results").on("click", ".save-btn", function () {

    var $button = $(this);

    // Select the card this button belongs to, and its body area
    var $card = $button.closest(".recipe-card");
    var $cardBody = $card.find(".recipe-card-body");

    var isSaved = $button.hasClass("is-saved");

    if (isSaved) {
      // Undo: put the button back and remove the note (user control)
      $button
        .removeClass("is-saved")
        .attr("aria-pressed", "false")
        .text("Save");
      $cardBody.find(".save-note").remove();
    } else {
      // MODIFY existing element: the clicked button
      $button
        .addClass("is-saved")
        .attr("aria-pressed", "true")
        .text("Saved \u2713");

      // ADD new element: a confirmation note inside this card only
      $("<p>")
        .addClass("save-note")
        .attr("role", "status")
        .text("Saved to your favorites")
        .appendTo($cardBody);
    }
  });


  /* ---------------------------------------------------------
     INTERACTION 2: Post a comment (with validation)
     Event type: submit
     Technique:  DOM TRAVERSAL (+ the one form validation)

     Starting from the form that was submitted, we move through
     the DOM with .find(), .closest() and .siblings() to reach
     the textarea, its wrapper, the comment list and the
     "Comments (n)" heading.
     --------------------------------------------------------- */
  $(".comment-form").on("submit", function (event) {

    // Stop the browser from reloading the page; we handle it here
    event.preventDefault();

    var $form = $(this);

    // Traversal: down from the form to the textarea, then up to its wrapper
    var $textarea = $form.find("textarea");
    var $field = $textarea.closest(".field");

    // Clear any error left over from a previous attempt
    $textarea.removeClass("input-error").removeAttr("aria-invalid aria-describedby");
    $field.find(".field-error").remove();

    var commentText = $textarea.val().trim();

    if (commentText === "") {
      // VALIDATION FAILED
      // MODIFY existing element: highlight the empty textarea
      $textarea
        .addClass("input-error")
        .attr("aria-invalid", "true")
        .attr("aria-describedby", "comment-error")
        .trigger("focus");

      // ADD new element: an error message under the textarea
      $("<p>")
        .addClass("field-error")
        .attr("id", "comment-error")
        .attr("role", "alert")
        .text("Please write a comment before posting.")
        .appendTo($field);
      return;
    }

    // VALIDATION PASSED
    // Traversal: sideways from the form to the list that sits beside it
    var $commentList = $form.siblings(".comment-list");

    // ADD new element: the new comment, using the same markup as the others
    var $newComment = $("<li>");
    $("<span>").addClass("comment-author").text("You:").appendTo($newComment);
    $newComment.append(document.createTextNode(commentText)); // text only, never HTML
    $newComment.appendTo($commentList);

    // MODIFY existing element: update the "Comments (n)" heading count
    $form.siblings("h3").text("Comments (" + $commentList.children().length + ")");

    // Reset the textarea so the user can write another comment
    $textarea.val("");
  });

});
