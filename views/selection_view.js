// ==========================================================================
// Project:   Sites.SelectionView
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Sites.SelectionView = SC.View.extend(
/** @scope Sites.SelectionView.prototype */ {

	autoResizeStyle: SC.RESIZE_AUTOMATIC,

	childViews: ['lblSearch', 'txtSearch', 'btnSelect', 'lstSites', 'btnNew', 'txtName'],

	lblSearch: SC.LabelView.extend({
	  // classNames: ['sectiontitle-label'],
	  layout: {width: 160, height: 24, top: 8, left: 8 },
	  value: 'Site Search'
	}),

	txtSearch: SC.TextFieldView.extend({
	  layout: {width: 160, height: 24, top: 32, left: 8 },
	  hint: 'Search',
	  applyImmediately: true
	  // valueBinding: 'Dus.sitesDescriptionController.search'
	}),
	btnSelect: SC.ButtonView.extend({
	  layout: {width: 128, height: 24, top: 64, left: 240 },
	  title: 'Select this Site',
	  target: 'Sites.explorerController',
	  action: 'selectSite'
	}),

	lstSites: SC.ScrollView.extend({
	  layout: {left: 8, width: 224, top: 64, bottom: 8 },
		hasHorizontalScroller: NO,
		
		contentView: SC.ListView.extend({
      contentBinding: 'Sites.sitesController.arrangedObjects',
      selectionBinding: 'Sites.sitesController.selection',
      contentValueKey: 'name',
      // contentCheckboxKey: "isDone",
      rowHeight: 21,
      canEditContent: YES,
      canDeleteContent: YES,
      // target: "Sites.sitesController",
     	// action: "toggleDone"
			
			// MCM
			selectionHasChanged: function (){
				console.log('---> selectionHasChanged');
				console.log(this.get('content').getEach('name', 'zone', 'country', 'reference'));
			}.observes('selection')
			
    })		
	
		
	}),
	
	btnNew: SC.ButtonView.extend({
	  layout: {width: 128, height: 24, top: 96, left: 240 },
	  title: 'New',
    target: "Sites.sitesController",
    action: "addSite"
	}),
	
	txtName: SC.TextFieldView.design({
	  layout: {right: 8, height: 24, width :200 },
	  hint: 'Set the name here...',
	  // isEditable: NO,
		valueBinding: 'Sites.siteController.name'
	})


});
