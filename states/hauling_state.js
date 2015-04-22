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
Sites.HaulingState = SC.State.extend(
/** @scope Sites.HaulingState.prototype */
{

  enterState: function() {
    // Sites.mainPage.get('mainPane').append();
  },

  exitState: function() {
    // Sites.getPath('HaulingView').remove();
    //     Sites.mainPage.get('mainPane').remove();
  },

  goSelection: function() {
    Sites.explorerController.set('nowShowing', 'Sites.SelectionView');
    this.gotoState('selectionState');
  },
  goGeneral: function() {
    Sites.explorerController.set('nowShowing', 'Sites.GeneralView');
    this.gotoState('generalState');
  },
  goWeather: function() {
    Sites.explorerController.set('nowShowing', 'Sites.WeatherView');
    this.gotoState('weatherState');
  }

});
