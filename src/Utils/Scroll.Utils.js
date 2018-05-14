/**
 * Created by Xiaotao.Nie on 2017/3/23.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

//通过函数节流的方式进行scroll的绑定
export const bindScroll = function (fn,context){

    function scrollHandle(e){
        fn.call(context,e);
        // window.removeEventListener("scroll",scrollHandle);
        // setTimeout(function(){
        //     window.addEventListener("scroll",scrollHandle);
        // },20);
    }

    window.addEventListener("scroll",scrollHandle);

    return scrollHandle;

};

//该设置remove

export const removeScroll = function (fn){

    window.removeEventListener("scroll",fn)

};

export const unBindScroll = function (that,fn,context){

    function scrollHandle(e){
        fn.call(context,e);
        that.removeEventListener("scroll",scrollHandle);
        setTimeout(function(){
            that.addEventListener("scroll",scrollHandle);
        },50);
    }

    that.addEventListener("scroll",scrollHandle);

    return scrollHandle;

};

//该设置remove

export const unRemoveScroll = function (that,fn){

    that.removeEventListener("scroll",fn)

};