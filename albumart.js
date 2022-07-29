

// Global Vars
var initialFlag = 1;

var modal = document.getElementById('myModal');
var albumArtURL;
var placeholderImg = "http://larics.rasip.fer.hr/wp-content/uploads/2016/04/default-placeholder.png"



// Execute upon page load
$(window).on('load', function() {
		value = 5
		value_rows = 3
		generateGrid();
		
});



(function() {
 var button = document.getElementById("btn")
 var button_dec = document.getElementById("btn_dec")
 var output = document.getElementById("output")
 var numCols = document.getElementById("numCols").value
 var numRows = document.getElementById("numRows").value
 var counter
 var counter_rows
 

 function init() {
 // Convert string to primitve number using parseInt()
  numCols = 5
  numRows = 3
  
 /**
 * Start counter by adding any number to start counting.
 * In this case the output starts from 0 so to immediately
 * invoke the button to increment the counter add 1 to start 
 * counting in natural number (counting numbers).
 */  counter = numCols
	 counter_rows = numRows 

	number_images = 15;
  function increment() {
    // Increment counter
	
	if (number_images >= 1 && number_images <= 60)
	{
    value_rows = ++counter_rows
	if (value_rows == 1 )
	{
		value = 1;
	}
	if (value_rows == 2 )
	{
		value = 3;
	}
	if (value_rows == 3 )
	{
		value = 5;
	}
	if (value_rows == 4 )
	{
		value = 6;
	}
	if (value_rows == 5 )
	{
		value = 8;
	}
	if (value_rows == 6 )
	{
		value = 10;
	}
	if (value_rows == 7 )
	{
		value = 11;
	}
	if (value_rows == 8 )
	{
		value = 12;
	}
	
	}
	number_images = value_rows * value;	
	
	generateGrid();
    output.innerText = value
	output.innerText = value_rows
   }
   
   function decrement() {
   
    // Increment counter
	if (number_images > 1 && number_images <= 100)
	{
	value_rows = --counter_rows
	if (value_rows == 1 )
	{
		value = 1;
	}
	if (value_rows == 2 )
	{
		value = 3;
	}
	if (value_rows == 3 )
	{
		value = 5;
	}
    if (value_rows == 4 )
	{
		value = 6;
	}
	if (value_rows == 5 )
	{
		value = 8;
	}
	if (value_rows == 6 )
	{
		value = 10;
	}
	if (value_rows == 7 )
	{
		value = 11;
	}
	if (value_rows == 8 )
	{
		value = 12;
	}
	}
	number_images = value_rows * value;
	generateGrid();
    output.innerText = value
	output.innerText = value_rows
   } 
   
  
   // Output the increment value for every click
	
    button.onclick = increment
	button_dec.onclick = decrement
 }

 window.onload = init
 
})()



/*****Main Functionality*****/
// Generate grid of img objects
window.generateGrid = function() {

    // Save current images if not initial site load
    if (!initialFlag) {
        var prevNumRows = document.getElementById("numRows").value;
        var prevNumCols = document.getElementById("numCols").value;
        var imageMatrix = new Array();
        var imageRow = new Array();
        var saveImage;
        for (var i = 0; i < prevNumRows; i++) {
            for (var j = 0; j < prevNumCols; j++) {
                saveImage = i.toString() + ',' + j.toString();
                try {
                    imageRow.push(document.getElementById(saveImage).src);
                    console.log(document.getElementById(saveImage).src);
                } catch (err) {
                    imageRow.push(placeholderImg);
                }
            }
            imageMatrix.push(imageRow);
            imageRow = [];
        }
    }

    // Background color
    var backcolor = document.getElementById("backcolor").value;
    backcolor = backcolor.toLowerCase();
    if (backcolor.charAt(0) != '#') {
        backcolor = "#" + backcolor;
    }
    backcolor = backcolor.toString();
    if (backcolor.length != 7) {
        alert("Invalid Hex Value for Background Color");
    }
    $('#albums').css('background-color', backcolor);
    $('#header').css('background-color', backcolor);

    // Grid row/cols

    numCols = value;
    numRows = value_rows;
	
	document.querySelector('input[id="numCols"]').value = value;
	document.querySelector('input[id="numRows"]').value = value_rows;
	

    // Image size
    var imgSize = document.getElementById("artsize").value;
    $('.albumarts').css('height', imgSize.toString() + 'px');
    $('.albumarts').css('width', imgSize.toString() + 'px');

    var id;
    document.getElementById("albums").innerHTML = ""; // Clear out existing albums

    var albumHTML = ""; // Init album html block

    // Generate HTML for album grid
    for (i = 0; i < numRows; i++) {
        albumHTML = albumHTML + '<div class="row"><div align="center" class="col-lg-12">' + '\n';
        for (j = 0; j < numCols; j++) {
            id = i.toString() + "," + j.toString();
            albumHTML = albumHTML + '<a id="a" data-target="#myModal" data-toggle="modal" onclick="setCurID(event)"><img ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" class="albumarts" width=' + imgSize + ' height=' + imgSize + '  src="http://larics.rasip.fer.hr/wp-content/uploads/2016/04/default-placeholder.png" id="' + id + '" alt="API -201"></a>';
        }
        albumHTML = albumHTML + "</div></div>" + '\n';
    }

    $("#albums").html(albumHTML); // Insert HTML

    // Image Margins (wait til document is ready)
    var marginSize = document.getElementById("marginSize").value;
    $(document).ready(function() {
        $('img').css('margin', marginSize + 'px');
    });

    // Reinsert previous images
    if (!initialFlag) {
        for (i = 0; i < numRows; i++) {
            imageRow = imageMatrix[i];
            for (j = 0; j < numCols; j++) {
                selectedImg = i.toString() + ',' + j.toString();
                try {
                    document.getElementById(selectedImg).src = imageRow[j];
                } catch (err) {defaultAlbums();}
            }
        }
    } else {
        defaultAlbums();
    }

    initialFlag = 0;
};



