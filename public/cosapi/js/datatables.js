/**
 * Created by dominguez on 10/03/2017.
 */
/**
 * [columns_datatable description]
 * @param  {String} route [Nombre del tipo de reporte]
 * @return {Array}        [Array con nombre de cada parametro que ira en las columnas de la tabla dl reporte]
 */
function columns_datatable(route){
    if(route == 'incoming_calls'){
        var columns =   [
            {"data" : "date"},
            {"data" : "hour"},
            {"data" : "telephone"},
            {"data" : "agent"},
            {"data" : "skill"},
            {"data" : "duration"},
            {"data" : "action"},
            {"data" : "waittime"},
            {"data" : "download"},
            {"data" : "listen"}
        ];
    }

    if(route == 'surveys'){
        var columns =   [
            {"data" : "Type Survey"},
            {"data" : "Date"},
            {"data" : "Hour"},
            {"data" : "Username"},
            {"data" : "Anexo"},
            {"data" : "Telephone"},
            {"data" : "Skill"},
            {"data" : "Duration"},
            {"data" : "Question_01"},
            {"data" : "Answer_01"},
            {"data" : "Question_02"},
            {"data" : "Answer_02"},
            {"data" : "Action"}
        ];
    }

    if(route == 'consolidated_calls'){
        var columns =   [
            {"data":"Name"},
            {"data":"Received"},
            {"data":"Answered"},
            {"data":"Abandoned"},
            {"data":"Transferred"},
            {"data":"Attended"},
            {"data":"Answ 10s"},
            {"data":"Answ 15s"},
            {"data":"Answ 20s"},
            {"data":"Answ 30s"},
            {"data":"Aband 10s"},
            {"data":"Aband 15s"},
            {"data":"Aband 20s"},
            {"data":"Aband 30s"},
            {"data":"Wait Time"},
            {"data":"Talk Time"},
            {"data":"Avg Wait"},
            {"data":"Avg Talk"},
            {"data":"Answ"},
            {"data":"Unansw"},
            {"data":"Ro10"},
            {"data":"Ro15"},
            {"data":"Ro20"},
            {"data":"Ro30"},
            {"data":"Ns10"},
            {"data":"Ns15"},
            {"data":"Ns20"},
            {"data":"Ns30"},
            {"data":"Avh2 10"},
            {"data":"Avh2 15"},
            {"data":"Avh2 20"},
            {"data":"Avh2 30"}
        ];
    }

    if(route == 'events_detail'){
        var columns =   [
            {"data" : "nombre_agente"},
            {"data" : "fecha"},
            {"data" : "hora"},
            {"data" : "evento"},
            {"data" : "accion"}
        ];
    }

    if(route == 'outgoing_calls'){
        var columns =   [
            {"data" : "date"},
            {"data" : "hour"},
            {"data" : "annexedorigin"},
            {"data" : "username"},
            {"data" : "destination"},
            {"data" : "calltime"},
            {"data" : "download"},
            {"data" : "listen"}
        ];
    }


    return columns;
}