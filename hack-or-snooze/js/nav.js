"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  $submitStoryForm.hide();
  $storiesLists.hide();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $loginForm.hide();
  $signupForm.hide();
}

function navSubmitStory() {
  console.log("we have a click");
  $storiesLists.hide();
  hidePageComponents();
  $submitStoryForm.show();
}

$body.on("click", "#nav-submitStory", navSubmitStory);

function navMyFavorites() {
  console.log("Clicky clicky");

  $submitStoryForm.hide();
  $storiesLists.hide();
  hidePageComponents();
  putFavoritesOnPage();
  $myFavsList.show();
}

$body.on("click", "#nav-favorites", navMyFavorites);

function navMyStories() {
  console.log("Click click");
  $submitStoryForm.hide();
  $storiesLists.hide();
  hidePageComponents();
  putMyStoriesOnPage();
}

$body.on("click", "#nav-myStories", navMyStories);
