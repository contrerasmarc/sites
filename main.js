// ==========================================================================
// Project:   Sites
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//

Sites.main = function main() {
	//   var statechart = Sites.statechart;
	//
	//   SC.RootResponder.responder.set('defaultResponder', statechart);
	//
	// // Starting the Statecharts
	//   statechart.initStatechart();
	
	Sites.mainPage.get('mainPane').append();
	Sites.parseSampleData();
	
// ..........................................................
// Connecting to data
// 
	// // Declaring the Model to store
	// var sites = Sites.store.find(Sites.SiteData);
	// // Declaring the Controller linked to the model
	// Sites.namesController.set('content', sites);


	// var query = SC.Query.local(Sites.SiteData, { orderBy: 'name, zone'});
	// var sites = Sites.store.find(query);
	
	// var sites = Sites.store.find(Sites.SiteData);

	var query = Sites.SITES_QUERY;
	var sites = Sites.store.find(query);
	// Controller get the data
	Sites.sitesController.set('content', sites);

	// var queryVisits = Sites.VISITS_QUERY;
	// var visits = Sites.store.find(queryVisits);
	// // Controller get the data
	// Sites.visitsController.set('content', visits);
	
	
	// var queryVisits = Sites.VISITS_QUERY;
	// var visits = Sites.store2.find(queryVisits);
	// // Controller get the data
	// Sites.visitsController.set('content', visits);
	
};


function main() { Sites.main(); }
