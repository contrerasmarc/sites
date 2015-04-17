// ==========================================================================
// Project:   Sites.GeneralView
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Sites.GeneralView = SC.View.extend(
/** @scope Sites.GeneralView.prototype */ {

	childViews: ['generalExplorer'],
	generalExplorer: SC.TabView.extend({
	  itemTitleKey: 'title',
	  itemValueKey: 'value',
	  nowShowing: 'Sites.GeneralDescriptionView',
	  tabLocation: SC.TOP_TOOLBAR_LOCATION,
	  segmentedView: SC.SegmentedView.extend({
	    align: SC.ALIGN_LEFT
	  }),
	  
		layout: {left: 8, right: 8, bottom: 8, top: 8 },
	  minimumSize: 240,
	  
		items: [{
	    title: 'Description',
			value: 'Sites.GeneralDescriptionView'
	  },
	  {
	    title: 'Productivity',
	    value: 'Sites.GeneralProductivityView'
	  },
	  {
	    title: 'Accessibility',
	    value: 'Sites.GeneralAccessibilityView'
	  },
	  {
	    title: 'Services',
	    value: 'Sites.GeneralServicesView'
	  },
	  {
	    title: 'Maintenance',
	    value: 'Sites.GeneralMaintenanceView'
	  },
	  {
	    title: 'Miscellaneous',
	    value: 'Sites.GeneralMiscellaneousView'
	  }]
	})


});
