$(document).ready(function () {

    var data = { gallery: [
      { title: "She loved me, sometimes I also loved her", img: "http://frontendfreecode.com/codes/files/gallery-1.jpg", alt: "lorem" },
      { title: "I can write the saddest verses tonight", img: "http://frontendfreecode.com/codes/files/gallery-2.jpg", alt: "lorem" },
      { title: "My voice searched the wind to touch her ear", img: "http://frontendfreecode.com/codes/files/gallery-3.jpg", alt: "lorem" },
      { title: "My soul is not content with having lost it", img: "http://frontendfreecode.com/codes/files/gallery-4.jpg", alt: "lorem" },
      { title: "The night wind turns in the sky and sings", img: "http://frontendfreecode.com/codes/files/gallery-5.jpg", alt: "lorem" },
      { title: "The night is starry, and the blue stars shiver in the distance", img: "http://frontendfreecode.com/codes/files/gallery-6.jpg", alt: "lorem" },
      { title: "How not to have loved her great still eyes", img: "http://frontendfreecode.com/codes/files/gallery-7.jpg", alt: "lorem" },
      { title: "Of other. Will be from another. As before my kisses.", img: "http://frontendfreecode.com/codes/files/gallery-8.jpg", alt: "lorem" }] };
  
  
    var source = $('#template').html();
    var template = Handlebars.compile(source);
    $('#content').html(template(data));
  
});
  
$(window).load(function () {
    var $items = $('.item');
    $items.on({
      mousemove: function (e) {
        var $that = $(this);
        $that.find('.overflow > img').velocity({
          translateZ: 0,
          translateX: Math.floor(e.pageX - $that.offset().left - $that.width() / 2),
          translateY: Math.floor(e.pageY - $that.offset().top - $that.height() / 2),
          scale: '2' },
        {
          duration: 400,
          easing: 'linear',
          queue: false });
  
      },
      mouseleave: function () {
        $(this).find('.overflow > img').velocity({
          translateZ: 0,
          translateX: 0,
          translateY: 0,
          scale: '1' },
        {
          duration: 1000,
          easing: 'easeOutSine',
          queue: false });
  
    }});  
});