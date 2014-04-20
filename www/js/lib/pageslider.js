function PageSlider(container) {

    var container = container,
        currentPage;

    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(view, from) {

        if(from == 'right' && cache.currentView != '') {
            cache.lastView.push(cache.currentView);
        }

        var page = view.render().el;
        container.append(page);
        cache.currentView = $(page).attr('id');

        if (!currentPage || !from) {
            if($.isFunction(view.renderCallback)) {
                view.renderCallback();
            }
            page.attr("class", "page center");
            currentPage = page;
        }
        else {
            // Position the page at the starting position of the animation
            page.attr("class", "page " + from);

            currentPage.on('webkitTransitionEnd', function(e) {
                $(e.target).remove();
            });

            // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
            container[0].offsetWidth;

            // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
            page.attr("class", "page transition center");

            var to;

            switch(from){
                case "left":
                    to = "right";
                    break;
                case "up":
                    to = "down";
                    break;
                case "down":
                    to = "up";
                    break;
                case "right":
                default:
                    to = "left";
            }

            if($.isFunction(view.renderCallback)) {
                view.renderCallback();
            }
            currentPage.attr("class", "page transition " + to);
            currentPage = page;
        }
    }

}