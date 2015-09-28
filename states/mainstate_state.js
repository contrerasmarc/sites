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
Sites.MAINSTATE = SC.State.extend(
/** @scope Sites.Mainstate.prototype */ {
  
  MODIFCBX: SC.State.plugin('Sites.MODIFCBX'),
    
  doModif: function(){
    this.gotoState('MODIFCBX');
  },
    
  enterState: function() {
    Sites.mainPage.get('mainPane').append();
  
    // ..........................................................
    // Connecting to data
    // 
    var query = Sites.SITES_QUERY;
    var sites = Sites.store.find(query);
    
    console.log('query:', query, 'sites:', sites);
    
    // Controller get the data
    Sites.sitesController.set('content', sites);
  
  },

  exitState: function() {
    Sites.mainPage.get('mainPane').remove();
  }    

});
