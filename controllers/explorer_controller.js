// ==========================================================================
// Project:   Sites.explorerController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Sites.explorerController = SC.ObjectController.create(
/** @scope Sites.explorerController.prototype */
{

  nowShowing: 'Sites.GeneralView',

  sectionIsEnabled: true,
  // Let's the left menus enabled
  selectSite: function() {
    this.set('sectionIsEnabled', true);
  }

});