// CLOSE BUTTON HIDE SEARCH ALBUM

const btn = document.getElementById('cbtn');

btn.addEventListener('click', () => {
  const box = document.getElementsByClassName('modal')[0];
  // 👇️ hides element (still takes up space on page)
  box.style.visibility = 'hidden';

  // 👇️ removes element from DOM
  // box.style.display = 'none';
});






$('#myModal').on('shown.bs.modal', function(event) {
    $('#searchTerm').focus();
    //console.log(event.target.id);
});

$('#searchTerm').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        albumsearch();
        return false;
    }
});

$('.form-control').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        generateGrid();
        return false;
    }
});

var albumsearch = function() {
    var lastfm_apikey = "dc639df7a8d4027a6f8d66ba3f9eb0a2";
    $('#searchTerm').focus();
    var albumModal = document.getElementById('myModal');
    var searchterm = document.getElementById('searchTerm').value;
    console.log(searchterm);
    var albumHTML = ""; // Init album html block
    var aid;
    var k = 0;


    $.getJSON("https://ws.audioscrobbler.com/2.0?method=album.search&album=" + searchterm + "&api_key=" + lastfm_apikey + "&format=json&callback=?", function(json) {
        // Generate HTML for album grid
        for (var i = 0; i < 2; i++) {
            albumHTML = albumHTML + '<div class="row"><div align="center" class="col-lg-12">' + '\n';
            for (var j = 0; j < 5; j++) {
                try {
                    albumArtURL = json.results.albummatches.album[k].image[2]['#text'];
                } catch (err) {
                    albumArtURL = placeholderImg;
                }
				
                if (albumArtURL === "") {
                    albumArtURL = placeholderImg;
                }
                aid = "modal " + i.toString() + "," + j.toString();
                albumHTML = albumHTML + '<img hspace=5 vspace=5 width=100 height=100 src="' + albumArtURL + '" id="' + albumArtURL + '" onclick="chooseIMG(this)">';
                k++;
            }
            albumHTML = albumHTML + "</div></div>" + '\n';
        }
        $("#albumsFound").html(albumHTML); // Insert HTML
    });
};

var setCurID = function(event) {
    curID = event.target.id;
}

var chooseIMG = function(url) {
    document.getElementById(curID).src = url.id;
    document.getElementById("searchTerm").value = "";
    $('#myModal').modal('hide');

};

/*****Additional Features*****/

// Shuffle images around
var shuffle = function() {
    var img1, img2;
    var selectedImg1, selectedImg2;
    var i, j, ii, jj;
    var numCols = document.getElementById("numCols").value;
    var numRows = document.getElementById("numRows").value;

    for (var k = 0; k < 60; k++) {
        j = Math.round(Math.random() * (numCols - 1));
        i = Math.round(Math.random() * (numRows - 1));
        jj = Math.round(Math.random() * (numCols - 1));
        ii = Math.round(Math.random() * (numRows - 1));
        selectedImg1 = i.toString() + "," + j.toString();
        selectedImg2 = ii.toString() + "," + jj.toString();
        img1 = document.getElementById(selectedImg1).src;
        img2 = document.getElementById(selectedImg2).src;
        document.getElementById(selectedImg1).src = img2;
        document.getElementById(selectedImg2).src = img1;

    }
};

// Drag and Drop Functionality
var drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

var allowDrop = function(event) {
    event.preventDefault();
}

var drop = function(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var initialImg = document.getElementById(data).src;
    document.getElementById(data).src = ev.target.src;
    ev.target.src = initialImg;
}

var defaultAlbums = function() {
    var lastfm_apikey = "dc639df7a8d4027a6f8d66ba3f9eb0a2";
    var numCols = document.getElementById("numCols").value;
    var numRows = document.getElementById("numRows").value;
    var selectedImg;
    var k = 0;
    var randLetter = Math.floor(Math.random() * 26) + 97;
    var searchterm = String.fromCharCode(randLetter);
    var i;
    var j;
    var artSource;
    $.getJSON("https://ws.audioscrobbler.com/2.0?method=album.search&album=" + searchterm + "&api_key=" + lastfm_apikey + "&format=json&callback=?", function(json) {
        for (i = 0; i < numRows; i++) {
            for (j = 0; j < numCols; j++) {
                selectedImg = i.toString() + "," + j.toString();
                artSource = json.results.albummatches.album[k].image[2]['#text'];
                if (artSource === "") {
                    artSource = placeholderImg;
                }
                document.getElementById(selectedImg).src = artSource;
                k++
            }
        }
    });
}


/*
	var canvasArea = document.getElementById("albums");
	var t = canvasArea.getContext('2d');
	window.open('', document.getElementById('albums').toDataURL());
	*/
