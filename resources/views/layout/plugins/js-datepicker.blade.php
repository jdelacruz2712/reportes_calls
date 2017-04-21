<script src="{{ asset('js/daterangepicker.min.js')}}">  </script>
<script type="text/javascript">
$(document).ready(function() {
    $('input[name="fecha_evento"]').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD'
        }
    })

    $('input[name=birthdate]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        alwaysShowCalendars: true,
        autoUpdateInput: false,
        opens: "right",
        locale: {
            format: 'YYYY-MM-DD'
        }
    })

    $('input[name="birthdate"]').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate;
        $('input[name="birthdate"]').val(startDate.format('YYYY-MM-DD'));
    })
})
</script>
