//this is for the main go to cart button
$('button').on('click', function(){
	var utmURL = "https://prime.500px.com/cart?utm_campaign=CartAbandon&utm_content=160x600&utm_medium=REM&utm_source=BPCStest4"
    alert("UTM URL: " + utmURL);
    document.location.href=utmURL;
});

createCookie('cart', '%5B%7B%22photo_id%22%3A6315063%2C%22license%22%3A%22royalty_free%22%2C%22price%22%3A25000%7D%5D', 7);


$(document).ready(function(){

var cartCookie = unescape(readCookie('cart'));
	console.log(cartCookie);
	//https://prime.500px.com/photos/6315063/
	addItemToCartList(2343, 400.00);

	addItemToCartList(1041, 250.00);

});

function addItemToCartList(photoID,photoPrice)
{
	$('#cart-contents ul').append("<li><span class='photo-name'>Photo: " + photoID +  "</span><span class='photo-price'>$" + photoPrice + "</li>")
}


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
