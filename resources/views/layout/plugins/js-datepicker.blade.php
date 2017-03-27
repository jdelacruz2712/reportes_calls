<script src="{{ asset('js/daterangepicker.min.js')}}">  </script>
<script type="text/javascript">
$(document).ready(function() {
    $('input[name="fecha_evento"]').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD'
        }
    })
})
</script>
