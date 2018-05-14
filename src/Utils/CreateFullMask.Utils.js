/**
 * Created by Xiaotao.Nie on 20/05/2017.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */


export const createDivMask = function (innerHTML) {

    let ArticleContentDiv = document.createElement("div");
    ArticleContentDiv.style.height = document.documentElement.clientHeight + "px";
    ArticleContentDiv.style.width = document.documentElement.clientWidth + "px";
    ArticleContentDiv.style.overflow = "scroll";
    ArticleContentDiv.style.backgroundColor = "#f3f4f7";
    ArticleContentDiv.style.position = "fixed";
    ArticleContentDiv.style.top = "0";
    ArticleContentDiv.style.zIndex = "101";
    ArticleContentDiv.classList.add("RichText");
    ArticleContentDiv.classList.add("PostIndex-content");
    ArticleContentDiv.classList.add("av-paddingSide");
    ArticleContentDiv.classList.add("av-card");
    ArticleContentDiv.innerHTML = innerHTML;

    document.body.append(ArticleContentDiv);
    return ArticleContentDiv;
};