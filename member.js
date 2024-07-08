function skillsMember() {
  // Get the member ID from the URL
  var memberId = window.location.pathname.split("/").pop();
  // Get the member's skills
  $.ajax({
    url: "/api/skills/" + memberId,
    type: "GET",
    success: function(data) {
      // Display the member's skills
      var skills = data.skills;
      for (var i = 0; i < skills.length; i++) {
        var skill = skills[i];
        $("#skills").append("<li>" + skill + "</li>");
      }
    }
  });
}