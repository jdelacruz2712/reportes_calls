<input type="hidden" name="_token" value="{!! csrf_token() !!}">

<div class="panel panel-default">
    <div class="panel-body" >
        <div class="tab-pane fade active in" id="panel-report">
            <table class="table table-bordered">
                <thead class="bg-primary" align="center">
                <tr>
                    <th>Id</th>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Rol</th>
                    <th>change_rol</th>
                    <th>change_password</th>
                </tr>
                </thead>
                <tbody>
                @foreach ($Users as $user)
                    <tr class="prueba">
                        <td>{{$user['id']}}</td>
                        <td>{{$user['primer_nombre']}}</td>
                        <td>{{$user['segundo_nombre']}}</td>
                        <td>{{$user['apellido_paterno']}}</td>
                        <td>{{$user['apellido_materno']}}</td>
                        <td>{{$user['role']}}</td>
                        <td><a class="btn btn-success btn-xs"><i class="fa fa-refresh"></i></a></td>
                        <td><a class="btn btn-danger btn-xs"><i class="fa fa-key"></i></a></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            {!! $Users->render() !!}
        </div>
    </div>
</div>
<script>
    $(window).on('hashchange', function() {
        if (window.location.hash) {
            var page = window.location.hash.replace('#', '');
            if (page == Number.NaN || page <= 0) {
                return false;
            } else {
                getPage(page);
            }
        }
    });
    $(document).ready(function() {
        $(document).on('click', '.pagination a', function (e) {
            getPage($(this).attr('href').split('page=')[1]);
            e.preventDefault();
        });
    });
    function getPage(page) {
        console.log(page)
        $.ajax({
            url : 'list_table?page=' + page,
            dataType: 'json'
        }).done(function (data) {
            $('.prueba').html(data);
            location.hash = page;
        }).fail(function (err) {
            alert('Posts could not be loaded.');
        });
    }
</script>