// ==========================================================================
// Project:   Sites.HaulingView
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Sites.HaulingView = SC.View.extend(
/** @scope Sites.HaulingView.prototype */ {

  childViews: ['haulingExplorer'],
  haulingExplorer: SC.TabView.extend({
    itemTitleKey: 'title',
    itemValueKey: 'value',
    nowShowing: 'Sites.GroundLoadingView',
    tabLocation: SC.TOP_TOOLBAR_LOCATION,
    segmentedView: SC.SegmentedView.extend({
      align: SC.ALIGN_LEFT
    }),

		layout: {left: 8, right: 8, bottom: 8, top: 8 },
    minimumSize: 240,
		   
		items: [{
      title: 'Loading Zone',
      value: 'Sites.HaulingLoadingView'
    },
    {
      title: 'Roads',
      value: 'Sites.HaulingRoadsView'
    },
    {
      title: 'Ore Discharge Area',
      value: 'Sites.HaulingOreDischargeView'
    },
    {
      title: 'Waste Discharge Area',
      value: 'Sites.HaulingWasteDischargeView'
    }]
  })
	
	
});

