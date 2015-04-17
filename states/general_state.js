// ==========================================================================
// Project:   Sites
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your State Here)

  @extends SC.State
  @version 0.1
*/
Sites.GeneralState = SC.State.extend(
/** @scope Sites.GeneralState.prototype */ {

	enterState: function() {
    Sites.mainPage.get('mainPane').append();
	},
	
  exitState: function() {

  },
	
	goHauling: function() {
		Sites.explorerController.set('nowShowing', 'Sites.HaulingView');
		this.gotoState('haulingState');
	},
	goWeather: function() {
		Sites.explorerController.set('nowShowing', 'Sites.WeatherView');
		this.gotoState('weatherState');
	}

});
