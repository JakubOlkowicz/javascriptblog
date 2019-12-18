'use strict';

document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
});
{   const titleClickHandler = function(event){
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
    }

    {const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks (){
        console.log(generateTitleLinks);
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* for each article */

        let html = '';

        const articles = document.querySelectorAll(optArticleSelector);
        for(let article of articles){
            /* get the article id */
            const articleId = article.getAttribute('id');
            
            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* get the title from the title element */
            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            
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
    }
}
