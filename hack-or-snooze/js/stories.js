"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  console.log(story);
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span class="star">
        <i class="far fa-star"></i>
        </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <span class="removeStory">
        <i class="fas fa-trash"></i>
        </span>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  //***********Why empty the list and refill it every time
  //  as opposed to just adding the new story to the end?
  $allStoriesList.show();
}

async function submitStory(e) {
  e.preventDefault();

  const title = $("#title").val();
  const author = $("#author").val();
  const url = $("#url").val();

  let story = await storyList.addStory(currentUser, { title, author, url });
  const $story = generateStoryMarkup(story);

  $storiesLists.prepend($story);
  $allStoriesList.show();
  $submitStoryForm.hide();
}

$submitStoryForm.on("submit", submitStory);

async function removeStory(e) {
  e.preventDefault();

  let $li = $(e.target).closest("li");
  let storyId = $li.attr("id");
  await storyList.removeStory(currentUser, storyId);

  await putStoriesOnPage();
}

$body.on("click", ".removeStory", removeStory);

async function addFavoriteToMyFavs(e) {
  e.preventDefault();
  
  let $li = $(e.target).closest("li");
  
  let storyId = $li.attr("id");
  let $starHighlight = $li.find("span.star");
  $starHighlight.removeClass("far fa-star")
  $starHighlight.html('<i class="fas fa-star"</i>')
  console.log($starHighlight)
  
  let favorite = await currentUser.addFavorite(currentUser.username, storyId);

  $myFavsList.append(favorite)
}

$body.on("click", ".star", addFavoriteToMyFavs);

function putFavoritesOnPage() {
  $myFavsList.empty();

  if (currentUser.favorites.length === 0) {
    $myFavsList.append("<h4>No Favs!</h4>");
  }
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    
    $myFavsList.append($story);
  }
  $myFavsList.show();
}

function putMyStoriesOnPage() {
  $myStories.empty();

  if (currentUser.ownStories.length === 0) {
    $myStories.append("<h4>No Stories!</h4>");
  }
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);

    $myStories.append($story);
  }
  $myStories.show();
}
