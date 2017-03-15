<script type="text/javascript">
    // Muestra la hora actual del sistema cada 1 segundo
    hora_actual(<?php echo date("H").", ".date("i").", ".date("s"); ?>);
    // Muestra la Fecha Actual del sistema, se ejecuta una sola vez.
    fecha_actual(<?php echo date("d").", ".date("n").", ".date("w"); ?>);
</script>