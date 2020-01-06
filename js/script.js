'use strict';
const templates = {
  allAuthorsData: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  allTagsData: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 4,
  optCloudClassPrefix = 'tag-size';

const titleClickHandler = function(event)
{
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /* [DONE] remove class 'active' form all articles links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  let href = clickedElement.getAttribute('href');
  console.log(href);
  /* [DONE] find yhe correct article using the selector (value of  'href' atrribute) */
  const findArticle = document.querySelector(href);
  /* [DONE] add class 'active' to the correct article */
  findArticle.classList.add('active');
};

function generateTitleLinks (customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
            
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            
    /* insert link into titleList */
    //titleList.insertAdjacentHTML('afterbegin', linkHTML);
    html = html + linkHTML;
            
  }
  titleList.innerHTML = html;
}
generateTitleLinks();
const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
function calculateTagsParams(allTags){
  const params = {max: 0, min: 999999,};
  for(let tag in allTags){
    console.log(tag + ' is used ' + allTags[tag] + ' times ');
    params.max = Math.max(allTags[tag], params.max);
    params.min = Math.min(allTags[tag], params.min);
  } 
  return params;
}
function calculateTagsClass(count, params) {
  const normalizedCount = count - params.min;
  const  normalizedMax = params.max - params.min;
  const  perecentage = normalizedCount / normalizedMax;
  const  classNumber = Math.floor( perecentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix+classNumber;
}   
function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
 
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
 
    for (let tag of articleTagsArray) {
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>  ';
      html = html + linkHTML;
      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
    }
    tagWrapper.innerHTML = html;
    console.log(html);
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = {tags: []};
  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagsClass(allTags[tag], tagsParams)
    });
    //allTagsHTML  += '<li><a href="#tag-' + tag + ' " class="' + calculateTagsClass(allTags[tag], tagsParams) + '">' + tag + '</li>';
    //tag + ' (' + allTags[tag] + ') ';
  }
  tagList.innerHTML = templates.tagCloundLink(allTagsData);
  console.log(allTagsData);
}
generateTags();
function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  let activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTags = document.querySelectorAll('a[href^="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(const tag of allTags){
    /* add class active */
    tag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }   
}
addClickListenersToTags();


function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');
    let html = '';
    const linkHTMLData = {id: author, title: author};
    const linkHTML = templates.authorLink(linkHTMLData);
    //const linkHTML = '<p class="post-author"><a href="#author-' + author + '">by '+ author +'<a></p>';
    html = linkHTML + html;
    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    }
    else {
      allAuthors[author]++;'';
    }
    authorWrapper.innerHTML = html;
  }
  const authorList = document.querySelector('.authors');
  console.log(authorList);
  const allAuthorsData = {author: []};
  for (let author in allAuthors){
    allAuthorsData.author.push({
      author: author,
      count: allAuthors[author],
    });
    //allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '(' + allAuthors[author] + ')</li>';
  }
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  let activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }
  const allAuthors = document.querySelectorAll('a[href^="' + href + '"]');
  for(const author of allAuthors){
    author.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors(){
  const links = document.querySelectorAll('a[href^="#author-"]');
  for(let link of links){
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
