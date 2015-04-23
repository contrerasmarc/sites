// ==========================================================================
// Project:   Sites
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */


Sites.statechart = SC.Statechart.create({

  trace: YES,
  
  rootState: SC.State.design({
 
    substatesAreConcurrent: true,
 
    AUTHSTATE: SC.State.plugin('Sites.AUTHSTATE'),
 
    MAINSTATE: SC.State.plugin('Sites.MAINSTATE')
 
  })

});
