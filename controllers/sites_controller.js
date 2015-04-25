// ==========================================================================
// Project:   Sites.sitesController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Sites.sitesController = SC.ArrayController.create( SC.CollectionViewDelegate,
/** @scope Sites.sitesController.prototype */
{

  // selectionBinding: SC.Binding.oneWay('Sites.searchSitesController.selection'),
  // selectionBinding: 'Sites.searchSitesController.selection',
  search: null,

  // searchHasChanged: function() {
  //   console.log("searchHasChanged in Sites.sitesController");
  // }.observes('search'),

  summary: function() {
    var len = this.get('length'),
    ret;

    if (len && len > 0) {
      ret = len === 1 ? "1 site": "%@ sites".fmt(len);
    } else ret = "No sites";

    return ret;
  }.property('length').cacheable(),

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

  addSite: function() {
    var site;
    // create a new site in the store
    site = Sites.store.createRecord(Sites.SiteModel, {
      "type": "site",
      "name": "new site",
      "zone": null,
      "country": null,
      "reference": null,
      "town": null,
      "altitude": 0,
      "activity": null,
      "material": null,
      "method": null,
      "production": null,
      "rcs": null,
      "ces": null,
      "fvisits": null
    });

    // select new site in UI
    this.selectObject(site);

    // activate inline editor once UI can repaint
    this.invokeLater(function() {
      var contentIndex = this.indexOf(site);
      var list = Sites.mainPage.getPath('mainPane.workspaceView.contentView.leftView.lstSites.contentView');
      var listItem = list.itemViewForContentIndex(contentIndex);
      listItem.beginEditing();
    });

    return YES;
  },

  destroyOnRemoval: YES,

  removeSite: function() {
    var site = Sites.sitesController.get('selection').getEach('name');
    var sitename = site.objectAt(0);

    SC.AlertPane.warn({
      message: "Are you sure to delete the site: " + sitename,
      description: "This operation is irreversible.",
      // caption: "Sites",
      buttons: [{
        title: "Delete",
        toolTip: "Delete the site",
        action: function() {
          var obj = Sites.siteController;
          Sites.sitesController.removeObject(obj);
        }
      },
      {
        title: "Cancel",
        toolTip: "Cancel the action",
        isDefault: true,
        isCancel: true
      }]
    });

  },

  updateRecord: function() {

}

  // toggleDone: function() {
  //   console.log('>>> toggleDone triggered');
  //   var sel = this.get('selection');
  //   sel.setEach('isDone', !sel.everyProperty('isDone'));
  //
  //   return YES;
  //
  // }

});
