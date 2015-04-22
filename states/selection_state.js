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
Sites.SelectionState = SC.State.extend(
/** @scope Sites.SelectionState.prototype */
{

  enterState: function() {
    Sites.getPath('mainPage.mainPane').append();
  },

  exitState: function() {
    //     Sites.getPath('SelectionView').remove();
    // Sites.getPath('mainPage.mainPane').remove();
    // Sites.mainPage.mainPane.workspaceView.contentView.rightView.siteExplorer.getPath('selectionView').remove();
  },

  // === SITE SECTION SELECTOR ===
  goGeneral: function() {
    Sites.explorerController.set('nowShowing', 'Sites.GeneralView');
    this.gotoState('generalState');
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
