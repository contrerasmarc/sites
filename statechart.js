Sites.statechart = SC.Statechart.create({
	
	trace: YES,
	
  initialState: 'generalState',
	
	// selectionState: SC.State.plugin('Sites.SelectionState'),
	generalState: SC.State.plugin('Sites.GeneralState'),
	haulingState: SC.State.plugin('Sites.HaulingState'),
	weatherState: SC.State.plugin('Sites.WeatherState')
	
});
