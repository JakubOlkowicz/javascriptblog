'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
});*/
    {const titleClickHandler = function(event){
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
    
    

    /* [DONE] remove class 'active' form all articles links */
    const activeLinks = document.querySelectorAll('.titles a.active');
        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    let href = clickedElement.getAttribute('href');
    console.log(href);
    /* find yhe correct article using the selector (value of  'href' atrribute) */
    const findArticle = document.querySelector(href);
    /* add class 'active' to the correct article */
    findArticle.classList.add('active');
    }
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
}
}
{
    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.title';

    function generateTitleLinks (){
        console.log(generateTitleLinks);
    /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        console.log(titleList);
        
        function clearMessages(){
            titleList.innerHTML = '';
    } clearMessages();
    /* for each article */

    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */
    
    }
    generateTitleLinks();
}
