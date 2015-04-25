// ==========================================================================
// Project:   Sites.visitsController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/

// sc_require('models/site_model');
// sc_require('models/visit_model');


Sites.visitsController = SC.ArrayController.create( 
/** @scope Sites.visitsController.prototype */
{
  content: null,

  siteIdBinding: 'Sites.siteController.id',

  siteIdDidChange: function() {
    
    var siteId = this.get('siteId');
    // console.log('siteIdDidChange !!', siteId);
    
    var q = Sites.SITES_QUERY;
    var s = Sites.store.find(q);
    // var id, sKey, sTatus;
    // s.forEach(function(item, index, self) {
    //   id = item.get('id');
    //   sKey = item.get('storeKey');
    //   sTatus = item.get('status');
    //   console.log('The sites: ',item,id,sKey,sTatus);
    // });
          
   
    var newQ = SC.Query.local(Sites.VisitModel, {
      // conditions: "site_id = {qSite} ",
      conditions: "site = {qSite} AND type = 'visit' ",
      // conditions: "type = 'visit' "
      parameters: {
        qSite: siteId
      }
    });

    var c = this.get('content');
    if (c) c.destroy();
    s = Sites.store.find(newQ);
    // s = Sites.store.find(Sites.VisitModel);
    // console.log('The visits: ', s, s.get('length'));
    this.set('content', s);
    
    // s.forEach(function(item, index, self) {
    //   id = item.get('id');
    //   sKey = item.get('storeKey');
    //   sTatus = item.get('status');
    //   console.log('The visits: ',siteId, item,id,sKey,sTatus);
    // });
    

  }.observes('siteId')

  // orderBy: 'name',

  // collectionViewDeleteContent: function(view, content, indexes) {
  //
  //   // destroy the records
  //   var records = indexes.map(function(idx) {
  //     return this.objectAt(idx);
  //   },
  //   this);
  //   records.invoke('destroy');
  //
  //   var selIndex = indexes.get('min') - 1;
  //   if (selIndex < 0) selIndex = 0;
  //   this.selectObject(this.objectAt(selIndex));
  // },
  //
  // addVisit: function() {
  //   var visit;
  //   // create a new visit in the store
  //   visit = Sites.store.createRecord(Sites.VisitModel, {
  // 		"type": "visit",
  // 		"name": null,
  // 		"date": null,
  // 		"days": 0
  // 		// "site_id": Sites.sitesController.get('selection').getEach('_id').objectAt(0)
  //   });
  //
  //   // select new site in UI
  //   this.selectObject(visit);
  //
  //   // activate inline editor once UI can repaint
  //   // this.invokeLater(function() {
  //   //   var contentIndex = this.indexOf(site);
  //   //   var list = Sites.mainPage.getPath('mainPane.workspaceView.contentView.leftView.lstSites.contentView');
  //   //   var listItem = list.itemViewForContentIndex(contentIndex);
  //   //   listItem.beginEditing();
  //   // });
  //
  //   return YES;
  // },
  //
  // destroyOnRemoval: YES,
  // removeVisit: function() {
  // 	var visit = Sites.visitsController.get('selection').getEach('name');
  // 	var visitor = visit.objectAt(0);
  //
  // 	SC.AlertPane.warn({
  // 	  message: "Are you sure to delete the visit of: " + visitor,
  // 	  description: "This operation is irreversible.",
  // 	  // caption: "Sites",
  // 	  buttons: [
  // 	    { title: "Delete", toolTip: "Delete the visit",
  // 				action: function(){
  // 					var obj = Sites.visitController;
  // 					Sites.visitsController.removeObject(obj);
  // 				}
  // 			},
  // 	    {
  // 				title: "Cancel",
  // 				toolTip: "Cancel the action",
  // 				isDefault: true,
  // 				isCancel: true
  // 			}
  // 	  ]
  // 	});
  //
  // },
  //
  // updateRecord: function() {
  //
  // },
  //
  // nvisits: function() {
  //   var len = this.get('length'),
  //   ret;
  //
  //   if (len && len > 0) {
  //     ret = len === 1 ? "1 visita": "%@ visitas".fmt(len);
  //   } else ret = "No visits";
  //
  //   return ret;
  // }.property('length').cacheable()

});
