//listen for the event

document.getElementById('form1').addEventListener('submit',saveBookMark);

function saveBookMark(e){
    //console.log('It Works');
    var siteName= document.getElementById('siteName').value;
    console.log(siteName);

    var siteURL= document.getElementById('siteURL').value;
    console.log(siteURL);

    var bookmark = {
        name: siteName,
        url: siteURL
    }
    console.log(bookmark)


    // save bookmarks in local storage

    if(localStorage.getItem('bookmarks')===null){

        var bookmarks = [];
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);
        //reset back
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }


}


//Fetch and display bookmarks

function fetchBookmarks(){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksresults');
  
    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;
      var index = i;
  
      bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h5>'+ name  + '<br>' +
                                    ' <a class="btn btn-secondary" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                    '</h5'+
                                    '</div>';
    }
  }

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
  
  function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}

function deleteBookmark(url){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks
    for(var i =0;i < bookmarks.length;i++){
      if(bookmarks[i].url == url){
        // Remove from array
        bookmarks.splice(i, 1);
      }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
    // Re-fetch bookmarks
    fetchBookmarks();
  }