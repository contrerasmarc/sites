// ==========================================================================
// Project:   Sites.WeatherView
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Sites.WeatherView = SC.View.extend(
/** @scope Sites.WeatherView.prototype */
{

  childViews: ['weatherExplorer'],
  weatherExplorer: SC.TabView.extend({
    itemTitleKey: 'title',
    itemValueKey: 'value',
    nowShowing: 'Dus.WeatherGeneralView',
    tabLocation: SC.TOP_TOOLBAR_LOCATION,
    segmentedView: SC.SegmentedView.extend({
      align: SC.ALIGN_LEFT
    }),

    layout: {
      left: 8,
      right: 8,
      bottom: 8,
      top: 8
    },
    minimumSize: 240,

    items: [{
      title: 'General',
      value: 'Sites.WeatherGeneralView'
    },
    {
      title: 'Temperature',
      value: 'Sites.WeatherTemperatureView'
    },
    {
      title: 'Rainfall',
      value: 'Sites.WeatherRainfallView'
    },
    {
      title: 'Snowfall',
      value: 'Sites.WeatherSnowfallView'
    }]
  })

});
