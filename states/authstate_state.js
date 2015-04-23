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
Sites.AUTHSTATE = SC.State.extend(
/** @scope Sites.Authstate.prototype */ {

  initialSubstate: 'CHECKSESSION',
  
  CHECKSESSION: SC.State.plugin('Sites.CHECKSESSION'),
  
  SHOWLOGIN: SC.State.plugin('Sites.SHOWLOGIN'),
  
  AUTHENTICATING: SC.State.plugin('Sites.AUTHENTICATING'),
  
  AUTHENTICATED: SC.State.plugin('Sites.AUTHENTICATED'),

  enterState: function() {

  },

  exitState: function() {

  }

});
