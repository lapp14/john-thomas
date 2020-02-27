var Shows = (function() {
  var self = this;
  this.showsLoaded = false;
  this.showsLoading = false;

  this.getMonth = function(monthNumber) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNumber];
  }

  this.fetch = function(jsonUrl) {
    $.getJSON(jsonUrl, this.fetchComplete)
      .fail(self.fetchError);
    self.showsLoading = true;
  }
  
  this.loadShows = function(jsonUrl, showsHeader) {
    console.log('loadShows is called');
    this.showsHeader = showsHeader;

    if (this.showsLoading) {
      return;
    }

    console.log('Loading');
    self.fetch(jsonUrl);
  }

  this.fetchComplete = function(json) {
    // TODO: trim past shows out of json
    if ($(json).length < 1) {
      $('#official-shows').html('<div class="alert"><p>Management is trying to book us some shows</p><p>They haven\'t gotten back to us yet...</p></div>');  
      return;
    }

    var html = '';
    $.each(json, function(date, show) {
      var showDate = new Date(date);

      var showHtml = '<div class="show">';
      showHtml += '<div class="show-date"><span class="month">' 
                    + self.getMonth(showDate.getMonth()) + ' ' 
                    + (showDate.getDate() + 1) + '</span><br/>'
                    + showDate.getFullYear() + '</div>';
      showHtml += '<div class="show-info">';
      showHtml += '<span class="show-venue">' + show.venue + '</span>';
      
      showHtml += '<span class="show-title">' + (show.showTitle || '') + '</span>';

      if(show.doors && show.doors.trim() !== "") {
        showHtml += '<span class="show-time">Doors: ' + show.doors + '</span>';
      }

      showHtml += '<span class="show-price">' + show.price + '</span>';
      
      if(show.notes && show.notes.trim() !== "") {
        showHtml += '<span class="show-notes">' + show.notes + '</span>';
      }
      
      showHtml += "</div></div>";
      html += showHtml;
    })

    $('#official-shows').html(html);
  }

  this.fetchError = function(jqxhr, textStatus, error) {
    var err = textStatus + ', ' + error;
    console.log( 'Request Failed: ' + err );
    $('#official-shows').html(err);
  }

  return {
    loadShows: this.loadShows
  }
})();
