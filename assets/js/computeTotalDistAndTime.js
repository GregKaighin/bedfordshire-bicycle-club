function computeTotalDistAndTime(result) {
    var totalDist = 0;
    var totalTime = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
        totalDist += myroute.legs[i].distance.value;
        totalTime += myroute.legs[i].duration.value;
    }
    // Convert total distance from meters to miles
    totalDist = totalDist / (1000 / 0.62137);
    // Convert total time from minutes to hours and minutes
    var hours = Math.floor((totalTime / 60) / 60);
    var minutes = (totalTime / 60) % 60;
    var routeSummary = document.querySelector('#route-summary');
    // Pass converted total time and distance to route summary div
    // Statements to handle 0 hours, 1 hour and >1 hour and display with correct grammar
    if (hours === 0) {
        routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' + '.<br />Total time: ' + minutes.toFixed(0) + ' mins' + '.</div>';
    } else if (hours === 1) {
        routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' +
            '.<br />Total time: ' + hours.toFixed(0) + ' hour ' + minutes.toFixed(0) + ' mins' + '.</div>';
    }
    else {
        routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' +
            '.<br />Total time: ' + hours.toFixed(0) + ' hours ' + minutes.toFixed(0) + ' mins' + '.</div>';
    }
}
            // Show an error message for invalid routes

