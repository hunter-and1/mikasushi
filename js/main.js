+function ($) { "use strict"; 
	var MAIN = {
            doms: {
                $body : $('body'),
                $gallery_instgram : $('#wi-gallery .gallery')
            },
            vars : {
            	tokenInstgram : '1433144551.dc99cae.70cbfa0152ce46e0aeec544925e9bbf9',
            	//2102653546
            	userIdInstgram : 1433144551,
            	numPhotos : 7
            },
            init:function(){
            	console.log("start !");
            	MAIN.loadPhotosInstgram();
            },
            loadPhotosInstgram : function(){
				$.ajax({
					url: 'https://api.instagram.com/v1/users/' + MAIN.vars.userIdInstgram + '/media/recent',
					dataType: 'jsonp',
					type: 'GET',
					data: {access_token: MAIN.vars.tokenInstgram, count: MAIN.vars.numPhotos},
					success: function(data){

						for(var x in data.data)
							MAIN.doms.$gallery_instgram.append(MAIN.getPicHtml(data.data[x].link,data.data[x].images.low_resolution.url,data.data[x].likes.count,data.data[x].comments.count)); 

						if(MAIN.vars.numPhotos - data.data.length > 0){
							for (var i = 0; i < MAIN.vars.numPhotos - data.data.length; i++)
								MAIN.doms.$gallery_instgram.append(MAIN.getPicHtmlBlank());
						}
					},
					error: function(data){
						console.log(data); // send the error notifications to console
					}
				});
            },
            getPicHtmlBlank : function(){
            	return '<a class="wi-instgram-block"></a>';
            },
            getPicHtml :function(link,img,likes,comments){
            	return '<a class="wi-instgram-block" href="'+link+'" target="_blank" style="background: url(\''+img+'\') center center/cover">'+
                '<div class="wi-instgram-blank"></div>'+
                '<div class="wi-instgram-info">'+
                '<span class="wi-instgram-likes"><i class="material-icons">favorite</i> <span>'+likes+'</span></span>'+
                '<span class="wi-instgram-comments"><i class="material-icons">comment</i> <span>'+comments+'</span></span>'+
                '</div>'+
            	'</a>';
            }
        };

	$(function () {
		MAIN.init();
	});

}(jQuery);