/**
 * Created by jdelacruz on 28/09/2017.
 */
$('#formAssignQueues').submit(function(e) {
    let data = $(this).serialize()
    changeButtonForm('btnForm','btnLoad')
    $.ajax({
        type        : 'POST',
        url         : 'saveformassignQueues',
        cache       : false,
        headers     : {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
        data        : data,
        success: function(data){
            if(data.message === 'Success'){
                changeButtonForm('btnLoad','btnForm')
                showNotificacion('success', 'Se guardaron las colas en el usuario, exitosamente !!!', 'Success', 2000, false, true)
                clearModal('modalUsers', 'div.dialogUsers')
                buscar()
            }else{
                showNotificacion('error', 'Problemas al actualizar el dato en la base de datos', 'Error', 10000, false, true)
            }
            changeButtonForm('btnLoad','btnForm')
        },
        error : function(data) {
            showNotificacion('error', 'Problema al comunicarse con la ruta "saveformAssignQueues"', 'Error', 10000, false, true)
            changeButtonForm('btnLoad','btnForm')
            showErrorForm(data, '.formError')
        }
    })
    e.preventDefault()
})