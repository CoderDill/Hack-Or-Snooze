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
console.log(story)
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

  $allStoriesList.show();
}

async function submitStory(e) {
  e.preventDefault();

  const title = $("#title").val();
  const author = $("#author").val();
  const url = $("#url").val();

  let story = await storyList.addStory(currentUser, { title, author, url });
  const $story = generateStoryMarkup(story)
  
  $allStoriesList.prepend($story)
  $navSubmitStory.remove();
  
}

$navSubmitStory.on("submit", submitStory);

async function removeStory(e) {
  e.preventDefault();
  
  await storyList.removeStory(currentUser, function (story) {
    let storyId = story.storyId;
    storyId.remove();
  })
}

function putFavoritesOnPage() {
  $myFavsList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $myFavsList.append($story);
  }
  $myFavsList.show();
}