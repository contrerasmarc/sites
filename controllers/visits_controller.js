// ==========================================================================
// Project:   Sites.visitsController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Sites.visitsController = SC.ArrayController.create( 
	SC.CollectionViewDelegate,
/** @scope Sites.visitsController.prototype */ {

	// orderBy: 'name',
	// site_idBinding: 'Sites.siteController._id',
	
	allowsMultipleSelection: NO,

	collectionViewDeleteContent: function(view, content, indexes) {

	  // destroy the records
	  var records = indexes.map(function(idx) {
	    return this.objectAt(idx);
	  },
	  this);
	  records.invoke('destroy');

	  var selIndex = indexes.get('min') - 1;
	  if (selIndex < 0) selIndex = 0;
	  this.selectObject(this.objectAt(selIndex));
	},

	addVisit: function() {
	  var visit;
	  // create a new visit in the store
	  visit = Sites.store.createRecord(Sites.VisitModel, {
			"type": "visit",
			"name": null,
			"date": null,
			"days": 0
			// "site_id": Sites.sitesController.get('selection').getEach('_id').objectAt(0)
	  });

	  // select new site in UI
	  this.selectObject(visit);

	  // activate inline editor once UI can repaint
	  // this.invokeLater(function() {
	  //   var contentIndex = this.indexOf(site);
	  //   var list = Sites.mainPage.getPath('mainPane.workspaceView.contentView.leftView.lstSites.contentView');
	  //   var listItem = list.itemViewForContentIndex(contentIndex);
	  //   listItem.beginEditing();
	  // });

	  return YES;
	},

	destroyOnRemoval: YES,	
	removeVisit: function() {
		var visit = Sites.visitsController.get('selection').getEach('name');
		var visitor = visit.objectAt(0);

		SC.AlertPane.warn({
		  message: "Are you sure to delete the visit of: " + visitor,
		  description: "This operation is irreversible.",
		  // caption: "Sites",
		  buttons: [
		    { title: "Delete", toolTip: "Delete the visit", 
					action: function(){
						var obj = Sites.visitController;
						Sites.visitsController.removeObject(obj);
					} 
				},
		    { 
					title: "Cancel", 
					toolTip: "Cancel the action", 
					isDefault: true, 
					isCancel: true 
				}
		  ]
		});

	},

	updateRecord: function() {

	},
	
	nvisits: function() {
	  var len = this.get('length'),
	  ret;

	  if (len && len > 0) {
	    ret = len === 1 ? "1 visita": "%@ visitas".fmt(len);
	  } else ret = "No visits";

	  return ret;
	}.property('length').cacheable()
	

});
