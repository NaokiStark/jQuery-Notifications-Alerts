/*

jQuery Notifications Alerts

Puika Software

*/

(function(a){
    var qe = [];
  var queued= false;
   var hideMe=function(Element, defaulta){
   
   setTimeout(function(){
    if(Element.hasClass('hover')){
      Element.addClass('pend');
      Element.removeClass('hover');
      return;
    }
    $(Element).animate({ opacity: 0.01 },defaulta.fadeOut, function(){
    $(Element).slideUp(200, function(){
    $(Element).remove();
    defaulta.afterHide();
    queued = qe.shift();
    if (queued) {
       $.NotifyBox(queued);
    }
    });
   });
   }, defaulta.duration);};
$.NotifyBox= function(params){
    var defaulta ={
      message:"Your text goes here.",
      img:"",
      fadeOut:400,
      fadeIn:400,
      duration:5000,
      pos:"right bottom",
      maxnot:5,
      queue:true,
      click: function(){},
      afterHide:function(){},
      afterShow:function(){}
    };
     this.extend(defaulta, params);
   
      var img="";
      if(defaulta.img !== ""){
        img= '<img class="notifyimg" src="'+ defaulta.img +'"/>'; 
      }
     var explodd = defaulta.pos.split(" ");
     var Container;
     if(document.getElementById('notifycontainer'+explodd[0] + explodd[1])){
       Container=document.getElementById('notifycontainer'+explodd[0] + explodd[1]);
     }
     else{
       Container= $('<div>',{'id':'notifycontainer' + explodd[0] + explodd[1],'class': "notypos " + defaulta.pos});
       $('body').append(Container);
     }
  // QUEUED
     if(!($(Container).children('.notifyalert').length >= defaulta.maxnot) || !(defaulta.queue)){
      var Element = $('<div>',{'class':'notifyalert ' + defaulta.pos});
      
      $(Element).prepend(img);
      $(Element).append("<div class=\"notifycontent\">" + defaulta.message + "</div>");
      if(explodd[1]=="top" || explodd[0]=="top"){
         $(Container).append(Element);
      }
      else{
         $(Container).prepend(Element);
      }
       
       $(Element).on('mouseenter', function(){
        $(Element).addClass('hover');
      });
      $(Element).on('mouseleave', function(){
        if($(Element).hasClass('pend')){
          hideMe(Element, defaulta);
       }
        $(Element).removeClass('hover');
      });
       $(Element).append("<div class=\"ntclose\" onclick=\"event.stopPropagation();var Element = $(this).parent('.notifyalert');$(Element).animate({ opacity: 0.01 },"+ defaulta.fadeOut +", function(){$(Element).slideUp(200, function(){$(Element).remove();});});\"></div>");
       $(Element).on('click',function(event){
         defaulta.click();
         event.stopPropagation();
       });
       
      if(defaulta.img === ""){
      $(Element).addClass('noimage');
      }
      $(Element).hide();
      
          $(Element).fadeIn(defaulta.fadeIn, function(){
            defaulta.afterShow();
            hideMe(Element, defaulta);          
        });
      }
      else{
        qe.push(defaulta);
      }
       
  };
  
  
})(jQuery);
