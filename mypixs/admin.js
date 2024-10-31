     /*
      !!-----!! ----------------------------------------------------------
        ADDITIONAL MYPIXS WINDOW FUNCTIONS
      !!-----!! ----------------------------------------------------------
     */ 
     
     /* ----- */
     /* opens a basic mypixs window (for text/plugin) */
     function addMyPixs() {
      var body = document.getElementsByTagName("body")[0];
  
      if (!document.getElementById("imagefog")) {
       var fog = document.createElement("div");
       fog.setAttribute("id", "imagefog");
       body.appendChild(fog);
      }
  
      var holder = document.createElement("div");
      holder.setAttribute("id", "imageholder");
      holder.style.width = loadImageSize + 'px';
      holder.style.height = loadImageSize + 'px';
      holder.style.marginTop = '-' + loadImageMargin + 'px';
      holder.style.marginLeft = '-' + loadImageMargin + 'px';
      holder.style.backgroundImage = 'url(' + loadImageUrl + ')';
      body.appendChild(holder);   
      
      var holderBody = document.createElement("div");
      holderBody.setAttribute("id", "holderbody");
      holder.appendChild(holderBody);    
      
      window.setTimeout("animateHolderSize('550', '450', '', '');", 500);  
      
      insertHolderContent();
     }
     
     /* ----- */
     /* closes mypixs window */
     function closeMyPixsHolder() {
      var fog = document.getElementById("imagefog");
      var holder = document.getElementById("imageholder");
      var body = document.getElementsByTagName("body")[0];
      body.removeChild(fog);
      body.removeChild(holder);     
     }   
     
     /* ----- */
     /* inserts default value for a new mypixs window */
     function insertHolderContent() {
      var imageHolder = document.getElementById("imageholder");
      var imgs = imageHolder.getElementsByTagName("img");
      
      if (imgs.length > 0) {
                  
       createHolderContent("html");
       createHolderLinks();
       
      } else {
       window.setTimeout("insertHolderContent()", 20);
      }
     }
     
     /*
      !!-----!! ----------------------------------------------------------
        ADD/EDIT CONTENT FUNCTIONS
      !!-----!! ----------------------------------------------------------
     */     
     
     /* ----- */
     /* renews content in body of holder */
     function createHolderContent(type) {
     
      var holder = document.getElementById("holderbody");
      
      if (!document.getElementById("holdercontent")) {
       var content = document.createElement("div");
       content.setAttribute("id", "holdercontent");
      } else {
       var content = document.getElementById("holdercontent");
       content.innerHTML = '';
      }
      
      if (!document.getElementById("mypixs_loader")) {
       var loader = document.createElement("img");
       loader.setAttribute("src", mypixsAdminLoader);
       loader.setAttribute("id", "mypixs_loader");
       loader.setAttribute("alt", "loading");
       holder.appendChild(loader);
      }
      
      if (!document.getElementById("mypixs_stat_bar")) {
       var statbar = document.createElement("div");
       statbar.setAttribute("id", "mypixs_stat_bar");
      
       var statbar_status = document.createElement("div");
       statbar_status.setAttribute("id", "mypixs_stat_bar_status");
       statbar.appendChild(statbar_status);      
       
       holder.appendChild(statbar);
      }
      
      if (holder.getElementsByTagName("h1").length < 1) { 
       var h1 = document.createElement("h1");
       h1.innerHTML = 'MyPixs';
       holder.appendChild(h1);       
      }
      
      /* URLs */
      if (type == "html") {
       var infoP = document.createElement("p");
       infoP.innerHTML = 'Enter all the url\'s of your photos below.<br />(All url\'s have to start with "http://")';
       
       var textarea = document.createElement("textarea");
       textarea.className = 'mypixs_urls_textarea';
       textarea.setAttribute("id", "mypixs_htmltextarea");
       textarea.value = 'http://www.mydomain.com/myphoto.jpg';
       
       var submitP = document.createElement("p");
       submitP.className = 'mypixs_html_submit';
       var submitButton = document.createElement("input");
       submitButton.setAttribute("type", "submit");
       submitButton.setAttribute("value", "Insert photos");
       
       if (window.addEventListener) {
        submitButton.addEventListener("click", parseHTMLPhotos, false);
       } else if (window.attachEvent) {
        submitButton.attachEvent("onclick", parseHTMLPhotos);
       }
       
       submitP.appendChild(submitButton);
       
       content.appendChild(infoP);
       content.appendChild(textarea);
       content.appendChild(submitP);
      }
      
      /* Flickr */
      if (type == "flickr") {
       var urlP = document.createElement("p");
       urlP.setAttribute("id", "mypixs_url_p");
       urlP.innerHTML = 'Please enter your Flickr url :<br />';
       
       var urlField = document.createElement("input");
       urlField.setAttribute("type", "text");
       urlField.setAttribute("value", "http://flickr.com/YOUR_FOLDER/sets/");
       urlField.setAttribute("id", "mypixs_flickr_url");
       
       var urlFieldSubmit = document.createElement("input");
       urlFieldSubmit.setAttribute("type", "submit");
       urlFieldSubmit.setAttribute("value", "Submit");
       
       if (window.addEventListener) {
        urlFieldSubmit.addEventListener("click", updateFlickrSets, false);
       } else if (window.attachEvent) {
        urlFieldSubmit.attachEvent("onclick", updateFlickrSets);
       }
       
       urlP.appendChild(urlField);
       urlP.appendChild(document.createElement("br"));
       urlP.appendChild(urlFieldSubmit);
       
       content.appendChild(urlP);
      }
            
      holder.appendChild(content);
      
     }
     
     /* ----- */
     /* creates links & nav for holder */
     function createHolderLinks() {
      var holder = document.getElementById("holderbody");
     
      var nav = document.createElement("div");
      nav.setAttribute("id", "holdernav");
      holder.appendChild(nav);
      
      var navlist = document.createElement("ul");
      nav.appendChild(navlist);
      
      var urlLi = document.createElement("li");
      urlLi.className = 'urlli';
      var urlLiA = document.createElement("a");
      urlLiA.setAttribute("href", "javascript: openHolderContent('html');");
      urlLiA.innerHTML = 'URLs';
      urlLi.appendChild(urlLiA);
      navlist.appendChild(urlLi);
     
      var flickrLi = document.createElement("li");
      flickrLi.className = 'flickrli';
      var flickrLiA = document.createElement("a");
      flickrLiA.setAttribute("href", "javascript: openHolderContent('flickr');");
      flickrLiA.innerHTML = 'Flickr';
      flickrLi.appendChild(flickrLiA);
      navlist.appendChild(flickrLi);
     }
     
     /*
      !!-----!! ----------------------------------------------------------
        SWITCH-TAB FUNCTIONS
      !!-----!! ----------------------------------------------------------
     */      
     
     /* ----- */
     /* easy way to switch between nav-items */
     function openHolderContent(type) {
      fadeHolderContent(100, 0, "createHolderContent(\'" + type + "\'); fadeHolderContent(0, 100, \'\', 0);", 0);
     }
     
     /* ----- */
     /* make old content fade away, execute functions */
     /* put fadeHolderContent(0, 100, \'\', 0); in "execfunction" to fade back afterwards */
     function fadeHolderContent(start, stop, execfunction, counter) {
      
      var obj = document.getElementById("holdercontent");
      var mainAdd = 5;
      
      if (start > stop) {
       var totalAdd = start - stop;
      } else {
       var totalAdd = stop - start;
      }
      
      counter += 1;
      var maxCount = totalAdd / mainAdd;
      
      if (start > stop) {
       var newOpac = (maxCount - counter) * mainAdd;
      } else {
       var newOpac = counter * mainAdd;
      } 
      
      if (newOpac == 100) {
       var mozOpac = '1.0';
      } else if (newOpac < 10) {
       var mozOpac = '.0' + newOpac;
      } else {
       var mozOpac = '.' + newOpac;
      }
      
      obj.style.opacity = mozOpac;
      obj.style.filter = 'alpha(opacity=' + newOpac + ')';
      
      if (counter >= maxCount) {
       eval(execfunction);
      } else {
       window.setTimeout("fadeHolderContent(" + start + ", " + stop + ", \"" + execfunction + "\", " + counter + ")", 10);
      }
      
     }
     
     /*
      !!-----!! ----------------------------------------------------------
        URL-TEXTAREA FUNCTIONS
      !!-----!! ----------------------------------------------------------
     */     
     
     /* ----- */
     /* transform textarea with urls in array */
     function parseHTMLPhotos() {
      var textarea = document.getElementById("mypixs_htmltextarea");
      var links = textarea.value;
      var linksarray = links.split("http://");
      var newlinks = new Array();
      for (var i = 0; i < linksarray.length; i++) {
       var link = linksarray[i];
       if (link != "") {
        link = removeWhiteSpace(link);
        link = "http://" + link;
        newlinks[newlinks.length] = link;
       }
      }
      insertCodeFromArray(newlinks);
     }
     
     /*
      !!-----!! ----------------------------------------------------------
        FLICKR FUNCTIONS
      !!-----!! ----------------------------------------------------------
     */     
     
     /* ----- */
     /* updates list of FLICKR photosets */
     function updateFlickrSets() {
      var url = document.getElementById("mypixs_flickr_url").value;
      var holder = document.getElementById("holdercontent");
      
      defineXMLRequest();
      if (xmlrequest) {
       displayMpLoader();
       xmlrequest.open("GET", mypixsAdminDownloadPage + url);
       xmlrequest.onreadystatechange = function() {
        if (xmlrequest.readyState == 4) {
         var data = xmlrequest.responseText;
         var dataholder = document.createElement("div");
         dataholder.innerHTML = data;
         data = dataholder;
         
         var alldivs = data.getElementsByTagName("div");
         var setTitles = new Array("");
         var setLinks = new Array("");
         for (var i = 0; i < alldivs.length; i++) {
          var div = alldivs[i];   
          if (div.className.indexOf("Sets") != -1) {    
           var setas = div.getElementsByTagName("a");
           for (var a = 0; a < setas.length; a++) {
            var seta = setas[a];
            if (seta.className.indexOf("setLink") != -1) {
             setLinks[setLinks.length] = "http://flickr.com" + filterUrl(seta.href, "/photos");
            }
            if (seta.className.indexOf("Seta") != -1) {
             setTitles[setTitles.length] = seta.getAttribute("title");
            }
           } 
          }
         }  
          
         var allsets = document.getElementById("mypixs_flickr_allsets");
         if (allsets) {
          holder.removeChild(allsets);
         }    
         var nosetsfound = document.getElementById("mypixs_flickr_nofound");
         if (nosetsfound) {
          holder.removeChild(nosetsfound);
         }
         
         if (setTitles.length > 1) {
          
          var setP = document.createElement("p");
          setP.setAttribute("id", "mypixs_flickr_allsets")
          setP.innerHTML = 'Choose a photoset : ';
          
          var setSelect = document.createElement("select");
          setSelect.setAttribute("id", "mypixs_flickr_photosets");
          if (window.addEventListener) {
           setSelect.addEventListener("change", updateFlickrPhotos, false);
          } else if (window.attachEvent) {
           setSelect.attachEvent("onchange", updateFlickrPhotos);
          }
          
          var chooseOption = document.createElement("option");
          chooseOption.setAttribute("value", "");
          chooseOption.innerHTML = "-------------";
          setSelect.appendChild(chooseOption);          
          
          for (var i = 0; i < setTitles.length; i++) {
           var setTitle = setTitles[i];
           var setLink = setLinks[i];
           if (setTitle != "") {
            var newOption = document.createElement("option");
            newOption.setAttribute("value", setLink);
            newOption.innerHTML = setTitle;
            setSelect.appendChild(newOption);
           } 
          }
          
          setP.appendChild(setSelect);
          holder.appendChild(setP);
          
         } else {
          
          var noFoundP = document.createElement("p");
          noFoundP.setAttribute("id", "mypixs_flickr_nofound");
          noFoundP.innerHTML = 'No photosets found...';
          holder.appendChild(noFoundP);
         
         }
         
         hideMpLoader();
        }
       }
       xmlrequest.send(null);
      }
     }
     
     /* ----- */
     /* updates list of photos in FLICKR photoset */
     function updateFlickrPhotos() {
      var select = document.getElementById("mypixs_flickr_photosets");
      var selectValue = select.options[select.selectedIndex].value;
      var holder = document.getElementById("holdercontent");
      
      defineXMLRequest();
      if (xmlrequest) {
       displayMpLoader();
       
       xmlrequest.open("GET", mypixsAdminDownloadPage + selectValue);
       
       xmlrequest.onreadystatechange = function() {
        if (xmlrequest.readyState == 4) {
         if (document.getElementById("mypixs_flickr_photos")) {
          holder.removeChild(document.getElementById("mypixs_flickr_photos"));
         }
        
         var photoDiv = document.createElement("div");
         photoDiv.setAttribute("id", "mypixs_flickr_photos");
         var photoTable = document.createElement("table");
         photoDiv.appendChild(photoTable);
         holder.appendChild(photoDiv);
         
         var data = document.createElement("div");
         data.innerHTML = xmlrequest.responseText;        
                
         var alldivs = data.getElementsByTagName("div");
         for (i = 0; i < alldivs.length; i++) {
          var div = alldivs[i];
          if (div.getAttribute("id") == "setThumbs") {
           var setThumbs = div;
          }
         }
         
         var tdCounter = 3;
         var photos = setThumbs.getElementsByTagName("a");
         for (i = 0; i < photos.length; i++) {
          var photo = photos[i];
          var img = photo.getElementsByTagName("img")[0];
          var bigImgUrl = "http://flickr.com" + filterUrl(photo.href, "/photos");
          var thumbnailSrc = img.src;
          if (tdCounter == 3) {
           var tr = photoTable.insertRow(photoTable.getElementsByTagName("tr").length);
           tdCounter = 0;
          }
          var td = tr.insertCell(tr.getElementsByTagName("td").length);
          td.setAttribute("valign", "center");
          var thumb = document.createElement("img");
          thumb.setAttribute("src", thumbnailSrc);
          thumb.className = 'mypixs_flickr_selected';
          thumb.setAttribute("id", bigImgUrl);
          
          if (window.addEventListener) {
           thumb.addEventListener("click", changeMpFlickrPhotoStatus, false);
          } else if (window.attachEvent) {
           thumb.attachEvent("onclick", changeMpFlickrPhotoStatus);
          }
          
          td.appendChild(thumb);
          tdCounter += 1;
         }
         
         var allps = document.getElementsByTagName("p");
         for (a = 0; a < allps.length; a++) {
          if (allps[a].className.indexOf("mypixs_submit_flickr_p") != -1) {
           holder.removeChild(allps[a]);
          }
         }
         
         var insertP = document.createElement("p");
         insertP.className = 'mypixs_submit_flickr_p';
         var insertInput = document.createElement("input");
         insertInput.setAttribute("type", "submit");
         insertInput.setAttribute("value", "Insert photos");
         
         if (window.addEventListener) {
          insertInput.addEventListener("click", insertFlickrPhotos, false);
         } else if (window.attachEvent) {
          insertInput.attachEvent("onclick", insertFlickrPhotos);
         }
         
         insertP.appendChild(insertInput);
         holder.appendChild(insertP);
         
         hideMpLoader();
        }
       }
       
       xmlrequest.send(null);
      }
     }
     
     /* ----- */
     /* (de)selects a FLICKR photo from a photoset */
     function changeMpFlickrPhotoStatus() {
      if (window.addEventListener) {
       var element = this;
      } else if (window.attachEvent) {
       var element = event.srcElement;
      }
      
      if (element.className.indexOf("mypixs_flickr_selected") != -1) {
       element.className = element.className.replace("mypixs_flickr_selected", "");
      } else {
       element.className += ' mypixs_flickr_selected';
      }
     }
     
     /* ----- */
     /* called to insert an array of photos from FLICKR */
     function insertFlickrPhotos() {
      var photoDiv = document.getElementById("mypixs_flickr_photos");
      var allPhotos = photoDiv.getElementsByTagName("img");
      var urlArray = new Array("");
      for (i = 0; i < allPhotos.length; i++) {
       var tempPhoto = allPhotos[i];
       if (tempPhoto.className.indexOf("mypixs_flickr_selected") != -1) {
        var bigImgUrl = tempPhoto.getAttribute("id");
        urlArray[urlArray.length] = bigImgUrl;
       }
      }
      displayMpLoader();
      showMpStatusBar();
      getFlickrImgSrcs(urlArray, '');
     }
     
     /* ----- */
     /* part of insertFlickrPhotos() */
     function getFlickrImgSrcs(urlArray, srcArray) {     
      if (srcArray == "") {
       srcArray = new Array('');
      }
      var urlIndex = srcArray.length;
      var thisurl = urlArray[urlIndex];
      
      defineXMLRequest();
      if (xmlrequest) {
       xmlrequest.open("GET", mypixsAdminDownloadPage + thisurl);
       xmlrequest.onreadystatechange = function() {
        if (xmlrequest.readyState == 4) {
         var data = document.createElement("div");
         data.innerHTML = xmlrequest.responseText;
         
         var alldivs = data.getElementsByTagName("div");
         for (var i = 0; i < alldivs.length; i++) {
          var tempdiv = alldivs[i];
          if (tempdiv.className.indexOf("photoImgDiv") != -1) {
           var img = tempdiv.getElementsByTagName("img")[0];
           var imgSrc = img.src;
           srcArray[urlIndex] = imgSrc;
          }
         }
         
         var newStatus = ((urlIndex + 1)/urlArray.length) * 100;
         setMpStatusBarAt(newStatus);         
         
         if (urlIndex == urlArray.length - 1) {
          insertCodeFromArray(srcArray);    
         } else {
          getFlickrImgSrcs(urlArray, srcArray);
         }
        }
       }
       xmlrequest.send(null);
      }
     }
     
     /*
      !!-----!! ----------------------------------------------------------
        TOOLS & HELPFUL FUNCTIONS
      !!-----!! ----------------------------------------------------------
     */
     
     /* ----- */
     /* deletes everything in a string that is situated before the 'start'-string [mostly used to filter (Flickr) urls] */
     function filterUrl(url, start) { 
      var startNumber = 0;
      
      for (var i = 0; i < url.length; i++) {
       var tempString = '';
       for (var a = 0; a < start.length; a++) {
        tempString += url.charAt(i + a);
       }
       
       if (tempString == start) {
        startNumber = i;
       }
      }
      
      var newUrl = '';
      
      for (var i = startNumber; i < url.length; i++) {
       newUrl += url.charAt(i);
      }
      
      return newUrl;
     }
     
     /* ----- */
     /* inserts MyPixs-valid code from an array of urls of images */
     /* WORKS ONLY WITH WORDPRESS!! */
     function insertCodeFromArray(array) {
      var allCode = '';
      
      allCode += '<!-- start mypixs photoset -->';
      
      var date = new Date();
      var seconds = date.getSeconds();
      var minutes = date.getMinutes();
      var hour = date.getHours();
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getYear();
      
      var divId = 'mypixs_' + year + '_' + month + '_' + day + '_' + hour + '_' + minutes + '_' + seconds;
      allCode += '<!-- start div -->';
      allCode += '<div id="' + divId + '">';
      for (var i = 0; i < array.length; i++) {
       var data = array[i];
       if (data != "") {
        allCode += '<img src="' + data + '" />';
       } 
      }
      allCode += '<\/div>';
      allCode += '<!-- end div -->';
      allCode += '<script type="text/javascript"> createPhotoSet("' + divId + '"); <\/script>';
      
      allCode += '<!-- end mypixs photoset -->';
      
      /* edit the following lines to make plugin work with other versions or other blog platforms */
      editorTextArea = document.getElementById("content");
      edInsertContent(editorTextArea, allCode);
      /* end edit */
      
      closeMyPixsHolder();
     }   
     
     /* ----- */
     /* removes all spaces from a string */
     function removeWhiteSpace(string) {
      var newString = '';
      for (i = 0; i < string.length; i++) {
       if ((string.charAt(i) != " ") && (string.charAt(i) != "\n")) {
        newString += string.charAt(i);
       }
      }
      return newString;
     }    
     
     /* ----- */
     /* shows MyPixs load-icon (top right corner, mostly used for ajax stuff) */
     function displayMpLoader() {
      document.getElementById("mypixs_loader").style.display = 'block';
     }    
     
     /* ----- */
     /* hides MyPixs load-icon */
     function hideMpLoader() {
      document.getElementById("mypixs_loader").style.display = 'none';
     }   
     
     /* ----- */
     /* make XMLHttpRequest work in IE */
     function defineXMLRequest() {
      if (window.XMLHttpRequest) {
       xmlrequest = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
       xmlrequest = new ActiveXObject("Microsoft.XMLHTTP");
      }
     }  
     
     /* ----- */
     /* shows MyPixs status bar (mostly used in big and/or slow ajax scripts) */
     function showMpStatusBar() {
      document.getElementById("mypixs_stat_bar").style.display = 'block';
     }
     
     /* ----- */
     /* hides MyPixs status bar */
     function hideMpStatusBar() {
      document.getElementById("mypixs_stat_bar").style.display = 'none';
      document.getElementById("mypixs_stat_bar").style.width = '2px';
     }
     
     /* ----- */
     /* sets MyPixs status bar at a specific status */
     function setMpStatusBarAt(percent) {
      if (percent.indexOf) {
       if (percent.indexOf("%") == -1) {
        var type = '%';
       } else {
       var type = '';
       }
      } else {
       var type = '%';
      }
      document.getElementById("mypixs_stat_bar_status").style.width = percent + type;
     }