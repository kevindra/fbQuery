dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Textarea");

dojo.addOnLoad(function() {
    // Create a button programmatically:
    var button = new dijit.form.Button({
        label: "Albums",
        onClick: function() {
          userAlbums($("#u").val());
        }
    },
    "loadAlbums");

    var button = new dijit.form.Button({
        label: "Photos",
        onClick: function() {
          userPhotos($("#u").val());
        }
    },
    "loadPhotos");


    var button = new dijit.form.Button({
        label: "All Friends",
        onClick: function() {
          userFriends($("#u").val());
        }
    },
    "loadFriends");
    
    var button = new dijit.form.Button({
        label: "Basic Information",
        onClick: function() {
          userBasic($("#u").val());
        }
    },
    "loadBasic");

    var button = new dijit.form.Button({
        label: "Wall",
        onClick: function() {
          userWall($("#u").val());
        }
    },
    "loadWall");

    new dijit.form.Textarea({
        name: "Source Code",
        value: ""
    },
    "src");

    new dijit.form.Button({
        label: "Execute",
        onClick: function() {
          execute($("#src").val());
        }
    },
    "execute");

    var button = new dijit.form.Button({
        label: "News Feed",
        onClick: function() {
          userNewsFeed($("#u").val());
        }
    },
    "loadNewsFeed");
    

    new dijit.form.TextBox({
        name: "uid",
        value: "" /* no or empty value! */,
        placeHolder: "UID/Username"
    }, "u");

    new dijit.form.Button({
        label: "Accounts",
        onClick: function() {
          userAccounts($("#u").val());
        }
    },
    "loadAccounts");

    new dijit.form.Button({
        label: "App Requests",
        onClick: function() {
          userAppRequests($("#u").val());
        }
    },
    "loadAppRequests");

    new dijit.form.Button({
        label: "Activities",
        onClick: function() {
          userActivities($("#u").val());
        }
    },
    "loadActivities");
    
    new dijit.form.Button({
        label: "Books",
        onClick: function() {
          userBooks($("#u").val());
        }
    },
    "loadBooks");

    new dijit.form.Button({
        label: "Checkins",
        onClick: function() {
          userCheckins($("#u").val());
        }
    },
    "loadCheckins");

    new dijit.form.Button({
        label: "Events",
        onClick: function() {
          userEvents($("#u").val());
        }
    },
    "loadEvents");

    new dijit.form.Button({
        label: "Friend Lists",
        onClick: function() {
          userFriendLists($("#u").val());
        }
    },
    "loadFriendLists");

    new dijit.form.Button({
        label: "Inbox",
        onClick: function() {
          userInbox($("#u").val());
        }
    },
    "loadInbox");

    new dijit.form.Button({
        label: "Interests",
        onClick: function() {
          userInterests($("#u").val());
        }
    },
    "loadInterests");

    new dijit.form.Button({
        label: "Likes",
        onClick: function() {
          userLikes($("#u").val());
        }
    },
    "loadLikes");

    new dijit.form.Button({
        label: "Links Posted by User",
        onClick: function() {
          userLinks($("#u").val());
        }
    },
    "loadLinks");

    new dijit.form.Button({
        label: "Movies",
        onClick: function() {
          userMovies($("#u").val());
        }
    },
    "loadMovies");

    new dijit.form.Button({
        label: "Music",
        onClick: function() {
          userMusic($("#u").val());
        }
    },
    "loadMusic");

    new dijit.form.Button({
        label: "Notes",
        onClick: function() {
          userNotes($("#u").val());
        }
    },
    "loadNotes");

    new dijit.form.Button({
        label: "Outbox",
        onClick: function() {
          userOutbox($("#u").val());
        }
    },
    "loadOutbox");

    new dijit.form.Button({
        label: "Posts",
        onClick: function() {
          userPosts($("#u").val());
        }
    },
    "loadPosts");

    new dijit.form.Button({
        label: "Statuses",
        onClick: function() {
          userStatuses($("#u").val());
        }
    },
    "loadStatuses");

    new dijit.form.Button({
        label: "User's Tags",
        onClick: function() {
          userTagged($("#u").val());
        }
    },
    "loadTagged");

    new dijit.form.Button({
        label: "Tv Shows",
        onClick: function() {
          userTelevision($("#u").val());
        }
    },
    "loadTelevision");

    new dijit.form.Button({
        label: "Updates",
        onClick: function() {
          userUpdates($("#u").val());
        }
    },
    "loadUpdates");
    
    new dijit.form.Button({
        label: "Videos",
        onClick: function() {
          userVideos($("#u").val());
        }
    },
    "loadVideos");
});
