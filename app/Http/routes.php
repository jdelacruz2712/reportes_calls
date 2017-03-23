<?php
Route::get ('/'		    , ['uses'=>'Auth\AuthController@getLogin'  ,   'as'=>'login'        ]);
Route::post('/'		    , ['uses'=>'Auth\AuthController@postLogin' ,   'as'=>'login'        ]);
Route::get ('logout'    , ['uses'=>'Auth\AuthController@getLogout' ,  'as'=>'logout'        ]);

Route::group ( ['middleware'=>['auth'], 'prefix'=>'home' ]      , function(){
    Route::get('/'      , ['uses'=>'AdminController@index'         ,    'as' => 'home'      ]);
});

Route::group ( ['middleware'=>['admin'], 'prefix'=>'supervisor' ], function(){
    Route::get('/'      , ['uses'=>'AdminController@supervisor'    ,    'as' => 'supervisor']);
});

Route::group ( ['middleware'=>['supervisor'], 'prefix'=>'agente' ]    , function(){
    Route::get('/'      , ['uses'=>'AdminController@agente'        ,    'as' => 'agente'    ]);
});

Route::group (['middleware'=>['admin']], function(){
	// Reportes de Eventos
	Route::get('dashboard_01'         								, ['uses'=>'DashboardController@dashboard_01']);
	Route::get('dashboard_02'   									, ['uses'=>'DashboardController@dashboard_02']);
});



// Reportes de Eventos
Route::post('events_detail'         							, ['uses'=>'EventsAgentController@events_detail']);
Route::post('events_consolidated'   							, ['uses'=>'EventsAgentController@events_consolidated']);

// Reportes CALLS
Route::post('incoming_calls'									, ['uses'=>'IncomingCallsController@index']);
Route::post('outgoing_calls'									, ['uses'=>'OutgoingCallsController@index']);
Route::post('consolidated_calls'								, ['uses'=>'ConsolidatedCallsController@index']);

Route::post('export_incoming'									, ['uses'=>'IncomingCallsController@export']);
Route::post('export_outgoing'									, ['uses'=>'OutgoingCallsController@export']);
Route::post('export_consolidated'								, ['uses'=>'ConsolidatedCallsController@export']);
Route::post('export_events_detail'								, ['uses'=>'EventsAgentController@export']);
Route::post('export_surveys'	    							, ['uses'=>'SurveysController@export']);

// reporte de llamadas salienes
Route::post('agents_online'										, ['uses'=>'AgentsOnlineController@index']);

// Reporte de nivel de occupacion
Route::post('level_of_occupation'								, ['uses'=>'LeveloccupationController@index']);

// Reporte de encuestaa
Route::post('surveys'											, ['uses'=>'SurveysController@index']);

// Asignar Cola
Route::post('agents_queue'										, ['uses'=>'AgentsQueueController@index']);
Route::post('agents_queue/search_users'							, ['uses'=>'AgentsQueueController@search_users']);
Route::post('agents_queue/assign_queue'							, ['uses'=>'AgentsQueueController@assign_queue']);
Route::post('agents_queue/mark'							        , ['uses'=>'AgentsQueueController@mark_form']);
Route::get('agents_queue/users'     							, ['uses'=>'AgentsQueueController@list_users']);

Route::post('agents_annexed'									, ['uses'=>'AgentsAnnexedController@index']);
Route::get('list_event'									        , ['uses'=>'EventsAgentController@index']);
Route::post('assistance'                                        , ['uses'=>'AssistanceController@index'         ,    'as' => 'assistance']);
Route::post('working'                                           , ['uses'=>'AdminController@working'            ,    'as' => 'working']);
Route::post('modifyPassword'                                    , ['uses'=>'UserController@modifyPassword'            ,    'as' => 'modifyPassword']);
